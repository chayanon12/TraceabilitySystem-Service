const { query } = require("express");
const {
  ConnectPG_DB,
  DisconnectPG_DB,
  ConnectOracleDB,
  DisconnectOracleDB,
} = require("../Conncetion/DBConn.cjs");
const { queueRequests } = require("oracledb");
const { writeLogError } = require("../Common/LogFuction.cjs");

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
    console.log(json_convertdata);
    query += `SELECT * FROM "Traceability".trc_000_common_getconnectshtmastercheckresult('[${json_convertdata}]');`;
    console.log(query);
    const result = await client.query(query);
    res.status(200).json(result.rows);
    await DisconnectPG_DB(client);
  } catch (error) {
    writeLogError(error.message, query);
    console.log(error)
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

module.exports.GetSerialProductByProduct = async function (req, res) {
  try {
    let query = "";
    const Conn = await ConnectOracleDB("SMT");
    const { strPrdname } = req.body;
    query += `SELECT PRD.PRM_PRODUCT_NAME AS SLM_PRD_NAME,`;
    query += `'' AS SLM_CUST_PART_NAME,`;
    query += `NVL(PRD.PRM_SERIAL_LENGTH,0) AS SLM_SERIAL_LENGTH,`;
    query += `'Y' AS SLM_FIX_FLAG,`;
    query += `NVL(PRD.PRM_ENG_CODE||PRM_REV, ' ') AS SLM_FIX_DIGIT,`;
    query += `NVL(PRD.PRM_START_DIGIT,0) AS SLM_FIX_START_DIGIT,`;
    query += `NVL(PRD.PRM_END_DIGIT,0) AS SLM_FIX_END_DIGIT,`;
    query += `'N' AS SLM_TRAY_FLAG,`;
    query += `0 AS SLM_TRAY_LENGTH,`;
    query += `'Y' AS SLM_TEST_RESULT_FLAG,`;
    query += `NVL(PRD.PRM_PCS_SCAN,0) AS SLM_SERIAL_COUNT,`;
    query += `'Y' AS SLM_AUTO_SCAN,`;
    query += `PRD.PRM_LAMINATION_SIDE AS SLM_BARCODE_SIDE,`;
    query += `NVL(PRD.PRM_PCS_SHT,0) AS SLM_SERIAL_SHT,`;
    query += `NVL(PRD.PRM_SHEET_SCAN,1) AS SLM_SHT_SCAN,`;
    query += `NVL(PRD.PRM_BARCODE_REQ_CONFIG, 'N') AS PRM_BARCODE_REQ_CONFIG,`;
    query += `NVL(PRD.PRM_CONFIG_CODE, ' ') AS PRM_CONFIG_CODE,`;
    query += `NVL(PRD.PRM_START_CONFIG,0) AS PRM_START_CONFIG,`;
    query += `NVL(PRD.PRM_END_CONFIG,0) AS PRM_END_CONFIG,`;
    query += `NVL(PRD.PRM_RUNNING_REQ_CONFIG, 'N') AS PRM_RUNNING_REQ_CONFIG,`;
    query += `NVL(PRD.PRM_DUPLICATE_START,0) AS PRM_DUPLICATE_START,`;
    query += `NVL(PRD.PRM_DUPLICATE_END,0) AS PRM_DUPLICATE_END,`;
    query += `NVL(PRD.PRM_REQ_CHECK_PRD_SHT, 'N') AS PRM_REQ_CHECK_PRD_SHT,`;
    query += `NVL(PRD.PRM_CHECK_PRD_SHT_START,0) AS PRM_CHECK_PRD_SHT_START,`;
    query += `NVL(PRD.PRM_CHECK_PRD_SHT_END,0) AS PRM_CHECK_PRD_SHT_END,`;
    query += `NVL(PRD.PRM_ABBR, ' ') AS PRM_ABBR,`;
    query += `NVL(PRD.PRM_REQ_CHECK_LOT_SHT, 'N') AS PRM_REQ_CHECK_LOT_SHT,`;
    query += `NVL(PRD.PRM_CHECK_LOT_SHT_START,0) AS PRM_CHECK_LOT_SHT_START,`;
    query += `NVL(PRD.PRM_CHECK_LOT_SHT_END,0) AS PRM_CHECK_LOT_SHT_END,`;
    query += `NVL(PRD.PRM_CHECK_CHIP_ID_FLG, 'N') AS PRM_CHECK_CHIP_ID_FLG,`;
    query += `NVL(PRD.PRM_PLASMA_TIME_FLG, 'N') AS PRM_PLASMA_TIME_FLG,`;
    query += `NVL(PRD.PRM_PLASMA_TIME,0) AS PRM_PLASMA_TIME,`;
    query += `NVL(PRM_REQ_START_SEQ_FLG, 'N') AS PRM_REQ_START_SEQ_FLG,`;
    query += `NVL(PRM_START_SEQ_CODE, ' ') AS PRM_START_SEQ_CODE,`;
    query += `NVL(PRM_START_SEQ_START,0) AS PRM_START_SEQ_START,`;
    query += `NVL(PRM_START_SEQ_END,0) AS PRM_START_SEQ_END,`;
    query += `NVL(PRM_SHEET_ELT_FLG, 'N') AS PRM_SHEET_ELT_FLG,`;
    query += `NVL(PRM_FINAL_AOI_SPI_FLG, 'N') AS PRM_FINAL_AOI_SPI_FLG,`;
    query += `NVL(PRM_CONN_ROLL_SHT_FLG, 'N') AS PRM_CONN_ROLL_SHT_FLG,`;
    query += `NVL(PRM_CONN_ROLL_SHT_LENGTH,0) AS PRM_CONN_ROLL_SHT_LENGTH,`;
    query += `NVL(PRM_CONN_ROLL_LEAF_FLG, 'N') AS PRM_CONN_ROLL_LEAF_FLG,`;
    query += `NVL(PRM_CONN_ROLL_LENGTH,0) AS PRM_CONN_ROLL_LENGTH,`;
    query += `NVL(PRM_CONN_LEAF_LENGTH,0) AS PRM_CONN_LEAF_LENGTH,`;
    query += `NVL(PRM_DATE_INPROC_FLG, 'N') AS PRM_DATE_INPROC_FLG,`;
    query += `NVL(PRM_DATE_INPROC, ' ') AS PRM_DATE_INPROC,`;
    query += `NVL(PRM_DATE_TYPE, ' ') AS PRM_DATE_TYPE,`;
    query += `NVL(PRM_CHECK_WEEKCODE_FLG, 'N') AS PRM_CHECK_WEEKCODE_FLG,`;
    query += `NVL(PRM_CHECK_WEEKCODE_START,0) AS PRM_CHECK_WEEKCODE_START,`;
    query += `NVL(PRM_CHECK_WEEKCODE_END,0) AS PRM_CHECK_WEEKCODE_END,`;
    query += `NVL(PRM_SHT_PRE_AOI_F, 'N') AS PRM_SHT_PRE_AOI_F,`;
    query += `NVL(PRM_SHT_PRE_AOI_B, 'N') AS PRM_SHT_PRE_AOI_B,`;
    query += `NVL(PRM_SHT_AOI_F, 'N') AS PRM_SHT_AOI_F,`;
    query += `NVL(PRM_SHT_AOI_B, 'N') AS PRM_SHT_AOI_B,`;
    query += `NVL(PRM_SHT_AOI_COAT_F, 'N') AS PRM_SHT_AOI_COAT_F,`;
    query += `NVL(PRM_SHT_AOI_COAT_B, 'N') AS PRM_SHT_AOI_COAT_B,`;
    query += `NVL(PRM_SHT_SPI_F, 'N') AS PRM_SHT_SPI_F,`;
    query += `NVL(PRM_SHT_SPI_B, 'N') AS PRM_SHT_SPI_B,`;
    query += `NVL(PRM_CONN_ROLL_LEAF_SCAN,0) AS PRM_CONN_ROLL_LEAF_SCAN,`;
    query += `NVL(PRM_CONN_ROLL_SERIAL_FLG, 'N') AS PRM_CONN_ROLL_SERIAL_FLG,`;
    query += `NVL(PRM_CONN_ROLL_PRD_FLG, 'N') AS PRM_CONN_ROLL_PRD_FLG,`;
    query += `NVL(PRM_CONN_ROLL_PRD_START,0) AS PRM_CONN_ROLL_PRD_START,`;
    query += `NVL(PRM_CONN_ROLL_PRD_END,0) AS PRM_CONN_ROLL_PRD_END,`;
    query += `NVL(PRM_CONN_ROLL_REQ_PRD_SHT,'N') AS PRM_CONN_ROLL_REQ_PRD_SHT, `;
    query += `NVL(PRM_CONN_ROLL_PRD_SHT_START,0) AS PRM_CONN_ROLL_PRD_SHT_START,`;
    query += `NVL(PRM_CONN_ROLL_PRD_SHT_END,0) AS PRM_CONN_ROLL_PRD_SHT_END,`;
    query += `NVL(PRM_CONN_ROLL_REQ_LOT_SHT,'N') AS PRM_CONN_ROLL_REQ_LOT_SHT,`;
    query += `NVL(PRM_CONN_ROLL_LOT_SHT_START,0) AS PRM_CONN_ROLL_LOT_SHT_START,`;
    query += `NVL(PRM_CONN_ROLL_LOT_SHT_END,0) AS PRM_CONN_ROLL_LOT_SHT_END,`;
    query += `NVL(PRM_CONN_ROLL_PRD_FIX,' ') AS PRM_CONN_ROLL_PRD_FIX,`;
    query += `NVL(PRM_SHT_MACHINE_FLG,'N') AS PRM_SHT_MACHINE_FLG,`;
    query += `NVL(PRM_PROC_CONTROL_TIME_FLG,'N') AS PRM_PROC_CONTROL_TIME_FLG,`;
    query += `NVL(PRM_PROC_CONTROL_TIME,0) AS PRM_PROC_CONTROL_TIME,`;
    query += `NVL(PRM_CONN_SHT_CONTROL_TIME_FLG,'N') AS PRM_CONN_SHT_CONTROL_TIME_FLG,`;
    query += `NVL(PRM_FINAL_PACKING_GROUP_FLG,'N') AS PRM_FINAL_PACKING_GROUP_FLG,`;
    query += `NVL(PRM_BARCODE_GRADE,' ') AS PRM_BARCODE_GRADE,`;
    query += `NVL(PRM_SERIAL_START_CODE,' ') AS PRM_SERIAL_START_CODE,`;
    query += `NVL(PRM_SHT_PLASMA_TIME_FLG,'N') AS PRM_SHT_PLASMA_TIME_FLG,`;
    query += `NVL(PRM_SHT_PLASMA_TIME,0) AS PRM_SHT_PLASMA_TIME,`;
    query += `NVL(PRM_SHEET_TYPE,'D') AS PRM_SHEET_TYPE,`;
    query += `NVL(PRM_PLASMA_TIME_SKIP_ELT,'N') AS PRM_PLASMA_TIME_SKIP_ELT,`;
    query += `NVL(PRM_PLASMA_TIME_HIDE_TIME,'N') AS PRM_PLASMA_TIME_HIDE_TIME,`;
    query += `NVL(PRM_PCS_TRAY,0) AS PRM_PCS_TRAY,`;
    query += `NVL(PRM_CHECK_EFPC_AOM_FLG,'N') AS PRM_CHECK_EFPC_AOM_FLG,`;
    query += `NVL(PRM_CHECK_EFPC_AOI_FLG,'N') AS PRM_CHECK_EFPC_AOI_FLG,`;
    query += `NVL(PRM_CHECK_EFPC_OST_FLG,'N') AS PRM_CHECK_EFPC_OST_FLG,`;
    query += `NVL(PRM_CHECK_EFPC_AVI_FLG,'N') AS PRM_CHECK_EFPC_AVI_FLG,`;
    // query += `NVL(PRM_CHECK_EFPC_AVI_FLG,'N') AS PRM_CHECK_EFPC_AVI_FLG,`;
    // query += `,NVL(PRM_CONN_SHTPCS_PLASMA_TIME_FL,'N') AS PRM_CONN_SHTPCS_PLASMA_TIME_FL `
    // query += `,NVL(PRM_CONN_SHTPCS_PLASMA_TIME_FLG,'N') AS PRM_CONN_SHTPCS_PLASMA_TIME_FLG `
    query += `NVL(PRM_ADDITIONAL_INFO,' ') AS PRM_ADDITIONAL_INFO,`;
    query += `NVL(PRM_SHT_XRAY_F,'N') AS PRM_SHT_XRAY_F,`;
    query += `NVL(PRM_SHT_XRAY_B,'N') AS PRM_SHT_XRAY_B,`;
    query += `NVL(PRM_SHT_XRAY_1_TIME_FLG,'N') AS PRM_SHT_XRAY_1_TIME_FLG,`;
    query += `NVL(PRM_FIN_GATE_INSPECT_FLG,'N') AS PRM_FIN_GATE_INSPECT_FLG,`;
    query += `NVL(PRM_FIN_GATE_INSPECT_PROC,' ') AS PRM_FIN_GATE_INSPECT_PROC `;
    query += `FROM SMT_PRODUCT_MST PRD `;
    query += `WHERE PRD.PRM_PRODUCT_NAME = '${strPrdname}' `;
    query += `AND PRD.PRM_PLANT_CODE = 'THA'`;
    const result = await Conn.execute(query);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows);
      DisconnectOracleDB(Conn);
    } else {
      return;
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
