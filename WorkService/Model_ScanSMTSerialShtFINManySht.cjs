const { query } = require("express");
const {
  ConnectPG_DB,
  DisconnectPG_DB,
  ConnectOracleDB,
  DisconnectOracleDB,
} = require("../Conncetion/DBConn.cjs");
const { queueRequests } = require("oracledb");
const { writeLogError } = require("../Common/LogFuction.cjs");

//Function

//FPC
module.exports.GetSerialProductByProduct = async function (req, res) {
  let query = "";
  try {
    const Conn = await ConnectOracleDB("SMT");
    const { prdName } = req.body;
    query += `    SELECT PRD.PRM_PRODUCT_NAME AS SLM_PRD_NAME 
                  ,'' AS SLM_CUST_PART_NAME 
                  ,NVL(PRD.PRM_SERIAL_LENGTH,0) AS SLM_SERIAL_LENGTH 
                  ,'Y' AS SLM_FIX_FLAG 
                  ,NVL(PRD.PRM_ENG_CODE||PRM_REV,' ') AS SLM_FIX_DIGIT 
                  ,NVL(PRD.PRM_START_DIGIT,0) AS SLM_FIX_START_DIGIT  
                  ,NVL(PRD.PRM_END_DIGIT,0) AS SLM_FIX_END_DIGIT 
                  ,'N' AS SLM_TRAY_FLAG 
                  ,0 AS SLM_TRAY_LENGTH 
                  ,'Y' AS SLM_TEST_RESULT_FLAG 
                  ,NVL(PRD.PRM_PCS_SCAN,0) AS SLM_SERIAL_COUNT 
                  ,'Y' AS SLM_AUTO_SCAN 
                  ,PRD.PRM_LAMINATION_SIDE AS SLM_BARCODE_SIDE 
                  ,NVL(PRD.PRM_PCS_SHT,0) AS SLM_SERIAL_SHT 
                  ,NVL(PRD.PRM_SHEET_SCAN,1) AS SLM_SHT_SCAN 
                  ,NVL(PRD.PRM_BARCODE_REQ_CONFIG,'N') AS PRM_BARCODE_REQ_CONFIG 
                  ,NVL(PRD.PRM_CONFIG_CODE,' ') AS PRM_CONFIG_CODE 
                  ,NVL(PRD.PRM_START_CONFIG,0) AS PRM_START_CONFIG 
                  ,NVL(PRD.PRM_END_CONFIG,0) AS PRM_END_CONFIG 
                  ,NVL(PRD.PRM_RUNNING_REQ_CONFIG,'N') AS PRM_RUNNING_REQ_CONFIG 
                  ,NVL(PRD.PRM_DUPLICATE_START,0) AS PRM_DUPLICATE_START 
                  ,NVL(PRD.PRM_DUPLICATE_END,0) AS PRM_DUPLICATE_END 
                  ,NVL(PRD.PRM_REQ_CHECK_PRD_SHT,'N') AS PRM_REQ_CHECK_PRD_SHT 
                  ,NVL(PRD.PRM_CHECK_PRD_SHT_START,0) AS PRM_CHECK_PRD_SHT_START 
                  ,NVL(PRD.PRM_CHECK_PRD_SHT_END,0) AS PRM_CHECK_PRD_SHT_END
                  ,NVL(PRD.PRM_ABBR,' ') AS PRM_ABBR 
                  ,NVL(PRD.PRM_REQ_CHECK_LOT_SHT,'N') AS PRM_REQ_CHECK_LOT_SHT 
                  ,NVL(PRD.PRM_CHECK_LOT_SHT_START,0) AS PRM_CHECK_LOT_SHT_START 
                  ,NVL(PRD.PRM_CHECK_LOT_SHT_END,0) AS PRM_CHECK_LOT_SHT_END
                  ,NVL(PRD.PRM_CHECK_CHIP_ID_FLG,'N') AS PRM_CHECK_CHIP_ID_FLG
                  ,NVL(PRD.PRM_PLASMA_TIME_FLG,'N') AS PRM_PLASMA_TIME_FLG
                  ,NVL(PRD.PRM_PLASMA_TIME,0) AS PRM_PLASMA_TIME 
                  ,NVL(PRM_REQ_START_SEQ_FLG,'N') AS PRM_REQ_START_SEQ_FLG 
                  ,NVL(PRM_START_SEQ_CODE,' ') AS PRM_START_SEQ_CODE 
                  ,NVL(PRM_START_SEQ_START,0) AS PRM_START_SEQ_START 
                  ,NVL(PRM_START_SEQ_END,0) AS PRM_START_SEQ_END 
                  ,NVL(PRM_SHEET_ELT_FLG,'N') AS PRM_SHEET_ELT_FLG 
                  ,NVL(PRM_FINAL_AOI_SPI_FLG,'N') AS PRM_FINAL_AOI_SPI_FLG 
                  ,NVL(PRM_CONN_ROLL_SHT_FLG,'N') AS PRM_CONN_ROLL_SHT_FLG 
                  ,NVL(PRM_CONN_ROLL_SHT_LENGTH,0) AS PRM_CONN_ROLL_SHT_LENGTH 
                  ,NVL(PRM_CONN_ROLL_LEAF_FLG,'N') AS PRM_CONN_ROLL_LEAF_FLG 
                  ,NVL(PRM_CONN_ROLL_LENGTH,0) AS PRM_CONN_ROLL_LENGTH 
                  ,NVL(PRM_CONN_LEAF_LENGTH,0) AS PRM_CONN_LEAF_LENGTH 
                  ,NVL(PRM_DATE_INPROC_FLG,'N') AS PRM_DATE_INPROC_FLG 
                  ,NVL(PRM_DATE_INPROC,' ') AS PRM_DATE_INPROC 
                  ,NVL(PRM_DATE_TYPE,' ') AS PRM_DATE_TYPE 
                  ,NVL(PRM_CHECK_WEEKCODE_FLG,'N') AS PRM_CHECK_WEEKCODE_FLG  
                  ,NVL(PRM_CHECK_WEEKCODE_START,0) AS PRM_CHECK_WEEKCODE_START  
                  ,NVL(PRM_CHECK_WEEKCODE_END,0) AS PRM_CHECK_WEEKCODE_END 
                  ,NVL(PRM_SHT_PRE_AOI_F,'N') AS PRM_SHT_PRE_AOI_F 
                  ,NVL(PRM_SHT_PRE_AOI_B,'N') AS PRM_SHT_PRE_AOI_B 
                  ,NVL(PRM_SHT_AOI_F,'N') AS PRM_SHT_AOI_F 
                  ,NVL(PRM_SHT_AOI_B,'N') AS PRM_SHT_AOI_B 
                  ,NVL(PRM_SHT_AOI_COAT_F,'N') AS PRM_SHT_AOI_COAT_F 
                  ,NVL(PRM_SHT_AOI_COAT_B,'N') AS PRM_SHT_AOI_COAT_B 
                  ,NVL(PRM_SHT_SPI_F,'N') AS PRM_SHT_SPI_F 
                  ,NVL(PRM_SHT_SPI_B,'N') AS PRM_SHT_SPI_B
                  ,NVL(PRM_CONN_ROLL_LEAF_SCAN,0) AS PRM_CONN_ROLL_LEAF_SCAN 
                  ,NVL(PRM_CONN_ROLL_SERIAL_FLG,'N') AS PRM_CONN_ROLL_SERIAL_FLG  
                  ,NVL(PRM_CONN_ROLL_PRD_FLG,'N') AS PRM_CONN_ROLL_PRD_FLG 
                  ,NVL(PRM_CONN_ROLL_PRD_START,0) AS PRM_CONN_ROLL_PRD_START 
                  ,NVL(PRM_CONN_ROLL_PRD_END,0) AS PRM_CONN_ROLL_PRD_END 
                  ,NVL(PRM_CONN_ROLL_REQ_PRD_SHT,'N') AS PRM_CONN_ROLL_REQ_PRD_SHT 
                  ,NVL(PRM_CONN_ROLL_PRD_SHT_START,0) AS PRM_CONN_ROLL_PRD_SHT_START 
                  ,NVL(PRM_CONN_ROLL_PRD_SHT_END,0) AS PRM_CONN_ROLL_PRD_SHT_END 
                  ,NVL(PRM_CONN_ROLL_REQ_LOT_SHT,'N') AS PRM_CONN_ROLL_REQ_LOT_SHT 
                  ,NVL(PRM_CONN_ROLL_LOT_SHT_START,0) AS PRM_CONN_ROLL_LOT_SHT_START   
                  ,NVL(PRM_CONN_ROLL_LOT_SHT_END,0) AS PRM_CONN_ROLL_LOT_SHT_END 
                  ,NVL(PRM_CONN_ROLL_PRD_FIX,' ') AS PRM_CONN_ROLL_PRD_FIX 
                  ,NVL(PRM_SHT_MACHINE_FLG,'N') AS PRM_SHT_MACHINE_FLG 
                  ,NVL(PRM_PROC_CONTROL_TIME_FLG,'N') AS PRM_PROC_CONTROL_TIME_FLG 
                  ,NVL(PRM_PROC_CONTROL_TIME,0) AS PRM_PROC_CONTROL_TIME 
                  ,NVL(PRM_CONN_SHT_CONTROL_TIME_FLG,'N') AS PRM_CONN_SHT_CONTROL_TIME_FLG 
                  ,NVL(PRM_FINAL_PACKING_GROUP_FLG,'N') AS PRM_FINAL_PACKING_GROUP_FLG 
                  ,NVL(PRM_BARCODE_GRADE,' ') AS PRM_BARCODE_GRADE 
                  ,NVL(PRM_SERIAL_START_CODE,' ') AS PRM_SERIAL_START_CODE 
                  ,NVL(PRM_SHT_PLASMA_TIME_FLG,'N') AS PRM_SHT_PLASMA_TIME_FLG 
                  ,NVL(PRM_SHT_PLASMA_TIME,0) AS PRM_SHT_PLASMA_TIME 
                  ,NVL(PRM_SHEET_TYPE,'D') AS PRM_SHEET_TYPE
                  ,NVL(PRM_PLASMA_TIME_SKIP_ELT,'N') AS PRM_PLASMA_TIME_SKIP_ELT 
                  ,NVL(PRM_PLASMA_TIME_HIDE_TIME,'N') AS PRM_PLASMA_TIME_HIDE_TIME 
                  ,NVL(PRM_PCS_TRAY,0) AS PRM_PCS_TRAY 
                  ,NVL(PRM_CHECK_EFPC_AOM_FLG,'N') AS PRM_CHECK_EFPC_AOM_FLG 
                  ,NVL(PRM_CHECK_EFPC_AOI_FLG,'N') AS PRM_CHECK_EFPC_AOI_FLG 
                  ,NVL(PRM_CHECK_EFPC_OST_FLG,'N') AS PRM_CHECK_EFPC_OST_FLG 
                  ,NVL(PRM_CHECK_EFPC_AVI_FLG,'N') AS PRM_CHECK_EFPC_AVI_FLG 
                  ,NVL(PRM_ADDITIONAL_INFO,' ') AS PRM_ADDITIONAL_INFO 
                  ,NVL(PRM_SHT_XRAY_F,'N') AS PRM_SHT_XRAY_F 
                  ,NVL(PRM_SHT_XRAY_B,'N') AS PRM_SHT_XRAY_B 
                  ,NVL(PRM_SHT_XRAY_1_TIME_FLG,'N') AS PRM_SHT_XRAY_1_TIME_FLG 
                  ,NVL(PRM_FIN_GATE_INSPECT_FLG,'N') AS PRM_FIN_GATE_INSPECT_FLG 
                  ,NVL(PRM_FIN_GATE_INSPECT_PROC,' ') AS PRM_FIN_GATE_INSPECT_PROC 
           FROM SMT_PRODUCT_MST PRD 
           WHERE PRD.PRM_PRODUCT_NAME = '${prdName}' 
                 AND PRD.PRM_PLANT_CODE = 'THA' `;
    const result = await Conn.execute(query);
    if (result.rows.length > 0) {
      res.status(200).json({
        SLM_PRD_NAME: result.rows[0][0],
        SLM_CUST_PART_NAME: result.rows[0][1],
        SLM_SERIAL_LENGTH: result.rows[0][2],
        SLM_FIX_FLAG: result.rows[0][3],
        SLM_FIX_DIGIT: result.rows[0][4],
        SLM_FIX_START_DIGIT: result.rows[0][5],
        SLM_FIX_END_DIGIT: result.rows[0][6],
        SLM_TRAY_FLAG: result.rows[0][7],
        SLM_TRAY_LENGTH: result.rows[0][8],
        SLM_TEST_RESULT_FLAG: result.rows[0][9],
        SLM_SERIAL_COUNT: result.rows[0][10],
        SLM_AUTO_SCAN: result.rows[0][11],
        SLM_BARCODE_SIDE: result.rows[0][12],
        SLM_SERIAL_SHT: result.rows[0][13],
        SLM_SHT_SCAN: result.rows[0][14],
        PRM_BARCODE_REQ_CONFIG: result.rows[0][15],
        PRM_CONFIG_CODE: result.rows[0][16],
        PRM_START_CONFIG: result.rows[0][17],
        PRM_END_CONFIG: result.rows[0][18],
        PRM_RUNNING_REQ_CONFIG: result.rows[0][19],
        PRM_DUPLICATE_START: result.rows[0][20],
        PRM_DUPLICATE_END: result.rows[0][21],
        PRM_REQ_CHECK_PRD_SHT: result.rows[0][22],
        PRM_CHECK_PRD_SHT_START: result.rows[0][23],
        PRM_CHECK_PRD_SHT_END: result.rows[0][24],
        PRM_ABBR: result.rows[0][25],
        PRM_REQ_CHECK_LOT_SHT: result.rows[0][26],
        PRM_CHECK_LOT_SHT_START: result.rows[0][27],
        PRM_CHECK_LOT_SHT_END: result.rows[0][28],
        PRM_CHECK_CHIP_ID_FLG: result.rows[0][29],
        PRM_PLASMA_TIME_FLG: result.rows[0][30],
        PRM_PLASMA_TIME: result.rows[0][31],
        PRM_REQ_START_SEQ_FLG: result.rows[0][32],
        PRM_START_SEQ_CODE: result.rows[0][33],
        PRM_START_SEQ_START: result.rows[0][34],
        PRM_START_SEQ_END: result.rows[0][35],
        PRM_SHEET_ELT_FLG: result.rows[0][36],
        PRM_FINAL_AOI_SPI_FLG: result.rows[0][37],
        PRM_CONN_ROLL_SHT_FLG: result.rows[0][38],
        PRM_CONN_ROLL_SHT_LENGTH: result.rows[0][39],
        PRM_CONN_ROLL_LEAF_FLG: result.rows[0][40],
        PRM_CONN_ROLL_LENGTH: result.rows[0][41],
        PRM_CONN_LEAF_LENGTH: result.rows[0][42],
        PRM_DATE_INPROC_FLG: result.rows[0][43],
        PRM_DATE_INPROC: result.rows[0][44],
        PRM_DATE_TYPE: result.rows[0][45],
        PRM_CHECK_WEEKCODE_FLG: result.rows[0][46],
        PRM_CHECK_WEEKCODE_START: result.rows[0][47],
        PRM_CHECK_WEEKCODE_END: result.rows[0][48],
        PRM_SHT_PRE_AOI_F: result.rows[0][49],
        PRM_SHT_PRE_AOI_B: result.rows[0][50],
        PRM_SHT_AOI_F: result.rows[0][51],
        PRM_SHT_AOI_B: result.rows[0][52],
        PRM_SHT_AOI_COAT_F: result.rows[0][53],
        PRM_SHT_AOI_COAT_B: result.rows[0][54],
        PRM_SHT_SPI_F: result.rows[0][55],
        PRM_SHT_SPI_B: result.rows[0][56],
        PRM_CONN_ROLL_LEAF_SCAN: result.rows[0][57],
        PRM_CONN_ROLL_SERIAL_FLG: result.rows[0][58],
        PRM_CONN_ROLL_PRD_FLG: result.rows[0][59],
        PRM_CONN_ROLL_PRD_START: result.rows[0][60],
        PRM_CONN_ROLL_PRD_END: result.rows[0][61],
        PRM_CONN_ROLL_REQ_PRD_SHT: result.rows[0][62],
        PRM_CONN_ROLL_PRD_SHT_START: result.rows[0][63],
        PRM_CONN_ROLL_PRD_SHT_END: result.rows[0][64],
        PRM_CONN_ROLL_REQ_LOT_SHT: result.rows[0][65],
        PRM_CONN_ROLL_LOT_SHT_START: result.rows[0][66],
        PRM_CONN_ROLL_LOT_SHT_END: result.rows[0][67],
        PRM_CONN_ROLL_PRD_FIX: result.rows[0][68],
        PRM_SHT_MACHINE_FLG: result.rows[0][69],
        PRM_PROC_CONTROL_TIME_FLG: result.rows[0][70],
        PRM_PROC_CONTROL_TIME: result.rows[0][71],
        PRM_CONN_SHT_CONTROL_TIME_FLG: result.rows[0][72],
        PRM_FINAL_PACKING_GROUP_FLG: result.rows[0][73],
        PRM_BARCODE_GRADE: result.rows[0][74],
        PRM_SERIAL_START_CODE: result.rows[0][75],
        PRM_SHT_PLASMA_TIME_FLG: result.rows[0][76],
        PRM_SHT_PLASMA_TIME: result.rows[0][77],
        PRM_SHEET_TYPE: result.rows[0][78],
        PRM_PLASMA_TIME_SKIP_ELT: result.rows[0][79],
        PRM_PLASMA_TIME_HIDE_TIME: result.rows[0][80],
        PRM_PCS_TRAY: result.rows[0][81],
        PRM_CHECK_EFPC_AOM_FLG: result.rows[0][82],
        PRM_CHECK_EFPC_AOI_FLG: result.rows[0][83],
        PRM_CHECK_EFPC_OST_FLG: result.rows[0][84],
        PRM_CHECK_EFPC_AVI_FLG: result.rows[0][85],
        PRM_ADDITIONAL_INFO: result.rows[0][86],
        PRM_SHT_XRAY_F: result.rows[0][87],
        PRM_SHT_XRAY_B: result.rows[0][88],
        PRM_SHT_XRAY_1_TIME_FLG: result.rows[0][89],
        PRM_FIN_GATE_INSPECT_FLG: result.rows[0][90],
        PRM_FIN_GATE_INSPECT_PROC: result.rows[0][91],
      });
      console.log(result.rows[0][0]);
      DisconnectOracleDB(Conn);
    }
  } catch (error) {}
};
module.exports.GetProductDataByLot = async function (req, res) {
  let query = "";
  try {
    const Conn = await ConnectOracleDB("FPC");
    const { strLot } = req.body;
    var FINAL_GATE_LOT_PRIORITY_SKIP = process.env.FINAL_GATE_LOT_PRIORITY_SKIP;
    query += `SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_GetProductDataByLot('${strLot}','${FINAL_GATE_LOT_PRIORITY_SKIP}') AS x FROM dual`;
    const result = await Conn.execute(query);
    if (result.rows.length > 0) {
      var resultx = result.rows[0][0][0];
      var products = {
        PRD_NAME: resultx[0],
        ROLL_NO: resultx[1],
        LOT_EN: resultx[2],
        LOT_ALL: resultx[3],
      };
      res.status(200).json(products);
      DisconnectOracleDB(Conn);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.GetWeekCodebyLot = async function (req, res) {
  var query = "";
  try {
    const Conn = await ConnectOracleDB("FPC");
    const { strLot, strProc } = req.body;
    query += `SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_GetWeekCodebyLot('${strLot}','${strProc}') FROM DUAL`;
    const result = await Conn.execute(query);

    DisconnectOracleDB(Conn);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

module.exports.GetRollLeafScrapRBMP = async function (req, res) {
  var query = "";
  try {
    const Conn = await ConnectOracleDB("FPC");
    const { strRollNo } = req.body;
    query += `SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_GETROLLLEAFSCRAP('${strRollNo}') AS SCRAP_FLG  FROM dual`;
    const result = await Conn.execute(query);
    if (result.rows.length > 0) {
      res.status(200).json({ SCRAP_FLG: result.rows[0][0] });
      DisconnectOracleDB(Conn);
    }
  } catch (error) {
    writeLogError(error.message, query);
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// postgres

module.exports.GetProductData = async function (req, res) {
  var query = "";
  var Fac = process.env.FacA1;
  try {
    const client = await ConnectPG_DB();
    query += `SELECT * from "Traceability".trc_000_common_getproductdata('${Fac}')`;
    const result = await client.query(query);

    if (result.rows.length > 0) {
      res.status(200).json(result.rows);
      await DisconnectPG_DB(client);
    }
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

module.exports.GetLotSerialCountData = async function (req, res) {
  let query = "";
  try {
    const { strLot } = req.body;
    const client = await ConnectPG_DB();
    query += `SELECT * from "Traceability".trc_000_common_getlotserialcountdata('${strLot}')`;
    const result = await client.query(query);
    res.status(200).json(result.rows);
    await DisconnectPG_DB(client);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

module.exports.GetConnectShtMasterCheckResult = async function (req, res) {
  let query = "";
  try {
    const { strPrdname } = req.body;
    var SHT_PCS_MASTER_CODE = process.env.SHT_PCS_MASTER_CODE;
    var WORKING_START_TIME = process.env.WORKING_START_TIME;
    var SHT_PCS_MASTER_TIME = process.env.SHT_PCS_MASTER_TIME;

    const client = await ConnectPG_DB();
    const jsondata = {
      strProduct: strPrdname,
      strPcsmasterCode: SHT_PCS_MASTER_CODE,
      strWorkstartime: WORKING_START_TIME,
      strShtPcsmastertime: SHT_PCS_MASTER_TIME,
    };
    const json_convertdata = JSON.stringify(jsondata);
    query += `SELECT * FROM "Traceability".trc_000_common_getconnectshtmastercheckresult('[${json_convertdata}]');`;
    const result = await client.query(query);
    res.status(200).json(result.rows);
    await DisconnectPG_DB(client);
  } catch (error) {
    writeLogError(error.message, query);
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports.GetRollLeafDuplicate = async function (req, res) {
  let query = "";
  try {
    const { strRollLeaf } = req.body;
    const client = await ConnectPG_DB();
    query += `SELECT * FROM "Traceability".trc_000_common_getrollleafduplicate('${strRollLeaf}')`;
    const result = await client.query(query);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows);
      await DisconnectPG_DB(client);
    }
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

module.exports.GetConnectShtPlasmaTime = async function (req, res) {
  let query = "";
  try {
    const { strSheetnoF, strSheetnoB } = req.body;
    const client = await ConnectPG_DB();
    const jsondata = {
      strSheetnoF: strSheetnoF,
      strSheetnoB: strSheetnoB,
    };
    const json_convertdata = JSON.stringify(jsondata);
    query += `SELECT * FROM "Traceability".trc_000_common_getconnectshtplasmatime('[${json_convertdata}]');`;
    const result = await client.query(query);
    if (result.rows.length > 0) {
      data = result.rows;
      res.status(200).json(data.lot_no);
      await DisconnectPG_DB(client);
    }
    await DisconnectPG_DB(client);
  } catch (error) {
    writeLogError(error.message, query);
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports.GetSheetDuplicateConnectShtType = async function (req, res) {
  let query = "";
  try {
    const { strSheetnoF, strSheetnoB, strSheetType } = req.body;
    const client = await ConnectPG_DB();
    const jsondata = {
      strSheetnoF: strSheetnoF,
      strSheetnoB: strSheetnoB,
    };
    if (strSheetType == "D") {
      const json_convertdata = JSON.stringify(jsondata);
      query += `SELECT * FROM "Traceability".trc_000_common_getsheetduplicateconnectshttyped('[${json_convertdata}]');`;
      const result = await client.query(query);
      if (result.rows.length > 0) {
        res.status(200).json(result.rows[0]);
        await DisconnectPG_DB(client);
      }
    } else {
      const json_convertdata = JSON.stringify(jsondata);
      query += `SELECT * FROM "Traceability".trc_000_common_getsheetduplicateconnectshtnotype('[${json_convertdata}]');`;
      const result = await client.query(query);
      if (result.rows.length > 0) {
        res.status(200).json(result.rows.sheet_count);
        await DisconnectPG_DB(client);
      }
    }
  } catch (error) {
    writeLogError(error.message, query);
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// new function api
