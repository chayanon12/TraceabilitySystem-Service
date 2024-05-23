const { query } = require("express");
const {
  ConnectPG_DB,
  DisconnectPG_DB,
  ConnectOracleDB,
  DisconnectOracleDB,
} = require("../Conncetion/DBConn.cjs");
const { queueRequests } = require("oracledb");

module.exports.GetProductData = async function (req, res) {
  try {
    let query = "";
    const Conn = await ConnectOracleDB("SMT");
    query += `SELECT P.PRM_PRODUCT_NAME AS PRD_NAME `;
    query += `FROM SMT_PRODUCT_MST P `;
    query += `WHERE P.PRM_PLANT_CODE = 'THA' `;
    query += `AND NVL(P.PRM_PRODUCT_STATUS,'ACTIVE') = 'ACTIVE' `;
    query += `ORDER BY P.PRM_PRODUCT_NAME ASC `;
    const result = await Conn.execute(query);
    if (result.rows.length > 0) {
      res.status(200).json({ Product: result.rows });
      DisconnectOracleDB(Conn);
    } else {
      res.status(401).json({ message: "Not Found Data" });
      DisconnectOracleDB(Conn);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.GetProductDataByLot = async function (req, res) {
  try {
    let query = "";
    const Conn = await ConnectOracleDB("FPC");
    const { strLot } = req.body;
    query += `SELECT NVL(L.LOT_PRD_NAME,' ') AS PRD_NAME`;
    query += `, NVL(L.LOT_ROLL_NO,' ') AS ROLL_NO `;
    query += `, DECODE(L.LOT_PRIORITY,'14','Y','N') AS LOT_EN `;
    query += `, TO_CHAR(LISTAGG(L.LOT||DECODE(T1.LTR_FROM_LOT,NULL,'',','||T1.LTR_FROM_LOT)||DECODE(T2.LTR_FROM_LOT,NULL,'',','||T2.LTR_FROM_LOT)||DECODE(T3.LTR_FROM_LOT,NULL,'',','||T3.LTR_FROM_LOT)||DECODE(T4.LTR_FROM_LOT,NULL,'',','||T4.LTR_FROM_LOT)||DECODE(T5.LTR_FROM_LOT,NULL,'',','||T5.LTR_FROM_LOT),',') WITHIN GROUP (ORDER BY L.LOT ASC )) AS LOT_ALL `;
    query += `FROM  FPC.FPC_LOT L `;
    query += `, FPC_LOT_TRANSFER T1 `;
    query += `, FPC_LOT_TRANSFER T2 `;
    query += `, FPC_LOT_TRANSFER T3 `;
    query += `, FPC_LOT_TRANSFER T4 `;
    query += `, FPC_LOT_TRANSFER T5 `;
    query += `WHERE L.LOT =  '${strLot}' `;
    query += `AND L.LOT = T1.LTR_LOT(+) `;
    query += `AND T1.LTR_FROM_LOT = T2.LTR_LOT(+) `;
    query += `AND T2.LTR_FROM_LOT = T3.LTR_LOT(+) `;
    query += `AND T3.LTR_FROM_LOT = T4.LTR_LOT(+) `;
    query += `AND T4.LTR_FROM_LOT = T5.LTR_LOT(+) `;
    query += `GROUP BY NVL(L.LOT_PRD_NAME,' ') `;
    query += `, NVL(L.LOT_ROLL_NO,' ') `;
    query += `, DECODE(L.LOT_PRIORITY,'14','Y','N')`;
    const result = await Conn.execute(query);
    if (result.rows.length > 0) {
      res.status(200).json({
        PRD_NAME: result.rows[0][0],
        ROLL_NO: result.rows[0][1],
        LOT_EN: result.rows[0][2],
        LOT_ALL: result.rows[0][3],
      });
      DisconnectOracleDB(Conn);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.GetLotSerialCountData = async function (req, res) {
  let query = "";
  try {
    const Conn = await ConnectOracleDB("SMT");
    const { strLot } = req.body;
    query += `SELECT NVL((SELECT COUNT(*) `;
    query += `FROM ( `;
    query += `     SELECT DISTINCT S.LSS_FRONT_SHEET_NO, S.LSS_BACK_SHEET_NO `;
    query += `     FROM SMT_LOT_SHT_SERIAL S `;
    query += `     WHERE S.LSS_PLANT_CODE = 'THA' `;
    query += `           AND S.LSS_LOT_NO = '${strLot}' `;
    query += `     ) S `;
    query += `), 0) AS COUNT_SHT `;
    query += `, NVL(( `;
    query += `    SELECT COUNT(*) `;
    query += `    FROM SMT_LOT_SHT_SERIAL S `;
    query += `    WHERE S.LSS_PLANT_CODE = 'THA' `;
    query += `          AND S.LSS_LOT_NO = '${strLot}' `;
    query += `), 0) COUNT_PCS `;
    query += `FROM DUAL`;

    const result = await Conn.execute(query);
    if (result.rows.length > 0) {
      res
        .status(200)
        .json({ COUNT_SHT: result.rows[0][0], COUNT_PCS: result.rows[0][1] });
      DisconnectOracleDB(Conn);
    }
  } catch (error) {
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
      res
        .status(200)
        .json(result.rows);
      DisconnectOracleDB(Conn);
    } else {
      return;
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
