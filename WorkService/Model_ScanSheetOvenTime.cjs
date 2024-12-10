const {
  ConnectPG_DB,
  DisconnectPG_DB,
  ConnectOracleDB,
  DisconnectOracleDB,
  executeQueryPostgres,
  insertIntoPostgres,
  executeOracleQuery,
  deleteFromOracle,
} = require("../Conncetion/DBConn.cjs");
const { writeLogError } = require("../Common/LogFuction.cjs");
const oracledb = require("oracledb");

module.exports.SET_SMT_PROC_FLOW_OVEN = async function (req, res) {
  let { p_sheet_no, p_user, p_station } = req.body;
  let V_APP_ID = "1";
  let V_FLOW_ID = "0012";
  let V_RESULT = "F";
  let V_STATUS = "50";
  let V_UPDATE = "N";
  let V_PROC_NAME = " ";
  let V_PROC_COUNT = 0;
  let V_LOT_ROW = 0;
  let V_LOT_RESULT = "F";
  let V_CONTROL_COUNT = 0;
  let V_CONTROL_ROW = 0;
  let V_CONTROL_TIME = 0;
  let V_CONTROL_RESULT = "F";
  let V_TOTAL_TIME = 0;
  let V_NG_COUNT = 0;
  // let V_DATE = new Date();
  let V_PLANT_CODE = "5";
  let V_PROC_ID;
  let V_LOT_NO;
  let V_PRODUCT;
  let P_CONTROL_REMARK;
  let P_ERROR;
  V_PROC_ID = "";
  V_LOT_NO = "";
  V_PRODUCT = "";
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
      let query = `SELECT coalesce (MAX(D.FPHD_PROC_ID),' ')
                  as V_PROC_ID
                  FROM "Traceability".TRC_PROC_FLOW_HOLDTIME_DET D
                  WHERE D.FPHD_FLOW_ID = '${V_FLOW_ID}'
                        AND D.FPHD_LOT_NO = '${V_LOT_NO}'
                        AND D.FPHD_CONTROL_NO = '${p_sheet_no}'
                        AND D.FPHD_END_DATE IS NULL `;
      let result = await executeQueryPostgres(query);
      if (result.v_proc_id != "") {
        V_PROC_ID = result.v_proc_id;
      }
    }
    let queryFPC1 = `SELECT NVL(COUNT(*),0) AS V_PROC_COUNT
                  , MAX(FP.FPFP_STD_VALUE) AS V_CONTROL_TIME
            FROM FPCF_PROC_FLOW_PROCESS FP
            WHERE FP.FPFP_FLOW_ID = '${V_FLOW_ID}'
                  AND FP.FPFP_PROC_ID = '${V_PROC_ID}' `;
    let queryFPC2 = `SELECT PR.PROC_DISP as V_PROC_NAME
            FROM FPC_PROCESS PR WHERE PR.PROC_ID = '${V_PROC_ID}' `;
    let resultFPC1 = await executeOracleQuery(queryFPC1);
    let resultFPC2 = await executeOracleQuery(queryFPC2);
    if (resultFPC1.length > 0) {
      V_PROC_COUNT = resultFPC1[0][0];
      V_CONTROL_TIME = resultFPC1[0][1];
    }
    if (resultFPC2.length > 0) {
      V_PROC_NAME = resultFPC2[0][0];
    }
    if (V_PROC_COUNT > 0) {
      let queryTRC1 = `SELECT COALESCE(COUNT(*), 0) AS V_CONTROL_COUNT,
                        ROUND(EXTRACT(EPOCH FROM (NOW() - MAX(D.FPHD_START_DATE))) / 60) AS V_TOTAL_TIME
                  FROM "Traceability".TRC_PROC_FLOW_HOLDTIME_DET D
                  WHERE D.FPHD_FLOW_ID = '${V_FLOW_ID}'
                        AND D.FPHD_PROC_ID = '${V_PROC_ID}'
                        AND D.FPHD_LOT_NO = '${V_LOT_NO}'
                        AND D.FPHD_CONTROL_NO = '${p_sheet_no}'
                        AND D.FPHD_END_DATE IS NULL;
                        `;
      let resultTRC1 = await executeQueryPostgres(queryTRC1);
      if (resultTRC1.v_control_count != "") {
        V_CONTROL_COUNT = parseInt(resultTRC1.v_control_count);
        V_TOTAL_TIME = parseInt(resultTRC1.v_total_time);
      }
      if (V_CONTROL_COUNT > 0) {
        let queryTRC2 = `SELECT coalesce (MAX(H.FPHH_CONTROL_QTY),0)
                        as V_LOT_ROW
                        FROM "Traceability".TRC_PROC_FLOW_HOLDTIME_HEAD H
                        WHERE H.FPHH_FLOW_ID = '${V_FLOW_ID}'
                              AND H.FPHH_PROC_ID = '${V_PROC_ID}'
                              AND H.FPHH_LOT_NO = '${V_LOT_NO}'  `;
        let resultTRC2 = await executeQueryPostgres(queryTRC2);
        if (resultTRC2.v_lot_row != "") {
          V_LOT_ROW = parseInt(resultTRC2.v_lot_row);
        }
        let queryTRC3 = `SELECT coalesce (COUNT(*),0)as V_CONTROL_ROW
                              , COALESCE(SUM(CASE WHEN D.FPHD_RESULT_CODE = 'F' THEN 1 ELSE 0 END), 0) as V_NG_COUNT
                        FROM "Traceability".TRC_PROC_FLOW_HOLDTIME_DET D
                        WHERE D.FPHD_FLOW_ID = '${V_FLOW_ID}'
                              AND D.FPHD_PROC_ID = '${V_PROC_ID}'
                              AND D.FPHD_LOT_NO = '${V_LOT_NO}'
                              AND D.FPHD_END_DATE IS NOT NULL
                              AND D.FPHD_RESULT_CODE IS NOT NULL`;
        let resultTRC3 = await executeQueryPostgres(queryTRC3);
        if (resultTRC3.v_control_row != "") {
          V_CONTROL_ROW = parseInt(resultTRC3.v_control_row);
          V_NG_COUNT = parseInt(resultTRC3.v_ng_count);
        }
        let queryDeleteFPC = `DELETE FROM FPCF_PROC_FLOW_LOT
                        WHERE FPFL_FLOW_ID = :V_FLOW_ID1
                              AND FPFL_PROC_ID = :V_PROC_ID1
                              AND FPFL_LOT_NO = :V_LOT_NO1  `;
        let params = {
          V_FLOW_ID1: V_FLOW_ID,
          V_PROC_ID1: V_PROC_ID,
          V_LOT_NO1: V_LOT_NO,
        };
        let resultFPCDelete = await deleteFromOracle(queryDeleteFPC, params);
        if (V_TOTAL_TIME <= V_CONTROL_TIME) {
          V_CONTROL_RESULT = "P";
        } else {
          V_CONTROL_RESULT = "F";
        }
        if (V_LOT_ROW == V_CONTROL_ROW + 1) {
          if (V_NG_COUNT > 0) {
            V_LOT_RESULT = "F";
            V_RESULT = "F";
          } else {
            V_LOT_RESULT = V_CONTROL_RESULT;
            V_RESULT = V_CONTROL_RESULT;
          }
          V_UPDATE = "Y";
        }
        let queryUpdateTrc = `UPDATE "Traceability".TRC_PROC_FLOW_HOLDTIME_HEAD  
						SET
                              FPHH_RESULT_CODE = '${V_LOT_RESULT}'
                              , FPHH_UPDATE_BY = '${p_user}'
                              , FPHH_UPDATE_DATE = NOW()
                              , FPHH_UPDATE_STATION = '${p_station}'
                        WHERE FPHH_FLOW_ID = '${V_FLOW_ID}'
                              AND FPHH_PROC_ID = '${V_PROC_ID}'
                              AND FPHH_LOT_NO = '${V_LOT_NO}' `;
        let resultTRCUpdate = await insertIntoPostgres(queryUpdateTrc);

        let queryUpdateTrc2 = ` UPDATE "Traceability".TRC_PROC_FLOW_HOLDTIME_DET  SET
                              FPHD_END_BY = '${p_user}'
                              , FPHD_END_DATE = NOW()
                              , FPHD_END_STATION = '${p_station}'
                              , FPHD_STD_TIME = ${V_CONTROL_TIME}
                              , FPHD_TOTAL_TIME = ${V_TOTAL_TIME}
                              , FPHD_RESULT_CODE = '${V_CONTROL_RESULT}'
                              , FPHD_REMARK = ''
                        WHERE FPHD_FLOW_ID = '${V_FLOW_ID}'
                              AND FPHD_PROC_ID = '${V_PROC_ID}'
                              AND FPHD_LOT_NO = '${V_LOT_NO}'
                              AND FPHD_CONTROL_NO = '${p_sheet_no}'
                              AND FPHD_END_DATE IS NULL  `;
        let resultTRCUpdate2 = await insertIntoPostgres(queryUpdateTrc2);

        if (V_UPDATE == "Y") {
          let queryInsertFPC = `  INSERT INTO FPCF_PROC_FLOW_LOT FL
                                    (
                                    FL.FPFL_FLOW_ID,
                                    FL.FPFL_PROC_ID,
                                    FL.FPFL_LOT_NO,
                                    FL.FPFL_STATUS_CODE,
                                    FL.FPFL_RESULT_CODE,
                                    FL.FPFL_CREATE_BY,
                                    FL.FPFL_CREATE_DATE,
                                    FL.FPFL_CREATE_STATION,
                                    FL.FPFL_UPDATE_BY,
                                    FL.FPFL_UPDATE_DATE,
                                    FL.FPFL_UPDATE_STATION
                                    )
                                    VALUES
                                    ( :V_FLOW_ID
                                          , :V_PROC_ID_V
                                          , :V_LOT_NO_V
                                          , :V_STATUS_V
                                          , :V_RESULT_V
                                          , :P_USER_V
                                          , SYSDATE
                                          , :P_STATION_V
                                          , :P_USER_V
                                          , SYSDATE
                                          , :P_STATION_V
                                    ) `;
          let params = {
            V_FLOW_ID: V_FLOW_ID,
            V_PROC_ID_V: V_PROC_ID,
            V_LOT_NO_V: V_LOT_NO,
            V_STATUS_V: V_STATUS,
            V_RESULT_V: V_RESULT,
            P_USER_V: p_user,
            P_STATION_V: p_station,
          };
          let resultFPCInsert = await deleteFromOracle(queryInsertFPC, params);
        }
        if (V_CONTROL_RESULT == "F") {
          // Over Control Time
          let queryError = `call "Traceability".trc_error_massage('{"strAppId":"${V_APP_ID}","strMessageId":"MSG1403","strParameter1":"${p_sheet_no}"
                            ,"strParameter2":"${V_CONTROL_TIME}","strParameter3":"","strParameter4":"","strParameter5":"","strEngFlg":"Y","strThaFlg":"Y"}','')`;
          let resultError = await executeQueryPostgres(queryError);
          if (resultError.p_error != "") {
            P_ERROR = resultError.p_error;
          }
        }
      } else {
        // Not Found Control No.
        let queryError = `call "Traceability".trc_error_massage('{"strAppId":"${V_APP_ID}","strMessageId":"MSG1402","strParameter1":"${p_sheet_no}"
        ,"strParameter2":"","strParameter3":"","strParameter4":"","strParameter5":"","strEngFlg":"Y","strThaFlg":"Y"}','') `;
        let resultError = await executeQueryPostgres(queryError);
        if (resultError.p_error != "") {
          P_ERROR = resultError.p_error;
        }
      }
    } else {
      // Process not control
      let queryError = `call "Traceability".trc_error_massage('{"strAppId":"${V_APP_ID}","strMessageId":"MSG1405","strParameter1":"${V_PROC_NAME}"
      ,"strParameter2":"","strParameter3":"","strParameter4":"","strParameter5":"","strEngFlg":"Y","strThaFlg":"Y"}','')`;
      let resultError = await executeQueryPostgres(queryError);
      if (resultError.p_error != "") {
        P_ERROR = resultError.p_error;
      }
    }
  } else {
    P_ERROR = "MOT NOT RECORD TIME";
  }
  console.log(res.body)
  // console.log(P_ERROR,'response')
  res.status(200).json({
    V_LOT_NO,
    V_PRODUCT,
    V_PROC_ID,
    V_PROC_COUNT,
    V_CONTROL_TIME,
    V_PROC_NAME,
    V_CONTROL_COUNT,
    V_TOTAL_TIME,
    V_LOT_ROW,
    V_CONTROL_ROW,
    V_NG_COUNT,
    V_CONTROL_RESULT,
    V_LOT_RESULT,
    V_RESULT,
    V_UPDATE,
    V_APP_ID,
    P_ERROR: P_ERROR || "",
  });
};
