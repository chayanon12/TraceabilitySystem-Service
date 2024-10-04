const {
    ConnectPG_DB,
    DisconnectPG_DB,
    ConnectOracleDB,
    DisconnectOracleDB,
  } = require("../Conncetion/DBConn.cjs");
  const { writeLogError } = require("../Common/LogFuction.cjs");

  
  module.exports.fnLotSheetBadmarkData = async function (req, res) {
    var query = "";
    var query2 = "";
    let dtData =[];
    try {
        const {dataList} = req.body;
            const client = await ConnectPG_DB();
            const json_convertdata = JSON.stringify(dataList);
            query += ` select * from "Traceability".trc_038_sheetbadmarkreport_getFirstData('${json_convertdata}')`;
            const result = await client.query(query);
            dtData = result.rows;
            query2 = `SELECT BR.SHB_SHEET_NO AS SHEET_NO, 
                     SUM(CASE WHEN BR.SHB_INS_RESULT = 'OK' THEN 1 ELSE 0 END) AS OK, 
                     SUM(CASE WHEN BR.SHB_INS_RESULT = 'NG' THEN 1 ELSE 0 END) AS NG`;

            for (let i = 0; i < dtData.length; i++) {
                if (dataList.strResultBy === 'RESULT') {
                    query2 += `, MAX(CASE WHEN BR.SHB_CAVITY_NO = ${parseInt(dtData[i].cavity_no_res)} THEN BR.SHB_INS_RESULT ELSE '' END) AS "${parseInt(dtData[i].cavity_no_res)}"`;
                } else {
                    query2 += `, MAX(CASE WHEN BR.SHB_CAVITY_NO = ${parseInt(dtData[i].cavity_no_res)} THEN BR.SHB_INS_CODE ELSE '' END) AS "${parseInt(dtData[i].cavity_no_res)}"`;
                }
            }

            query2 += ` FROM "Traceability".TRC_SHEET_BADMARK_RESULT BR 
                        WHERE BR.SHB_PLANT_CODE = '${dataList.strPlantCode}' 
                        AND BR.SHB_LOT_NO = '${dataList.strLotNo}' 
                        AND ('ALL' = '${dataList.strResult}' OR '${dataList.strResult}' = (SELECT MIN(BR2.SHB_INS_RESULT) 
                                                                                        FROM "Traceability".TRC_SHEET_BADMARK_RESULT BR2 
                                                                                        WHERE BR2.SHB_PLANT_CODE = BR.SHB_PLANT_CODE 
                                                                                            AND BR2.SHB_LOT_NO = BR.SHB_LOT_NO 
                                                                                            AND BR2.SHB_SHEET_NO = BR.SHB_SHEET_NO)) 
                        GROUP BY BR.SHB_LOT_NO, BR.SHB_SHEET_NO 
                        ORDER BY BR.SHB_SHEET_NO`;
            const result2 = await client.query(query2);
            res.status(200).json(result2.rows);
          
          await DisconnectPG_DB(client);
        } catch (error) {
          writeLogError(error.message, query);
          res.status(500).json({ message: error.message });
        }
  };