const {
  ConnectPG_DB,
  DisconnectPG_DB,
  ConnectOracleDB,
  DisconnectOracleDB,
} = require("../Conncetion/DBConn.cjs");
const oracledb = require("oracledb");
const { writeLogError } = require("../Common/LogFuction.cjs");

let CONNECT_SERIAL_ERROR = "999999";

module.exports.fnLotSheetBadmarkData = async function (req, res) {
  var query = "";
  var query2 = "";
  let query3 ="";
  let dtData =[];
  try {
      const {dataList} = req.body;
      // dataList strPlantCode strLotNo strResult dtDataExport intTotalColumn strResultBy
          const client = await ConnectPG_DB();
          const json_convertdata = JSON.stringify(dataList);
          query += ` select * from "Traceability".trc_046_sheetbarcodegrade_getcavity_no('${json_convertdata}')`;
          const result = await client.query(query);
          dtData = result.rows;

          query2 = `SELECT BR.SBG_SHEET_NO AS SHEET_NO, 
                   SUM(CASE WHEN BR.SBG_INSPECT_RESULT = 'OK' THEN 1 ELSE 0 END) AS OK, 
                   SUM(CASE WHEN BR.SBG_INSPECT_RESULT = 'NG' THEN 1 ELSE 0 END) AS NG`;

          for (let i = 0; i < dtData.length; i++) {
              if (dataList.strResultBy === 'RESULT') {
                  query2 += `, MAX(CASE WHEN BR.SBG_CAVITY_NO = ${parseInt(dtData[i].cavity_no_res)} THEN BR.SBG_INSPECT_RESULT ELSE '' END) AS "${parseInt(dtData[i].cavity_no_res)}"`;
              } else {
                  query2 += `, MAX(CASE WHEN BR.SBG_CAVITY_NO = ${parseInt(dtData[i].cavity_no_res)} THEN BR.SBG_INSPECT_CODE ELSE '' END) AS "${parseInt(dtData[i].cavity_no_res)}"`;
              }
          }

          query2 += ` FROM "Traceability".TRC_SERIAL_BARCODE_GRADE BR 
                      WHERE BR.SBG_PLANT_CODE = '${dataList.strPlantCode}' 
                      AND BR.SBG_LOT_NO = '${dataList.strLotNo}' 
                      AND ('ALL' = '${dataList.strResult}' OR '${dataList.strResult}' = (SELECT MIN(BR2.SBG_INSPECT_RESULT) 
                                                                                      FROM "Traceability".TRC_SERIAL_BARCODE_GRADE BR2 
                                                                                      WHERE BR2.SBG_PLANT_CODE = BR.SBG_PLANT_CODE 
                                                                                          AND BR2.SBG_LOT_NO = BR.SBG_LOT_NO 
                                                                                          AND BR2.SBG_SHEET_NO = BR.SBG_SHEET_NO)) 
                      GROUP BY BR.SBG_LOT_NO, BR.SBG_SHEET_NO 
                      ORDER BY BR.SBG_SHEET_NO`;
          const result2 = await client.query(query2);


          res.status(200).json(result2.rows);
        await DisconnectPG_DB(client);
      } catch (error) {
        writeLogError(error.message, query);
        res.status(500).json({ message: error.message });
      }
};

