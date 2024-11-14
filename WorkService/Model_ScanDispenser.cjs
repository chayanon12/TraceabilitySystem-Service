const {
  ConnectPG_DB,
  DisconnectPG_DB,
  ConnectOracleDB,
  DisconnectOracleDB,
} = require("../Conncetion/DBConn.cjs");
const { writeLogError } = require("../Common/LogFuction.cjs");
const oracledb = require("oracledb");

module.exports.GetDispenserRecordTimeData = async function (req, res) {
  let query = "";
  try {
    const Conn = await ConnectOracleDB("PCTTTEST");
    let strSheetNo = req.query.strSheetNo;
    console.log(strSheetNo);
    query += `SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_GetDispenserRcTime('${strSheetNo}') AS x FROM dual`;
    const result = await Conn.execute(query);
    if (result.rows.length > 0) {
      res.status(200).json({ ROW_COUNT: result.rows[0][0][0][0]});
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
    let { strSheetNo } = req.body;
    query += `DELETE
                FROM FPCF_PROC_FLOW_HOLDTIME_DET S
                WHERE S.FPHD_FLOW_ID = :V_FLOW_ID
                AND S.FPHD_CONTROL_NO = :strSheetNo
                AND S.FPHD_END_DATE IS NULL
             `;
    let params = {
      V_FLOW_ID: "0012",
      strSheetNo,
    };
    const result = await Conn.execute(query, params, { autoCommit: true });
    if (result.rowsAffected > 0) {
      res.status(200).json({ message: "Record deleted successfully" });
    } else {
      res.status(404).json({ message: "Record not found" });
    }
    DisconnectOracleDB(Conn);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports.SET_SMT_PROC_FLOW_DISPENSER_CB = async function (req, res) {
  let queryFPC = "";
  let queryPG = "";
  let Fac = process.env.FacA1;
  let { strSheetNo, strUser, strStation, strCBno } = req.body;
  let lot_no = "";
  let product_name = "";
  let dtData;
  let P_ERROR = "";
  let holdingTime;
  let V_RESULT;
  try {
    const client = await ConnectPG_DB();
    queryPG += `SELECT MT.ART_LOT_NO AS MOT_LOT_NO
                  FROM "Traceability".TRC_AOI_RECORD_TIME  MT
                  WHERE MT.ART_PLANT_CODE = '${Fac}'
                   AND MT.ART_SHEET_NO = '${strSheetNo}'`;
    const result = await client.query(queryPG);
    if (result.rows.length > 0) {
      lot_no = result.rows[0].mot_lot_no;
    }
    await DisconnectPG_DB(client);
  } catch (error) {
    await DisconnectPG_DB(client);
    writeLogError(error.message, queryPG);
    res.status(500).json({ message: error.message });
  }
  if (lot_no != "") {
    try {
      queryFPC += `SELECT L.LOT_PRD_NAME AS MOT_PRODUCT_NAME FROM FPC_LOT L WHERE L.LOT = '${lot_no}' `;
      const client = await ConnectOracleDB("PCTTTEST");
      const result = await client.execute(queryFPC);
      if (result.rows.length > 0) {
        product_name = result.rows[0][0];
      }
      await DisconnectOracleDB(client);
    } catch (error) {
      writeLogError(error.message, queryFPC);
      res.status(500).json({ message: error.message });
    }
  }
  if (lot_no != "" && product_name != "") {
    try {
      const client = await ConnectOracleDB("PCTTTEST");
      const result = await client.execute(
        `BEGIN 
         FPC.TRC_COMMON_TRACEABILITY.GET_DATA_DISPENSER_CB(
           :P_LOT_NO,
           :P_SHEET_NO,
           :P_PROC_ID,
           :P_PROC_COUNT,
           :P_CONTROL_TIME,
           :P_PROC_NAME,
           :P_FACTORY_CODE,
           :P_LOT_COUNT,
           :P_LOT_ROW,
           :P_CONTROL_MAX,
           :P_PAUSE_TIME,
           :P_ERROR
         ); 
       END;`,
        {
          P_LOT_NO: lot_no.toString(),
          P_SHEET_NO: strSheetNo.toString(),
          P_PROC_ID: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
          P_PROC_COUNT: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
          P_CONTROL_TIME: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
          P_PROC_NAME: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
          P_FACTORY_CODE: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
          P_LOT_COUNT: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
          P_LOT_ROW: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
          P_CONTROL_MAX: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
          P_PAUSE_TIME: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
          P_ERROR: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
        }
      );

      dtData = result.outBinds;
      if (dtData.P_PROC_COUNT > 0) {
        queryPG = "";
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
      }
      const resultPG = await client.query(queryPG);
      if (resultPG.rows.length > 0) {
        holdingTime = parseFloat(resultPG.rows[0].holding_time);
      }
      if (
        holdingTime > 0 &&
        parseInt(dtData.P_HOLDING_TIME) - parseInt(dtData.P_PAUSE_TIME) >
          dtData.P_CONTROL_TIME
      ) {
        P_ERROR =
          "REFLOW-DISPENSER HOLDING TIME OVER " + V_CONTROL_TIME + " HRS.";
        V_RESULT = "F";
      }
      if (dtData.V_LOT_COUNT > 0) {
        P_ERROR = "ALREADY INSERTED";
        V_RESULT = "F";
      }
      // res.status(200).json(dtData);
      await DisconnectOracleDB(client);
    } catch (error) {
      writeLogError(error.message, queryFPC);
      res.status(500).json({ message: error.message });
    }
  }
};
 
module.exports.setDispencerQuery = async function (req, res) {
  const { P_SHEET_NO, P_CB_NO, P_USER, P_STATION } = req.body;
  console.log(P_SHEET_NO, P_CB_NO, P_USER, P_STATION,'P_SHEET_NO, P_CB_NO, P_USER, P_STATION');
  let V_APP_ID = "1";
  let V_FLOW_ID = "0012";
  let V_PROC_NAME = "";
  let V_PROC_COUNT = 0;
  let V_LOT_COUNT = 0;
  let V_LOT_ROW = 0;
  let V_CONTROL_MAX = 0;
  let V_CONTROL_COUNT = 0;
  let V_CONTROL_ROW = 0;
  let V_PROC_ID = "";
  let V_FACTORY_CODE = "";
  let V_CONTROL_TIME = 0;
  let V_HOLDING_TIME = 0;
  let V_PAUSE_TIME = 0;
  let V_PLANT_CODE = process.env.FacA1;
  let V_LOT_NO = "";
  let V_PRODUCT = "";
  let V_RESULT = "";
  let P_ERROR = "";
  //Parameter for Using
  let queryPG = "";
  let queryFPC = "";
  //FirstQuery
  queryPG = `
              SELECT coalesce (MAX(M.MOT_LOT_NO),' ') as V_LOT_NO
                          , coalesce(MAX(M.MOT_PRODUCT_NAME),' ') as V_PRODUCT
                  FROM (
                        SELECT MT.MOT_LOT_NO
                                , MT.MOT_PRODUCT_NAME
                        FROM "Traceability".TRC_MOT_RECORD_TIME MT
                        WHERE MT.MOT_PLANT_CODE = '${V_PLANT_CODE}'
                              AND MT.MOT_SHEET_NO = '${P_SHEET_NO}'   
                          ) M ;
               `;

  const result = await executeQuery(queryPG);
  queryPG = "";
  if (result != []) {
    V_LOT_NO = result.v_lot_no;
    V_PRODUCT = result.v_product;
  }
  //SecondQuery
  if (V_LOT_NO != "") {
    queryFPC = `
                SELECT NVL(MAX(R.RO_PROC_ID),' ') AS  V_PROC_ID
             FROM ( 
                     SELECT L.LOT_ITEM_CODE
                            , L.LOT_RO_REV
                            , MIN(R2.RO_SEQ) AS RO_SEQ
                     FROM FPC.FPC_LOT L
                          , FPC.FPC_ROUTING R1
                          , FPC.FPC_ROUTING R2
                          , FPC.FPCF_PROC_FLOW_PROCESS P
                     WHERE L.LOT_ITEM_CODE = R1.RO_ITEM_CODE
                           AND L.LOT_RO_REV = R1.RO_REV
                           AND L.PROC_ID = R1.RO_PROC_ID
                           AND R1.RO_ITEM_CODE = R2.RO_ITEM_CODE  
                           AND R1.RO_REV =  R2.RO_REV
                           AND R1.RO_SEQ <= R2.RO_SEQ
                           AND R2.RO_PROC_ID = P.FPFP_PROC_ID
                           AND P.FPFP_FLOW_ID = '${V_FLOW_ID}'
                           AND L.LOT = '${V_LOT_NO}'
                     GROUP BY L.LOT_ITEM_CODE
                            , L.LOT_RO_REV
                    ) P
                   , FPC.FPC_ROUTING R  
             WHERE R.RO_ITEM_CODE = P.LOT_ITEM_CODE  
                   AND R.RO_REV = P.LOT_RO_REV
                   AND R.RO_SEQ = P.RO_SEQ 
              `;
    const result2 = await executeOracleQuery(queryFPC);
    queryFPC = "";
    V_PROC_ID = result2[0];
    if (V_PROC_ID == "") {
      queryFPC = `
        SELECT NVL(MAX(R.RO_PROC_ID),' ')
                 INTO V_PROC_ID
                 FROM ( 
                         SELECT L.LOT_ITEM_CODE
                                , L.LOT_RO_REV
                                , MIN(R2.RO_SEQ) AS RO_SEQ
                         FROM FPC.FPC_LOT L
                              , FPC.FPC_ROUTING R1
                              , FPC.FPC_ROUTING R2
                              , FPC.FPCF_PROC_FLOW_PROCESS P
                         WHERE L.LOT_ITEM_CODE = R1.RO_ITEM_CODE
                               AND L.LOT_RO_REV = R1.RO_REV
                               AND L.PROC_ID = R1.RO_PROC_ID
                               AND R1.RO_ITEM_CODE = R2.RO_ITEM_CODE  
                               AND R1.RO_REV =  R2.RO_REV
                               AND R1.RO_SEQ > R2.RO_SEQ
                               AND R2.RO_PROC_ID = P.FPFP_PROC_ID
                               AND P.FPFP_FLOW_ID = '${V_FLOW_ID}'
                               AND L.LOT = '${V_LOT_NO}'
                         GROUP BY L.LOT_ITEM_CODE
                                , L.LOT_RO_REV
                        ) P
                       , FPC.FPC_ROUTING R  
                 WHERE R.RO_ITEM_CODE = P.LOT_ITEM_CODE  
                       AND R.RO_REV = P.LOT_RO_REV
                       AND R.RO_SEQ = P.RO_SEQ ;
              `;
      const result3 = await executeOracleQuery(queryFPC);
      queryFPC = "";
      V_PROC_ID = result3[0];
    }
    queryFPC = ` 
                SELECT A.V_PROC_COUNT, A.V_CONTROL_TIME, B.V_PROC_NAME,B.V_FACTORY_CODE,C.V_LOT_COUNT,C.V_LOT_ROW,D.V_CONTROL_MAX,E.V_PAUSE_TIME
                      FROM (
                        SELECT NVL(COUNT(*), 0) AS V_PROC_COUNT,
                              NVL(MAX(to_number(FP.FPFP_START_SCAN_CODE)), 0) AS V_CONTROL_TIME
                        FROM FPCF_PROC_FLOW_PROCESS FP
                        WHERE FP.FPFP_FLOW_ID = '${V_FLOW_ID}'
                          AND FP.FPFP_PROC_ID = '${V_PROC_ID}'
                      ) A
                      JOIN (
                        SELECT PR.PROC_DISP AS V_PROC_NAME,
                              PR.FACTORY_CODE AS V_FACTORY_CODE
                        FROM FPC_PROCESS PR
                        WHERE PR.PROC_ID = '${V_PROC_ID}'
                      ) B ON 1=1
                      JOIN (
                        SELECT NVL(COUNT(*),0) AS V_LOT_COUNT
                                          , NVL(MAX(H.FPHH_CONTROL_QTY),0 ) AS V_LOT_ROW
                                  FROM FPCF_PROC_FLOW_HOLDTIME_HEAD H
                                  WHERE H.FPHH_FLOW_ID = '${V_FLOW_ID}'
                                        AND H.FPHH_PROC_ID = '${V_PROC_ID}'
                                        AND H.FPHH_LOT_NO = '${V_LOT_NO}' 
                      ) C ON 1=1
                      JOIN (
                        SELECT NVL(MAX(D.FPHD_CONTROL_SEQ),0) AS V_CONTROL_MAX
                                  FROM FPCF_PROC_FLOW_HOLDTIME_DET D
                                  WHERE D.FPHD_FLOW_ID = '${V_FLOW_ID}'
                                        AND D.FPHD_PROC_ID = '${V_PROC_ID}'
                                        AND D.FPHD_LOT_NO = '${V_LOT_NO}' 
                                        AND D.FPHD_CONTROL_NO = '${P_SHEET_NO}' 
                      )D ON 1=1
                      JOIN(
                            SELECT NVL((SELECT ROUND(SUM((P.SCAN_START - P.SCAN_PAUSE))*24,5) AS PAUSE_TIME_BEFORE_PLASMA
                                                  FROM FPCW_SMT_HOLDING_PAUSE P
                                                      , FPC_LOT L
                                                      , FPC_ROUTING R
                                                  WHERE P.LOT = L.LOT
                                                        AND P.PROCESS = R.RO_PROC_ID
                                                        AND L.LOT_ITEM_CODE = R.RO_ITEM_CODE
                                                        AND L.LOT_RO_REV = R.RO_REV
                                                        AND R.RO_SEQ >= (SELECT MIN(R1.RO_SEQ) FROM FPC_ROUTING R1, FPC_PROCESS P1  WHERE R1.RO_ITEM_CODE = L.LOT_ITEM_CODE AND R1.RO_REV= L.LOT_RO_REV AND R1.RO_PROC_ID =P1.PROC_ID AND P1.PROC_DISP LIKE 'ZAOI%')
                                                        AND R.RO_SEQ <= (SELECT MAX(R1.RO_SEQ) FROM FPC_ROUTING R1, FPC_PROCESS P1  WHERE R1.RO_ITEM_CODE = L.LOT_ITEM_CODE AND R1.RO_REV= L.LOT_RO_REV AND R1.RO_PROC_ID =P1.PROC_ID AND P1.PROC_ID = '${V_PROC_ID}')
                                                        AND P.LOT = '${V_LOT_NO}'
                                                    ),0) AS V_PAUSE_TIME
                                    FROM DUAL  
                      )E  ON 1=1
                `;
    const result4 = await executeOracleQuery(queryFPC);
    if (result4 && result4.length > 0) {
      V_PROC_COUNT = result4[0];
      V_CONTROL_TIME = result4[1];
      V_PROC_NAME = result4[2];
      V_FACTORY_CODE = result4[3];
      V_LOT_COUNT = result4[4];
      V_LOT_ROW = result4[5];
      V_CONTROL_MAX = parseInt(result4[6]);
      V_CONTROL_MAX += 1;
      V_PAUSE_TIME = result4[7];
    }
    if (parseInt(V_PROC_COUNT) > 0) {
      queryPG = `
                SELECT COALESCE(
                                  (
                                    SELECT ROUND(EXTRACT(EPOCH FROM (CURRENT_TIMESTAMP - R.RET_INSPECT_DATE)) / 3600, 2)
                                    FROM "Traceability".TRC_REFLOW_RECORD_TIME R
                                    WHERE R.RET_PLANT_CODE = '${V_PLANT_CODE}'
                                      AND R.RET_SHEET_NO = '${P_SHEET_NO}'
                                  ),
                                  COALESCE(
                                    (
                                      SELECT ROUND(EXTRACT(EPOCH FROM (CURRENT_TIMESTAMP - A.ART_INSPECT_DATE)) / 3600, 2)
                                      FROM "Traceability".TRC_AOI_RECORD_TIME A
                                      WHERE A.ART_PLANT_CODE = '${V_PLANT_CODE}'
                                        AND A.ART_SHEET_NO = '${P_SHEET_NO}'
                                    ),
                                    0
                                  )
                                ) AS HOLDING_TIME
                `;
      queryPG = "";
      const result5 = await executeQuery(queryPG);
      if (result5 != null || result5 != undefined) {
        V_HOLDING_TIME = result5.holding_time;
      }
      if (
        parseInt(V_HOLDING_TIME) > 0 &&
        parseInt(V_HOLDING_TIME - V_PAUSE_TIME) > parseInt(V_CONTROL_TIME)
      ) {
        P_ERROR =
          "REFLOW-DISPENSER HOLDING TIME OVER " + V_CONTROL_TIME + " HRS.";
        V_RESULT = "F";
      }
    }
    if (parseInt(V_LOT_COUNT) > 0) {
      queryFPC = ` 
                 SELECT A.V_CONTROL_COUNT,A.V_RESULT,B.V_CONTROL_ROW
                        FROM (
                                SELECT 
                                  NVL(COUNT(*),0) AS V_CONTROL_COUNT 
                                          , NVL(MIN(D.FPHD_RESULT_CODE),'P')AS V_RESULT
                                            FROM FPCF_PROC_FLOW_HOLDTIME_DET D
                                            WHERE D.FPHD_FLOW_ID = '0012'
                                                AND D.FPHD_PROC_ID = '2800'
                                                AND D.FPHD_LOT_NO = '664063256' 
                        )A
                        JOIN 
                        (
                          SELECT NVL(COUNT(*),0)
                                            as V_CONTROL_ROW
                                            FROM FPCF_PROC_FLOW_HOLDTIME_DET D
                                            WHERE D.FPHD_FLOW_ID = '0012'
                                                AND D.FPHD_PROC_ID = '2800'
                                                AND D.FPHD_LOT_NO = '664063256' 
                                                AND D.FPHD_CONTROL_NO = 'A240698117RGP5000999'

                        ) B ON 1=1
                  `;
      const result6 = await executeOracleQuery(queryFPC);
      if (result6 != [] || result6 != null) {
        V_CONTROL_COUNT = result6[0];
        V_RESULT = result6[1];
        V_CONTROL_ROW = result6[2];
      }
      let queryOracleUpdate = `
                                UPDATE FPCF_PROC_FLOW_HOLDTIME_HEAD H SET
                        H.FPHH_INPUT_QTY = DECODE(:V_CONTROL_ROW,0,:V_CONTROL_COUNT+1,:V_CONTROL_COUNT)
                        , H.FPHH_STD_QTY = DECODE(:V_CONTROL_ROW,0,:V_CONTROL_COUNT+1,:V_CONTROL_COUNT)
                        , H.FPHH_CONTROL_QTY = DECODE(:V_CONTROL_ROW,0,:V_CONTROL_COUNT+1,:V_CONTROL_COUNT)
                        , H.FPHH_RESULT_CODE = :V_RESULT
                        , H.FPHH_REMARK = ''
                        , H.FPHH_UPDATE_BY = :P_USER
                        , H.FPHH_UPDATE_DATE = SYSDATE
                        , H.FPHH_UPDATE_STATION = :P_STATION
                    WHERE H.FPHH_FLOW_ID = :V_FLOW_ID
                        AND H.FPHH_PROC_ID = :V_PROC_ID
                        AND H.FPHH_LOT_NO = :V_LOT_NO
                              `;
      let paramsqueryOracleUpdate = {
        V_CONTROL_ROW,
        V_CONTROL_COUNT,
        V_RESULT,
        P_USER,
        P_STATION,
        V_FLOW_ID,
        V_PROC_ID,
        V_LOT_NO,
      };
      let connection;
      try {
        connection = await ConnectOracleDB("PCTTTEST");
        const updateResult = await connection.execute(
          queryOracleUpdate,
          paramsqueryOracleUpdate,
          {
            autoCommit: true,
          }
        );
        console.log(updateResult.rowsAffected);
      } catch (error) {
        connection.rollback();
      } finally {
        connection.close();
      }
      let Inseroracle;
      if (parseInt(V_CONTROL_ROW) > 0) {
        Inseroracle = `
                        UPDATE FPCF_PROC_FLOW_HOLDTIME_DET D SET                    
                                D.FPHD_START_BY = :P_USER
                                , D.FPHD_START_DATE = SYSDATE
                                , D.FPHD_START_STATION = :P_STATION
                                , D.FPHD_END_BY = NULL
                                , D.FPHD_END_DATE = NULL
                                , D.FPHD_END_STATION = NULL
                                , D.FPHD_STD_TIME = NULL
                                , D.FPHD_TOTAL_TIME = NULL
                                , D.FPHD_RESULT_CODE = DECODE(:P_ERROR,' ','P','F')
                                , D.FPHD_REMARK = TRIM(:P_ERROR)
                                , D.FPHD_CB_NO = TRIM(:P_CB_NO)
                        WHERE D.FPHD_FLOW_ID = :V_FLOW_ID
                                AND D.FPHD_PROC_ID = :V_PROC_ID
                                AND D.FPHD_LOT_NO = :V_LOT_NO
                                AND D.FPHD_CONTROL_NO = :P_SHEET_NO
                      `;
        let insertOracleparams = {
          P_USER,
          P_STATION,
          P_ERROR,
          P_CB_NO,
          V_FLOW_ID,
          V_PROC_ID,
          V_LOT_NO,
          P_SHEET_NO,
        };
        const restultUpdate = await executeOracleQueryIn(
          Inseroracle,
          insertOracleparams
        );
      } else {
        Inseroracle = ` 
                          INSERT INTO FPCF_PROC_FLOW_HOLDTIME_DET D     
                            (
                                D.FPHD_FLOW_ID
                                , D.FPHD_PROC_ID
                                , D.FPHD_LOT_NO
                                , D.FPHD_CONTROL_NO
                                , D.FPHD_CONTROL_SEQ
                                , D.FPHD_START_BY
                                , D.FPHD_START_DATE
                                , D.FPHD_START_STATION
                                , D.FPHD_END_BY
                                , D.FPHD_END_DATE
                                , D.FPHD_END_STATION
                                , D.FPHD_STD_TIME
                                , D.FPHD_TOTAL_TIME
                                , D.FPHD_RESULT_CODE
                                , D.FPHD_REMARK 
                                , D.FPHD_CB_NO 
                                )
                            VALUES
                                (
                                :V_FLOW_ID
                                , :V_PROC_ID
                                , :V_LOT_NO
                                , :P_SHEET_NO
                                , :V_CONTROL_MAX
                                , :P_USER
                                , SYSDATE
                                , :P_STATION
                                , NULL
                                , NULL
                                , NULL
                                , NULL
                                , NULL
                                , DECODE(:P_ERROR,' ','P','F')
                                , TRIM(:P_ERROR)
                                , TRIM(:P_CB_NO)
                                )                     
                      `;
        let paramsInsertOracle = {
          V_FLOW_ID,
          V_PROC_ID,
          V_LOT_NO,
          P_SHEET_NO,
          V_CONTROL_MAX,
          P_USER,
          P_STATION,
          P_ERROR,
          P_CB_NO,
        };
        const restultInsert = await executeOracleQueryIn(
          Inseroracle,
          paramsInsertOracle
        );
      }
      //excute insert or update
      //continue delete query
      let queryOracleDelete = `
                                DELETE 
                                  FROM FPCF_PROC_FLOW_LOT FL
                                  WHERE FL.FPFL_FLOW_ID = :V_FLOW_ID
                                        AND FL.FPFL_PROC_ID = :V_PROC_ID
                                        AND FL.FPFL_LOT_NO = :V_LOT_NO      
                              `;
      let paramsqueryOracleDelete = {
        V_FLOW_ID,
        V_PROC_ID,
        V_LOT_NO,
      };
      const restultDelete = await executeOracleQueryIn(
        queryOracleDelete,
        paramsqueryOracleDelete
      );
    } else {
      let Insertoracle1;
      let Insertoracle2;
      Insertoracle1 = `
                        INSERT INTO FPCF_PROC_FLOW_HOLDTIME_HEAD H
                           (
                             H.FPHH_FLOW_ID
                             , H.FPHH_PROC_ID
                             , H.FPHH_LOT_NO
                             , H.FPHH_INPUT_QTY
                             , H.FPHH_STD_QTY
                             , H.FPHH_CONTROL_QTY
                             , H.FPHH_RESULT_CODE
                             , H.FPHH_REMARK
                             , H.FPHH_CREATE_BY
                             , H.FPHH_CREATE_DATE
                             , H.FPHH_CREATE_STATION
                             , H.FPHH_UPDATE_BY
                             , H.FPHH_UPDATE_DATE
                             , H.FPHH_UPDATE_STATION
                             )
                         VALUES
                             ( 
                               :V_FLOW_ID
                               , :V_PROC_ID
                               , :V_LOT_NO
                               , 1
                               , 1
                               , 1
                               , :V_RESULT
                               , ''
                               , :P_USER
                               , SYSDATE
                               , :P_STATION
                               , :P_USER
                               , SYSDATE
                               , :P_STATION               
                             )
                      `;
      let Insertoracle1Params = {
        V_FLOW_ID,
        V_PROC_ID,
        V_LOT_NO,
        V_RESULT,
        P_USER,
        P_STATION,
      };
      Insertoracle2 = `
                        INSERT INTO FPCF_PROC_FLOW_HOLDTIME_DET D     
                           (
                            D.FPHD_FLOW_ID
                            , D.FPHD_PROC_ID
                            , D.FPHD_LOT_NO
                            , D.FPHD_CONTROL_NO
                            , D.FPHD_CONTROL_SEQ
                            , D.FPHD_START_BY
                            , D.FPHD_START_DATE
                            , D.FPHD_START_STATION
                            , D.FPHD_END_BY
                            , D.FPHD_END_DATE
                            , D.FPHD_END_STATION
                            , D.FPHD_STD_TIME
                            , D.FPHD_TOTAL_TIME
                            , D.FPHD_RESULT_CODE
                            , D.FPHD_REMARK  
                            , D.FPHD_CB_NO
                            )
                         VALUES
                            (
                              :V_FLOW_ID
                               , :V_PROC_ID
                               , :V_LOT_NO
                               , :P_SHEET_NO
                               , :V_CONTROL_MAX
                               , :P_USER
                               , SYSDATE
                               , :P_STATION
                               , NULL
                               , NULL
                               , NULL
                               , NULL
                               , NULL
                               , DECODE(:P_ERROR,' ','P','F')
                               , TRIM(:P_ERROR)
                               , TRIM(:P_CB_NO)
                            )
                      `;
      let Insertoracle2Params = {
        V_FLOW_ID,
        V_PROC_ID,
        V_LOT_NO,
        P_SHEET_NO,
        V_CONTROL_MAX,
        P_USER,
        P_STATION,
        P_ERROR,
        P_CB_NO,
      };
      //execute insert
      const result = await executeOracleQueryIn(
        Insertoracle1,
        Insertoracle1Params
      );
      const result2 = await executeOracleQueryIn(
        Insertoracle2,
        Insertoracle2Params
      );
    }
  } else {
    P_ERROR = "MOT NOT RECORD TIME";
  }
  console.log("P_ERROR", P_ERROR);
  res.status(200).json({ P_ERROR });
}; 

async function executeQuery(query) {
  let client;
  try {
    client = await ConnectPG_DB();
    const result = await client.query(query);
    if (result.rows.length > 0) {
      return result.rows[0];
    }
    return null;
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    if (client) {
      await client.end();
    }
  }
}
async function executeOracleQuery(query) {
  let connection;
  try {
    connection = await ConnectOracleDB("PCTTTEST");
    const result = await connection.execute(query);
    console.log(result, "result");
    if (result != []) {
      return result.rows[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing connection:", err);
      }
    }
  }
}
async function executeOracleQueryIn(query, params) {
  let connection;
  try {
    connection = await ConnectOracleDB("PCTTTEST");
    const result = await connection.execute(query, params, {
      autoCommit: true,
    });
    return result.rows;
  } catch (error) {
    console.error("An error occurred:", error);
    // throw error;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing connection:", err);
      }
    }
  }
}
