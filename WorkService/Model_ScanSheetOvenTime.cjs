const {
  ConnectPG_DB,
  DisconnectPG_DB,
  ConnectOracleDB,
  DisconnectOracleDB,
} = require("../Conncetion/DBConn.cjs");
const { writeLogError } = require("../Common/LogFuction.cjs");
const oracledb = require("oracledb");

module.exports.SET_SMT_PROC_FLOW_OVEN = async function (req, res) {
  let queryPG = "";
  let queryFPC = "";
  let Fac = process.env.FacA1;
  let { strSheetNo, strUser, strStation } = req.body;
  let ART_LOT_NO;
  let MOT_PRODUCT_NAME;
  let V_LOT_NO;
  let V_PRODUCT;

  try {
    // first check data in Postgres
    try {
      const connect = await ConnectPG_DB();
      queryPG += `SELECT MT.ART_LOT_NO AS MOT_LOT_NO FROM "Traceability".TRC_AOI_RECORD_TIME MT WHERE MT.ART_PLANT_CODE = '${Fac}' 
     AND MT.ART_SHEET_NO = '${strSheetNo}' `;
      const result = await connect.query(queryPG);
      if (result.rows.length != 0) {
        ART_LOT_NO = result.rows[0].mot_lot_no;
      } else {
        ART_LOT_NO = "";
      }
    } catch (error) {
      writeLogError(error.message, queryPG);
      res.status(500).json({ message: error.message });
    }
    queryPG = "";
    queryFPC = "";
    // second check data in Oracle FPC
    try {
      const connect = await ConnectOracleDB("FPC");
      queryFPC += `SELECT L.LOT_PRD_NAME AS MOT_PRODUCT_NAME FROM FPC_LOT L WHERE L.LOT = '${ART_LOT_NO}' `;
      const result = await connect.execute(queryFPC);
      if (result.rows.length != 0) {
        MOT_PRODUCT_NAME = result.rows[0][0];
      } else {
        MOT_PRODUCT_NAME = "";
      }
    } catch (error) {
      writeLogError(error.message, queryPG);
      res.status(500).json({ message: error.message });
    }
    queryPG = "";
    queryFPC = "";
    //Union Section
    try {
      const connect = await ConnectPG_DB();
      queryPG += `SELECT COALESCE (MAX(M.MOT_LOT_NO),' ') AS V_LOT_NO,
             	    COALESCE(MAX(M.MOT_PRODUCT_NAME),' ') AS V_PRODUCT
             	    FROM (
					         SELECT MT.MOT_LOT_NO
					                , MT.MOT_PRODUCT_NAME
					         FROM "Traceability".TRC_MOT_RECORD_TIME MT
					         WHERE MT.MOT_PLANT_CODE = '${Fac}'
					               AND MT.MOT_SHEET_NO = '${strSheetNo}'
					         UNION 
					         SELECT '${ART_LOT_NO}' AS MOT_LOT_NO,
					                '${MOT_PRODUCT_NAME}' AS MOT_PRODUCT_NAME
				          )M `;
      const result = await connect.query(queryPG);
      if (result.rows.length != 0) {
        V_LOT_NO = result.rows[0].v_lot_no;
        V_PRODUCT = result.rows[0].v_product;
      } else {
        res.status(200).json({ message: "No data found" });
      }
    } catch (error) {
      writeLogError(error.message, queryPG);
      res.status(500).json({ message: error.message });
    }
    queryPG = "";
    queryFPC = "";
    //Procedure Section FPC
    try {
      const connect = await ConnectOracleDB("PCTTTEST");
      // queryFPC += `call FPC.TRC_COMMON_TRACEABILITY.TRC_007_SET_SMT_PROC_FLOW_OVEN('${strSheetNo}','${strUser}','${strStation}','${V_LOT_NO}','${V_PRODUCT}','${Fac}','');`;
      const queryFPC = `DECLARE
      P_SHEET_NO VARCHAR2(100) := '${strSheetNo}';
      P_USER VARCHAR2(100) := '${strUser}';
      P_STATION VARCHAR2(100) := '${strStation}';
      V_LOT_NO VARCHAR2(100) := '${V_LOT_NO}';
      V_PRODUCT VARCHAR2(100) := '${V_PRODUCT}';
      V_PLANT_CODE VARCHAR2(100) := 'THA';
      P_ERROR VARCHAR2(100);
  BEGIN
      FPC.TRC_COMMON_TRACEABILITY.TRC_007_SET_SMT_PROC_FLOW_OVEN(
          P_SHEET_NO,
          P_USER,
          P_STATION,
          V_LOT_NO,
          V_PRODUCT,
          V_PLANT_CODE,
          P_ERROR
      );
      DBMS_OUTPUT.PUT_LINE('P_ERROR: ' || P_ERROR);
  END;`;
      console.log(queryFPC);
      const result = await connect.execute(queryFPC);
      // console.log(result);
      // res.status(200).json({ p_error: result });

      if (result.rows == "") {
        res.status(200).json({ p_error: "" });
      } else {
        res.status(409).json({ p_error: result.rows[0][0] });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } catch (error) {
    console.error("ข้อผิดพลาดในการค้นหาข้อมูล:", error.message);
    // writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};
