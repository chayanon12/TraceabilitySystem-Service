const {
  ConnectPG_DB,
  DisconnectPG_DB,
  ConnectOracleDB,
  DisconnectOracleDB,
} = require("../Conncetion/DBConn.cjs");
const oracledb = require("oracledb");
const { writeLogError } = require("../Common/LogFuction.cjs");

// AOI COA Result2
module.exports.GetAoi_Coa_Result2 = async function (req, res) {
  var query = "";
  try {
    const { dataList } = req.body;
    let PRODUCT_NAME = dataList.PRODUCT_NAME;
    let plant_code = dataList.plant_code;
    let panel_no = dataList.panel_no;
    let sheet_no = dataList.sheet_no;
    console.log(dataList, plant_code, panel_no, sheet_no, "ppppppppp");
    const client = await ConnectPG_DB();
    const json_convertdata = JSON.stringify(dataList);
    if (panel_no == "") {
      panel_no = null;
    }
    query += ` SELECT  
                CASE 
                    WHEN A.AOR_RESULT = 'NG' THEN 
                        F.SFM_AOI_IMAGE_PATH || 
                        A.AOR_MACHINE_NO || '/' || 
                        TO_CHAR(A.AOR_INSPECT_DATE, 'YYYY') || '/' || 
                        TO_CHAR(A.AOR_INSPECT_DATE, 'MM') || '/' || 
                        TO_CHAR(A.AOR_INSPECT_DATE, 'DD') || '/' || 
                        A.AOR_IMAGE_PATH
                    ELSE 
                        A.AOR_SEQ::text
                END AS Link,
                A.AOR_PLANT_CODE AS PLANT_CODE,
                A.AOR_SHEET_NO AS SHEET_NO,
                (SELECT M.SPM_PANEL_NO 
                FROM "Traceability".trc_SHEET_POSI_MST M 
                WHERE M.SPM_PLANT_CODE = A.AOR_PLANT_CODE 
                  AND M.SPM_TYPE = 'AOI_COA' 
                  AND '${PRODUCT_NAME}' LIKE M.SPM_PRODUCT_NAME || '%' 
                  AND M.SPM_POSITION = A.AOR_POSITION
                ) AS CABITY_NO,
                A.AOR_SEQ AS SEQ,
                A.AOR_INSPECT_COUNT AS INS_COUNT,
                A.AOR_MACHINE_NO AS MACHINE_NAME,
                A.AOR_REFERENCE AS REFERENCE,
                A.AOR_POSITION AS POSITION,
                TO_CHAR(A.AOR_INSPECT_DATE,'DD/MM/YYYY') AS INSPECT_DATE,
                A.AOR_LOT_NO AS LOT_NO,
                A.AOR_RESULT AS RESULT,
                A.AOR_PROGRAM_NAME AS PROGRAM_NAME,
                A.AOR_IMAGE_PATH AS IMAGE_PATH,
                A.AOR_COMPONENT AS COMPONENT,
                A.AOR_CREATE_BY AS CREATE_BY,
                A.AOR_CREATE_PROGRAM AS CREATE_PROGRAM,
                TO_CHAR(A.AOR_CREATE_DATE,'DD/MM/YYYY') AS CREATE_DATE
            FROM 
                "Traceability".trc_AOI_COA_RSLT A
            LEFT JOIN 
                "Traceability".trc_FACTORY_MST F ON A.AOR_PLANT_CODE = F.SFM_PLANT_CODE
            WHERE 
                A.AOR_PLANT_CODE =  '${plant_code}'
                AND A.AOR_SHEET_NO = '${sheet_no}'
                AND (
                    ${panel_no} IS NULL OR 
                 
                    A.AOR_POSITION IN (
                        SELECT M.SPM_POSITION  
                        FROM "Traceability".trc_SHEET_POSI_MST M  
                        WHERE M.SPM_PLANT_CODE =   '${plant_code}'
                            AND M.SPM_TYPE = 'AOI_COA'
                            AND '${PRODUCT_NAME}' LIKE M.SPM_PRODUCT_NAME || '%' 
                            AND M.SPM_PANEL_NO =  ${panel_no}
                    )
                )
            ORDER BY 
                A.AOR_SEQ`;
    console.log(query);
    const result = await client.query(query);
    res.status(200).json(result.rows);
    await DisconnectPG_DB(client);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

//SPI Result
module.exports.SPIResult_getCheckData = async function (req, res) {
  console.log("SPIResult_getCheckData");
  var query = "";
  try {
    const { dataList } = req.body;
    // ('[{"strPlantCode":"5","strPanelNo":"79","strProduct":"VP6000M-7900"}]')
    const client = await ConnectPG_DB();
    const json_convertdata = JSON.stringify(dataList);
    query += ` select * from "Traceability".trc_041_SPIRESULT_getCheckData('[${json_convertdata}]')`;
    console.log(query)
    const result = await client.query(query);
    res.status(200).json(result.rows);
    await DisconnectPG_DB(client);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

module.exports.SPIResult_Getfinaldata = async function (req, res) {
  console.log("SPIResult_getfinaldata");
  var query = "";
  try {
    const { dataList } = req.body;
    // ('[{"strPlantCode":"5","strPanelNo":"79","strProduct":"VP6000M-7900","strSheetNo":"K900035953RGP1130194","strdtCheck":"1","strExport":"0"}]')
    const client = await ConnectPG_DB();
    const json_convertdata = JSON.stringify(dataList);
    query += `select * from "Traceability".trc_041_spiresult_getfinaldata('[${json_convertdata}]')`;
    console.log(query)
    const result = await client.query(query); 
    res.status(200).json(result.rows);
    await DisconnectPG_DB(client);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};
// Pre Result
module.exports.PreResult_GetCheck = async function (req, res) {
  console.log("PRE_RESULT_getCheck");
  var query = "";
  try {
    const { dataList } = req.body;
    // ('[{"strPlantCode":"5","strProduct":"RGOZ-517MW"}]')
    const client = await ConnectPG_DB();
    const json_convertdata = JSON.stringify(dataList);
    query += `select * from "Traceability".trc_042_PRE_RESULT_getCheck('[${json_convertdata}]')`;
    console.log(query)
    const result = await client.query(query); 
    res.status(200).json(result.rows);
    await DisconnectPG_DB(client);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

module.exports.PreResult_GetDataFound = async function (req, res) {
  console.log("PRE_RESULT_getCheck");
  var query = "";
  let data=[]
  try {
    const { dataList } = req.body;
    // ({"strPlantCode":"5","strProduct":"RGOZ-517MW","strSheetNo":"A170869092RGO6490350","strPiece_no":""})
    const client = await ConnectPG_DB();
    const json_convertdata = JSON.stringify(dataList);
    query += `select * from "Traceability".trc_042_pre_result_getdataFound('[${json_convertdata}]')`;
    console.log(query)
    const result = await client.query(query); 
    console.log(result.rows)
    if(result.rows[0].trc_042_pre_result_getdatafound!=null){
      data=result.rows[0].trc_042_pre_result_getdatafound
    }
    res.status(200).json(data);
    await DisconnectPG_DB(client);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

module.exports.PreResult_GetDataNotFound = async function (req, res) {
  console.log("PreResult_GetDataNotFound");
  var query = "";
  let data=[]
  try {
    const { dataList } = req.body;
    // ('[{"strPlantCode":"5","strProduct":"RGOZ-517MW","strSheetNo":"A170869092RGO6490350","strPiece_no":""}]')
    const client = await ConnectPG_DB();
    const json_convertdata = JSON.stringify(dataList);
    query += `select * from "Traceability".trc_042_pre_result_getdataNotFound('[${json_convertdata}]')`;
    console.log(query)
    const result = await client.query(query); 
    if(result.rows[0].trc_042_pre_result_getdatafound!=null){
      data=result.rows[0].trc_042_pre_result_getdatanotfound
    }
    res.status(200).json(data);
    await DisconnectPG_DB(client);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

module.exports.PreResult_GetDataNotFoundFound = async function (req, res) {
  console.log("PreResult_GetDataNotFound");
  var query = "";
  let data=[]
  try {
    const { dataList } = req.body;
    // ('[{"strPlantCode":"5","strProduct":"RGOZ-517MW","strSheetNo":"A170869092RGO6490350","strPiece_no":""}]')
    const client = await ConnectPG_DB();
    const json_convertdata = JSON.stringify(dataList);
    query += `select * from "Traceability".trc_042_pre_result_getdataNotFoundfound('[${json_convertdata}]')`;
    console.log(query)
    const result = await client.query(query); 
    if(result.rows[0].trc_042_pre_result_getdatafound!=null){
      data=result.rows[0].trc_042_pre_result_getdatanotfoundfound
    }
    res.status(200).json(data);
    await DisconnectPG_DB(client);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

//OST
module.exports.OSTResult_GetData1 = async function (req, res) {
  console.log("trc_044_ost_result_getdata1");
  var query = "";
  try {
    const { dataList } = req.body;
    //('[{"SHEET_NO":""}]');
    const client = await ConnectPG_DB();
    const json_convertdata = JSON.stringify(dataList);
    query += `select * from "Traceability".trc_044_ost_result_getdata1('[${json_convertdata}]')`;
    console.log(query)
    const result = await client.query(query); 
    res.status(200).json(result.rows);
    await DisconnectPG_DB(client);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

// OST BADMARK
module.exports.OSTResult_GetData2 = async function (req, res) {
  console.log("trc_044_ost_result_getdata2");
  var query = "";
  try {
    const { dataList } = req.body;
    //('[{"SHEET_NO":""}]');
    const client = await ConnectPG_DB();
    const json_convertdata = JSON.stringify(dataList);
    query += `select * from "Traceability".trc_044_ost_result_getdata2('[${json_convertdata}]')`;
    console.log(query)
    const result = await client.query(query); 
    res.status(200).json(result.rows);
    await DisconnectPG_DB(client);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};