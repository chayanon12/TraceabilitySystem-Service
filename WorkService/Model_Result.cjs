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
    // ('{"strplantcode":"5","strsheetno":"A903104669RGP4630077","strprdname":"RGOZ-517MW","panelno":21}')
    const client = await ConnectPG_DB();
    const json_convertdata = JSON.stringify(dataList);
    query += `select * from "Traceability".trc_051_aoicoaresult2_getdata2('${json_convertdata}')` 
    const result = await client.query(query);
    res.status(200).json(result.rows);
    await DisconnectPG_DB(client);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

module.exports.GetAoi_Coa_Result2_Export = async function (req, res) {
  var query = "";
  try {
    const { dataList } = req.body;
    // ('{"strplantcode":"5","strsheetno":"A903104669RGP4630077","strprdname":"RGOZ-517MW","panelno":21}')
    const client = await ConnectPG_DB();
    const json_convertdata = JSON.stringify(dataList);
    query += `select * from "Traceability".trc_051_aoicoaresult_getdata('${json_convertdata}')` 
    const result = await client.query(query);
    res.status(200).json(result.rows);
    await DisconnectPG_DB(client);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};
// ------------------------------------------------------
//SPI Result
module.exports.SPIResult_getCheckData = async function (req, res) {
  var query = "";
  try {
    const { dataList } = req.body;
    // ('[{"strPlantCode":"5","strPanelNo":"79","strProduct":"VP6000M-7900"}]')
    const client = await ConnectPG_DB();
    const json_convertdata = JSON.stringify(dataList);
    query += ` select * from "Traceability".trc_041_SPIRESULT_getCheckData('[${json_convertdata}]')`;
    const result = await client.query(query);
    res.status(200).json(result.rows);
    await DisconnectPG_DB(client);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};
// ------------------------------------------------------
module.exports.SPIResult_Getfinaldata = async function (req, res) {
  var query = "";
  try {
    const { dataList } = req.body;
    // ('[{"strPlantCode":"5","strPanelNo":"79","strProduct":"VP6000M-7900","strSheetNo":"K900035953RGP1130194","strdtCheck":"1","strExport":"0"}]')
    const client = await ConnectPG_DB();
    const json_convertdata = JSON.stringify(dataList);
    query += `select * from "Traceability".trc_041_spiresult_getfinaldata('[${json_convertdata}]')`;
    const result = await client.query(query); 
    res.status(200).json(result.rows);
    await DisconnectPG_DB(client);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};
// ------------------------------------------------------
// Pre Result
module.exports.PreResult_GetCheck = async function (req, res) {
  var query = "";
  try {
    const { dataList } = req.body;
    // ('[{"strPlantCode":"5","strProduct":"RGOZ-517MW"}]')
    const client = await ConnectPG_DB();
    const json_convertdata = JSON.stringify(dataList);
    query += `select * from "Traceability".trc_042_PRE_RESULT_getCheck('[${json_convertdata}]')`;
    const result = await client.query(query); 
    res.status(200).json(result.rows);
    await DisconnectPG_DB(client);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

module.exports.PreResult_GetDataFound = async function (req, res) {
  var query = "";
  let data=[]
  try {
    const { dataList } = req.body;
    // ({"strPlantCode":"5","strProduct":"RGOZ-517MW","strSheetNo":"A170869092RGO6490350","strPiece_no":""})
    const client = await ConnectPG_DB();
    const json_convertdata = JSON.stringify(dataList);
    query += `select * from "Traceability".trc_042_pre_result_getdataFound('[${json_convertdata}]')`;
    const result = await client.query(query); 
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
  var query = "";
  let data=[]
  try {
    const { dataList } = req.body;
    // ('[{"strPlantCode":"5","strProduct":"RGOZ-517MW","strSheetNo":"A170869092RGO6490350","strPiece_no":""}]')
    const client = await ConnectPG_DB();
    const json_convertdata = JSON.stringify(dataList);
    query += `select * from "Traceability".trc_042_pre_result_getdataNotFound('[${json_convertdata}]')`;
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
  var query = "";
  let data=[]
  try {
    const { dataList } = req.body;
    // ('[{"strPlantCode":"5","strProduct":"RGOZ-517MW","strSheetNo":"A170869092RGO6490350","strPiece_no":""}]')
    const client = await ConnectPG_DB();
    const json_convertdata = JSON.stringify(dataList);
    query += `select * from "Traceability".trc_042_pre_result_getdataNotFoundfound('[${json_convertdata}]')`;
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
// ------------------------------------------------------
//OST
module.exports.OSTResult_GetData1 = async function (req, res) {
  var query = "";
  try {
    const { dataList } = req.body;
    //('[{"SHEET_NO":""}]');
    const client = await ConnectPG_DB();
    const json_convertdata = JSON.stringify(dataList);
    query += `select * from "Traceability".trc_044_ost_result_getdata1('[${json_convertdata}]')`;
    const result = await client.query(query); 
    res.status(200).json(result.rows);
    await DisconnectPG_DB(client);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};
// ------------------------------------------------------
// OST BADMARK
module.exports.OSTResult_GetData2 = async function (req, res) {
  var query = "";
  try {
    const { dataList } = req.body;
    //('[{"SHEET_NO":""}]');
    const client = await ConnectPG_DB();
    const json_convertdata = JSON.stringify(dataList);
    query += `select * from "Traceability".trc_044_ost_result_getdata2('[${json_convertdata}]')`;
    const result = await client.query(query); 
    res.status(200).json(result.rows);
    await DisconnectPG_DB(client);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};
// ------------------------------------------------------
// XrayResult 
module.exports.XrayResult = async function (req, res) {
  var query = "";
  try {
    const { dataList } = req.body;
    //('{"strsheetno": "A180831355RGO8010016","strserialno": 22,"inspectno": 1,"inspectdate": "2018-10-27"}');
    const client = await ConnectPG_DB();
    const json_convertdata = JSON.stringify(dataList);
    query += `select * from "Traceability".trc_052_xrayresult_getdata('${json_convertdata}')`;
    const result = await client.query(query); 
    res.status(200).json(result.rows);
    await DisconnectPG_DB(client);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};  
// ------------------------------------------------------
// AOI DATA 
module.exports.getAOI_RESULT = async function (req, res) {
  var query = "";
  console.log("OKจ้า")
  try {
    const { dataList } = req.body;
    // ('{"strplantcode":"5","strsheetno":"A903104669RGP4630077","strprdname":"RGOZ-517MW","panelno":21}')
    const client = await ConnectPG_DB();
    const json_convertdata = JSON.stringify(dataList);
    query += `select * from "Traceability".trc_051_aoi_getdata2('${json_convertdata}')`
    const result = await client.query(query);
    res.status(200).json(result.rows);
    await DisconnectPG_DB(client);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};
module.exports.Get_AOI_Export = async function (req, res) {
  var query = "";
  try {
    const { dataList } = req.body;
    // ('{"strplantcode":"5","strsheetno":"A903104669RGP4630077","strprdname":"RGOZ-517MW","panelno":21}')
    const client = await ConnectPG_DB();
    const json_convertdata = JSON.stringify(dataList);
    query += `select * from "Traceability".trc_051_aoiresult_export('${json_convertdata}')` 
    const result = await client.query(query);
    res.status(200).json(result.rows);
    await DisconnectPG_DB(client);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};
