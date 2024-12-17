const {
  ConnectPG_DB,
  DisconnectPG_DB,
  ConnectOracleDB,
  DisconnectOracleDB,
} = require("../Conncetion/DBConn.cjs");
const { writeLogError } = require("../Common/LogFuction.cjs");
const oracledb = require("oracledb");
const { Client } = require("pg");
const { response } = require("express");
const Fac = process.env.FacA1;
module.exports.GetDispenserRecordTimeData = async function (req, res) {
  let query = "";
  try {
    let Client = await ConnectPG_DB();
    let strSheetNo = req.query.strSheetNo;
    query += ` SELECT coalesce (COUNT(*),0) AS ROW_COUNT 
         FROM "Traceability".TRC_PROC_FLOW_HOLDTIME_DET S 
         WHERE S.FPHD_FLOW_ID = '0012' 
               AND S.FPHD_CONTROL_NO = '${strSheetNo}' 
               AND S.FPHD_END_DATE IS NULL `
    const result = await Client.query(query);
    if (result.rows.length > 0) {
      res.status(200).json({ row_count: result.rows[0].row_count });
      DisconnectPG_DB(Client);
    } else {
      res.status(204).json({ message: "Data Not Found" });
      DisconnectPG_DB(Client);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports.DeleteDispenserRecordTimeData = async function (req, res) {
  let query = "";
  let { strSheetNo } = req.body;
  console.log(strSheetNo);
  try {
    let Client = await ConnectPG_DB();
    query += `DELETE FROM "Traceability".TRC_PROC_FLOW_HOLDTIME_DET D WHERE D.FPHD_FLOW_ID ='0012' and D.FPHD_CONTROL_NO = '${strSheetNo}' and D.FPHD_END_DATE is null`;
    const result = await Client.query(query);
    if (result.rowCount > 0) {
      res.status(200).json({ message: "Delete Success" });
      DisconnectPG_DB(Client);
    } else {
      res.status(204).json({ message: "Delete Fail" });
      DisconnectPG_DB(Client);
    }
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });    
  }
};
module.exports.CallSMTDispenserRecordTimeResult = async function (req, res) {
  let { p_sheet_no, p_cb_no, p_user, p_station } = req.body;
  let V_APP_ID = "1";
  let V_FLOW_ID = "0012";
  let V_PROC_NAME = " ";
  let V_PROC_COUNT = 0;
  let V_LOT_COUNT = 0;
  let V_LOT_ROW = 0;
  let V_CONTROL_MAX = 0;
  let V_CONTROL_COUNT = 0;
  let V_CONTROL_ROW = 0;
  let V_PROC_ID;
  let V_FACTORY_CODE;
  let V_CONTROL_TIME;
  let V_HOLDING_TIME;
  let V_PAUSE_TIME;
  let V_PLANT_CODE = Fac;
  let V_LOT_NO;
  let V_PRODUCT;
  let V_RESULT;
  // out patameter
  let P_ERROR = "";
  V_PROC_ID = " ";
  V_FACTORY_CODE = " ";
  V_CONTROL_TIME = 0;
  V_HOLDING_TIME = 0;
  V_LOT_NO = " ";
  V_PRODUCT = " ";
  V_RESULT = "P";
  V_PAUSE_TIME = 0;
  console.log(p_sheet_no, p_cb_no, p_user, p_station);
  // first query postgres
  let query = `
                  SELECT coalesce (MAX(M.MOT_LOT_NO),'') as lot_no
                        , coalesce(MAX(M.MOT_PRODUCT_NAME),'')  as product  
                  from (
                        SELECT MT.MOT_LOT_NO
                                            , MT.MOT_PRODUCT_NAME
                                            from "Traceability".trc_MOT_RECORD_TIME MT
                                    WHERE MT.MOT_PLANT_CODE = '${V_PLANT_CODE}'
                                          AND MT.MOT_SHEET_NO = '${p_sheet_no}'
                        union              
                        SELECT MT.ART_LOT_NO AS MOT_LOT_NO
                                            , NULL AS MOT_PRODUCT_NAME
                                          from "Traceability".TRC_AOI_RECORD_TIME MT
                                    WHERE MT.ART_PLANT_CODE = '${V_PLANT_CODE}'
                                          AND MT.ART_SHEET_NO = '${p_sheet_no}'
                                    ) M                   
                   `;
  let result1 = await executeQueryPostgres(query);
  if (result1.lot_no != "" && result1.product != "") {
    V_LOT_NO = result1.lot_no;
    V_PRODUCT = result1.product;
  } else {
    let result = await executeOracleQuery(
      `SELECT L.LOT_PRD_NAME AS MOT_PRODUCT_NAME FROM FPC_LOT L WHERE L.LOT ='${result1.lot_no}'`
    );
    if (result.length > 0) {
      V_PRODUCT = result[0][0];
    }
    V_LOT_NO = result1.lot_no;
  }
  // second condition
  if (V_LOT_NO != "") {
    let query = `SELECT NVL(MAX(R.RO_PROC_ID),'')
             as V_PROC_ID
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
                   AND R.RO_SEQ = P.RO_SEQ `;
    let result = await executeOracleQuery(query);
    if (result.length > 0) {
      V_PROC_ID = result[0][0];
    }
    if (V_PROC_ID == "") {
      let query = `
                SELECT NVL(MAX(R.RO_PROC_ID),' ')
                  as V_PROC_ID
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
                                AND L.LOT = '${V_LOT_NO}
                                GROUP BY L.LOT_ITEM_CODE
                                  , L.LOT_RO_REV
                          ) P
                        , FPC.FPC_ROUTING R
                  WHERE R.RO_ITEM_CODE = P.LOT_ITEM_CODE
                        AND R.RO_REV = P.LOT_RO_REV
                        AND R.RO_SEQ = P.RO_SEQ `;
      let result = await executeOracleQuery(query);
      if (result.length > 0) {
        V_PROC_ID = result[0][0];
      }
    }
    let queryFPC1 = `SELECT NVL(COUNT(*),0) as V_PROC_COUNT
                           , NVL(MAX(to_number(FP.FPFP_START_SCAN_CODE)),0) as V_CONTROL_TIME
                              FROM FPCF_PROC_FLOW_PROCESS FP
                              WHERE FP.FPFP_FLOW_ID = '${V_FLOW_ID}'
                                    AND FP.FPFP_PROC_ID = '${V_PROC_ID}'`;
    let queryFPC2 = `SELECT PR.PROC_DISP as V_PROC_NAME
                          , PR.FACTORY_CODE as V_FACTORY_CODE
                              FROM FPC_PROCESS PR WHERE PR.PROC_ID = '${V_PROC_ID}'`;
    let resultFPC1 = await executeOracleQuery(queryFPC1);
    let resultFPC2 = await executeOracleQuery(queryFPC2);
    if (resultFPC1.length > 0) {
      V_PROC_COUNT = resultFPC1[0][0];
      V_CONTROL_TIME = resultFPC1[0][1];
    }
    if (resultFPC2.length > 0) {
      V_PROC_NAME = resultFPC2[0][0];
      V_FACTORY_CODE = resultFPC2[0][1];
    }
    let queryTRC1 = `SELECT coalesce (COUNT(*),0) as V_LOT_COUNT
                    , coalesce(MAX(H.FPHH_CONTROL_QTY),0) as V_LOT_ROW

                    FROM "Traceability".TRC_PROC_FLOW_HOLDTIME_HEAD H
                    WHERE H.FPHH_FLOW_ID = '${V_FLOW_ID}'
                          AND H.FPHH_PROC_ID = '${V_PROC_ID}'
                          AND H.FPHH_LOT_NO = '${V_LOT_NO}' `;
    let resultTRC1 = await executeQueryPostgres(queryTRC1);
    V_LOT_COUNT = parseInt(resultTRC1.v_lot_count);
    V_LOT_ROW = parseInt(resultTRC1.v_lot_row);
    let queryTRC2 = ` SELECT coalesce(MAX(D.FPHD_CONTROL_SEQ),0)
                      as V_CONTROL_MAX
                      FROM "Traceability".TRC_PROC_FLOW_HOLDTIME_DET D
                      WHERE D.FPHD_FLOW_ID = '${V_FLOW_ID}'
                            AND D.FPHD_PROC_ID = '${V_PROC_ID}'
                            AND D.FPHD_LOT_NO = '${V_LOT_NO}'
                            AND D.FPHD_CONTROL_NO = '${p_sheet_no}'`;
    let resultTRC2 = await executeQueryPostgres(queryTRC2);
    V_CONTROL_MAX = parseInt(resultTRC2.v_control_max);
    V_CONTROL_MAX += 1;
    let queryFPC3 = `SELECT NVL((SELECT ROUND(SUM((P.SCAN_START - P.SCAN_PAUSE))*24*60,5) AS PAUSE_TIME_BEFORE_PLASMA
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
                              ),0) AS PAUSE_TIME
              FROM DUAL `;
    let resultFPC3 = await executeOracleQuery(queryFPC3);
    if (resultFPC3.length > 0) {
      V_PAUSE_TIME = resultFPC3[0][0];
    }
    if (V_PROC_COUNT > 0) {
      let queryTRC4 = ` SELECT COALESCE(
            (SELECT ROUND(EXTRACT(EPOCH FROM (NOW() - R.ret_inspect_date)) / 60, 2)
             FROM "Traceability".trc_reflow_record_time R
             WHERE R.ret_plant_code = '${V_PLANT_CODE}'
               AND R.ret_sheet_no = '${p_sheet_no}'
            ),
            COALESCE(
                (SELECT ROUND(EXTRACT(EPOCH FROM (NOW() - a.ART_INSPECT_DATE)) / 60, 2)
                 FROM "Traceability".trc_aoi_record_time A
                 WHERE A.art_plant_code = '${V_PLANT_CODE}'
                   AND A.art_sheet_no = '${p_sheet_no}'
                ),
                0
            )
        ) AS holding_time`;
      let resultTRC4 = await executeQueryPostgres(queryTRC4);
      V_HOLDING_TIME = parseInt(resultTRC4.holding_time);
      if (V_HOLDING_TIME > 0 &&V_HOLDING_TIME - V_PAUSE_TIME > V_CONTROL_TIME) {
        P_ERROR ="REFLOW-DISPENSER HOLDING TIME OVER " + V_CONTROL_TIME / 60 + " HRS.";
        V_RESULT = "F";
      } else if (V_HOLDING_TIME == 0) {
        P_ERROR = "REFLOW NOT RECORD TIME.";
        V_RESULT = "F";
      }
    }
    if(V_LOT_COUNT > 0){
      let queryTRC5 = ` SELECT coalesce (COUNT(*),0) as V_CONTROL_COUNT
                       , coalesce(MIN(D.FPHD_RESULT_CODE),'P') as V_RESULT

                FROM "Traceability".TRC_PROC_FLOW_HOLDTIME_DET D
                WHERE D.FPHD_FLOW_ID = '${V_FLOW_ID}'
                      AND D.FPHD_PROC_ID = '${V_PROC_ID}'
                      AND D.FPHD_LOT_NO = '${V_LOT_NO}'`;
      let resultTRC5 = await executeQueryPostgres(queryTRC5);
      V_CONTROL_COUNT = parseInt(resultTRC5.v_control_count);
      V_RESULT = resultTRC5.v_result;
      let queryTRC6 = `SELECT coalesce(COUNT(*),0)
                as V_CONTROL_ROW
                FROM "Traceability".TRC_PROC_FLOW_HOLDTIME_DET D
                WHERE D.FPHD_FLOW_ID = '${V_FLOW_ID}'
                      AND D.FPHD_PROC_ID = '${V_PROC_ID}'
                      AND D.FPHD_LOT_NO = '${V_LOT_NO}'
                      AND D.FPHD_CONTROL_NO = '${p_sheet_no}'`;
      let resultTRC6 = await executeQueryPostgres(queryTRC6);
      V_CONTROL_ROW = parseInt(resultTRC6.v_control_row);

      let queryTRCUpdate = `UPDATE "Traceability".trc_proc_flow_holdtime_head 
                            SET
                                fphh_input_qty = CASE WHEN ${V_CONTROL_ROW} = 0 THEN ${V_CONTROL_COUNT} + 1 ELSE ${V_CONTROL_COUNT} END,
                                fphh_std_qty = CASE WHEN ${V_CONTROL_ROW} = 0 THEN ${V_CONTROL_COUNT} + 1 ELSE ${V_CONTROL_COUNT} END,
                                fphh_control_qty = CASE WHEN ${V_CONTROL_ROW} = 0 THEN ${V_CONTROL_COUNT} + 1 ELSE ${V_CONTROL_COUNT} END,
                                fphh_result_code = '${V_RESULT}',
                                fphh_remark = '',
                                fphh_update_by = '${p_user}',
                                fphh_update_date = NOW(),
                                fphh_update_station = '${p_station}'
                            WHERE
                                fphh_flow_id = '${V_FLOW_ID}'
                                AND fphh_proc_id = '${V_PROC_ID}'
                                AND fphh_lot_no = '${V_LOT_NO}' `;     
      let resultUpdate =  await insertIntoPostgres(queryTRCUpdate)  
      if(V_CONTROL_ROW > 0){
        let queryTRCUpdate2 = `UPDATE "Traceability".trc_proc_flow_holdtime_det 
                                SET
                                    fphd_start_by = '${p_user}',
                                    fphd_start_date = NOW(),
                                    fphd_start_station = '${p_station}',
                                    fphd_end_by = NULL,
                                    fphd_end_date = NULL,
                                   fphd_end_station = NULL,
                                    fphd_std_time = NULL,
                                    fphd_total_time = NULL,
                                    fphd_result_code = CASE WHEN TRIM('${P_ERROR}') = '' THEN 'P' ELSE 'F' END,
                                    fphd_remark = TRIM('${P_ERROR}'),
                                    fphd_cb_no = TRIM('${p_cb_no}')
                                WHERE
                                    fphd_flow_id = '${V_FLOW_ID}'
                                    AND fphd_proc_id = '${V_PROC_ID}'
                                    AND fphd_lot_no = '${V_LOT_NO}'
                                    AND fphd_control_no = '${p_sheet_no}'`;
        let resultUpdate2 =  await insertIntoPostgres(queryTRCUpdate2)
      }else{
        let queryTRCInsert = `INSERT INTO "Traceability".trc_PROC_FLOW_HOLDTIME_DET 
                           (
                            FPHD_FLOW_ID
                            , FPHD_PROC_ID
                            , FPHD_LOT_NO
                            , FPHD_CONTROL_NO
                            , FPHD_CONTROL_SEQ
                            , FPHD_START_BY
                            , FPHD_START_DATE
                            , FPHD_START_STATION
                            , FPHD_END_BY
                            , FPHD_END_DATE
                            , FPHD_END_STATION
                            , FPHD_STD_TIME
                            , FPHD_TOTAL_TIME
                            , FPHD_RESULT_CODE
                            , FPHD_REMARK
                            , FPHD_CB_NO
                            )
                         VALUES
                            (
                              '${V_FLOW_ID}'
                               , '${V_PROC_ID}'
                               , '${V_LOT_NO}'
                               , '${p_sheet_no}'
                               , ${V_CONTROL_MAX}
                               , '${p_user}'
                               , NOW()
                               , '${p_station}'
                               , NULL
                               , NULL
                               , NULL
                               , NULL
                               , NULL
                               , CASE WHEN TRIM('${P_ERROR}') = '' THEN 'P' ELSE 'F' END
                               , TRIM('${P_ERROR}')
                               , TRIM('${p_cb_no}')
                            )`;
        let resultInsert =  await insertIntoPostgres(queryTRCInsert)
      } 
      let queryFPCDElete = `DELETE
                      FROM FPCF_PROC_FLOW_LOT FL
                      WHERE FL.FPFL_FLOW_ID = :V_FLOW_ID1
                            AND FL.FPFL_PROC_ID = :V_PROC_ID1
                            AND FL.FPFL_LOT_NO = :V_LOT_NO1`;  
      let params = {V_FLOW_ID1:V_FLOW_ID,V_PROC_ID1:V_PROC_ID,V_LOT_NO1:V_LOT_NO}
      let resultFPCDelete = await deleteFromOracle(queryFPCDElete,params)
    }else{
      let queryTRCInsert = ` INSERT INTO "Traceability".TRC_PROC_FLOW_HOLDTIME_HEAD 
                           (
                             FPHH_FLOW_ID
                             , FPHH_PROC_ID
                             , FPHH_LOT_NO
                             , FPHH_INPUT_QTY
                             , FPHH_STD_QTY
                             , FPHH_CONTROL_QTY
                             , FPHH_RESULT_CODE
                             , FPHH_REMARK
                             , FPHH_CREATE_BY
                             , FPHH_CREATE_DATE
                             , FPHH_CREATE_STATION
                             , FPHH_UPDATE_BY
                             , FPHH_UPDATE_DATE
                             , FPHH_UPDATE_STATION
                             )
                         VALUES
                             (
                                '${V_FLOW_ID}'
                               , '${V_PROC_ID}'
                               , '${V_LOT_NO}'
                               , 1
                               , 1
                               , 1
                               , '${V_RESULT}'
                               , ''
                               , '${p_user}'
                               , NOW()
                               , '${p_station}'
                               , '${p_user}'
                               , NOW()
                               , '${p_station}'
                             )`;
      let resultInsert =  await insertIntoPostgres(queryTRCInsert)

      let queryTRCInsert2 = ` INSERT INTO "Traceability".TRC_PROC_FLOW_HOLDTIME_DET 
                           (
                            FPHD_FLOW_ID
                            , FPHD_PROC_ID
                            , FPHD_LOT_NO
                            , FPHD_CONTROL_NO
                            , FPHD_CONTROL_SEQ
                            , FPHD_START_BY
                            , FPHD_START_DATE
                            , FPHD_START_STATION
                            , FPHD_END_BY
                            , FPHD_END_DATE
                            , FPHD_END_STATION
                            , FPHD_STD_TIME
                            , FPHD_TOTAL_TIME
                            , FPHD_RESULT_CODE
                            , FPHD_REMARK
                            , FPHD_CB_NO
                            )
                         VALUES
                            (
                              '${V_FLOW_ID}'
                            , '${V_PROC_ID}'
                            , '${V_LOT_NO}'
                            , '${p_sheet_no}'
                            , ${V_CONTROL_MAX}
                            , '${p_user}'
                            , NOW()
                            , '${p_station}'
                            , NULL
                            , NULL
                            , NULL
                            , NULL
                            , NULL
                            , CASE WHEN TRIM('${P_ERROR}') = '' THEN 'P' ELSE 'F' END
                            , TRIM('${P_ERROR}')
                            , TRIM('${p_cb_no}')
                          )`;
      let resultInsert2 =  await insertIntoPostgres(queryTRCInsert2)
    }    
  } else {
    P_ERROR = "MOT NOT RECORD TIME";    
  }
  res.status(200).json({ P_ERROR });
}; 

async function executeQueryPostgres(query) {
  let client;
  let resultresponse;
  try {
    client = await ConnectPG_DB();
    const result = await client.query(query);
    resultresponse = result.rows[0];
    await DisconnectPG_DB(client);
  } catch (error) {
    console.error("An error occurred:", error);
    writeLogError(error);
    await DisconnectPG_DB(client);
  }
  return resultresponse;
}
async function insertIntoPostgres(query) {
  let client;
  try {
    client = await ConnectPG_DB();
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    return result;
  } catch (error) {
    console.error("An error occurred:", error);
    writeLogError(error);
    await DisconnectPG_DB(client);
  }
}

async function executeOracleQuery(query) {
  let connection;
  let resultresponse;
  try {
    connection = await ConnectOracleDB("PCTTTEST");
    const result = await connection.execute(query);
    resultresponse = result.rows;
    await connection.close();
  } catch (error) {
    console.error("An error occurred:", error);
    writeLogError(error);
    await connection.close();
  }
  return resultresponse;
}
async function deleteFromOracle(query, params) {
  let connection;
  try {
    connection = await ConnectOracleDB("PCTTTEST");
    const result = await connection.execute(query, params, { autoCommit: true });
    await connection.close();
    return result;
  } catch (error) {
    console.error("An error occurred:", error);
    writeLogError(error);
    await connection.close();
  }
}


