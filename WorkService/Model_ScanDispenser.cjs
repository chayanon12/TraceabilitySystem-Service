const {
  ConnectPG_DB,
  DisconnectPG_DB,
  ConnectOracleDB,
  DisconnectOracleDB,
} = require("../Conncetion/DBConn.cjs");
const { writeLogError } = require("../Common/LogFuction.cjs");

module.exports.SET_SMT_PROC_FLOW_DISPENSER_CB = async function (req, res) {
  let queryPG = "";
  let queryFPC = "";
  let Fac = process.env.FacA1;
  let { strSheetNo, strUser, strStation, strCBno } = req.body;
  let ART_LOT_NO;
  let MOT_PRODUCT_NAME;
  let V_LOT_NO;
  let V_PRODUCT;
  let V_HOLDING_TIME;
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
      const connect = await ConnectOracleDB("PCTTTEST");
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
        // res.status(200).json({ V_LOT_NO, V_PRODUCT });
      } else {
        res.status(404).json({ message: "No data found" });
      }
    } catch (error) {
      writeLogError(error.message, queryPG);
      res.status(500).json({ message: error.message });
    }
    queryPG = "";
    queryFPC = "";
    // get Holdingtime
    try {
      const connect = await ConnectPG_DB();
      queryPG += `SELECT COALESCE(
           (
           SELECT TRUNC((EXTRACT(EPOCH FROM (current_timestamp - R.RET_INSPECT_DATE)) / 3600)::numeric, 2) 
               FROM "Traceability".TRC_REFLOW_RECORD_TIME R
               WHERE R.RET_PLANT_CODE = '${Fac}'
                     AND R.RET_SHEET_NO = '${strSheetNo}'
           ),
           COALESCE(
               (
               SELECT TRUNC((EXTRACT(EPOCH FROM (current_timestamp - A.ART_INSPECT_DATE)) / 3600)::numeric, 2)
                   FROM "Traceability".TRC_AOI_RECORD_TIME A
                   WHERE A.ART_PLANT_CODE = '${Fac}'
                         AND A.ART_SHEET_NO = '${strSheetNo}'
               ),
               0
           )
       ) AS HOLDING_TIME; `;
      const result = await connect.query(queryPG);
      if (result.rows.length != 0) {
        V_HOLDING_TIME = parseFloat(result.rows[0].holding_time);
        // res.status(200).json({ V_HOLDING_TIME: V_HOLDING_TIME });
      } else {
        res.status(404).json({ message: "No data found" });
      }
    } catch (error) {
      writeLogError(error.message, queryPG);
      res.status(500).json({ message: error.message });
    }
    queryPG = "";
    queryFPC = "";
    // Procedure Section PCTTTEST
    try {
      const connect = await ConnectOracleDB("PCTTTEST");
     
      queryFPC += `DECLARE
                    P_SHEET_NO VARCHAR2(100) := '${strSheetNo}';
                    P_CB_NO VARCHAR2(100) := '${strCBno}';
                    P_USER VARCHAR2(100) := '${strUser}';
                    P_STATION VARCHAR2(100) := '${strStation}';
                    V_PRODUCT VARCHAR2(100) := '${V_PRODUCT}';
                    V_HOLDING_TIME NUMBER := ${V_HOLDING_TIME};
                    V_LOT_NO VARCHAR2(100) := '${V_LOT_NO}';
                    V_PLANT_CODE VARCHAR2(100) := 'THA';
                    P_ERROR VARCHAR2(100);
                    P_STATE VARCHAR2(100);

                BEGIN
                    FPC.TRC_COMMON_TRACEABILITY.SET_SMT_PROC_FLOW_DISPENSER_CB(
                        P_SHEET_NO,
                        P_CB_NO,
                        P_USER,
                        P_STATION,
                        V_PRODUCT,
                        V_HOLDING_TIME,
                        V_LOT_NO,
                        V_PLANT_CODE,
                        P_ERROR,
                        P_STATE
                    );
                    
                    DBMS_OUTPUT.PUT_LINE('P_ERROR: ' || P_ERROR);
                END       ;              
      `;
      const result = await connect.execute(queryFPC);
      if (result.rows == "") {
        res.status(200).json({ p_error: "" });
      } else {
        console.log(result)
        res.status(409).json({ p_error: result.rows });
      }
    } catch (error) {
      console.log("last strp error");
      console.log(error)
      res.status(500).json({ message: error.message });
    }
  } catch (error) {
    console.error("ข้อผิดพลาดในการค้นหาข้อมูล:", error.message);
    // writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};


module.exports.GetDispenserRecordTimeData = async function (req, res) {
  let query = "";
  try {
    const Conn = await ConnectOracleDB("FPC");
    let strSheetNo  = req.query.strSheetNo;
    query += `SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_GetDispenserRcTime('${strSheetNo}') AS x FROM dual`;
    const result = await Conn.execute(query);
    if (result.rows.length > 0) {    
      res.status(200).json({ROW_COUNT:result.rows[0]?.[0]?.[0]?.[0] || ''});
      DisconnectOracleDB(Conn);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports.DeleteDispenserRecordTimeData = async function (req, res) {
  let query = "";
  try {
    const Conn = await ConnectOracleDB("PCTTTEST");
    let {strSheetNo}  = req.body;
    query += `DELETE
                FROM FPCF_PROC_FLOW_HOLDTIME_DET S
                WHERE S.FPHD_FLOW_ID = '0012'
                AND S.FPHD_CONTROL_NO = '${strSheetNo}'
                AND S.FPHD_END_DATE IS NULL
             `;
    const result = await Conn.execute(query);
    if (result.rows.length > 0) {    
      res.status(200).json({ROW_COUNT:result.rows[0]?.[0]?.[0]?.[0] || ''});
      DisconnectOracleDB(Conn);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
