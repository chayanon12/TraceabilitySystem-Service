const {
  ConnectPG_DB,
  DisconnectPG_DB,
  ConnectOracleDB,
  DisconnectOracleDB,
} = require("../Conncetion/DBConn.cjs");
const oracledb = require("oracledb");
const { writeLogError } = require("../Common/LogFuction.cjs");
  
  module.exports.GetProductNameByLot = async function (req, res) {
    console.log('g-hkkkk')
    try {
      const { LotNo } = req.body;
      const connect = await ConnectOracleDB("FPC");
      let query = "";
      query += `SELECT NVL(L.LOT_PRD_NAME,' ') AS PRD_NAME `;
      query += `FROM  FPC.FPC_LOT L `;
      query += `WHERE L.LOT =  '${LotNo}' `;
      const result = await connect.execute(query);
      console.log(result)
      await DisconnectOracleDB(connect);
      res.json(result.rows);
    } catch (error) {
      console.error("ข้อผิดพลาดในการค้นหาข้อมูล:", error.message);
      res.status(500).send("ข้อผิดพลาดในการค้นหาข้อมูล");
    }
  };

  module.exports.CallFPCSheetLeadTimeResult = async function (req, res) {
    console.log('mayuuuuu')
    let strReturn=""
    let query =""
    try {
      const { LotNo, PROC_ID,SHT_NO,MACHINE_NO,PROGRAM,CB_NO,SUS_NO,strStatus} = req.body;
      console.log('txtLotNo, PROC_ID ',LotNo, PROC_ID )
      const connection = await ConnectOracleDB("PCTTTEST");
  
      // Bind variables for the procedure call
      const result = await connection.execute(
        `BEGIN
           FPC.TRC_COMMON_TRACEABILITY.SET_SMT_BAK_MOT_LEADTIME_CBSUS(
             :P_LOT_NO,
             :P_PROC_ID,
             :P_STATUS,
             :P_ERROR,
             :P_MC_Date,
             :P_RESULT,
             :P_PRDNAME
           );
         END;`,
        {
          P_LOT_NO: LotNo || '', 
          P_PROC_ID: PROC_ID || '', 
          P_STATUS: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
          P_ERROR: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
          P_MC_Date: { dir: oracledb.BIND_OUT, type: oracledb.DATE },
          P_RESULT: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
          P_PRDNAME: { dir: oracledb.BIND_OUT, type: oracledb.STRING }
        }
      );
  
      // Response object
      const data = {
        P_STATUS : result.outBinds.P_STATUS,
        P_ERROR : result.outBinds.P_ERROR,
        V_MC_DATE : result.outBinds.P_MC_Date,
        V_RESULT: result.outBinds.P_RESULT,
        P_PRDNAME : result.outBinds.P_PRDNAME,
        P_SHT_NO :SHT_NO||'',
        P_LOT_NO :LotNo||'',
        P_MACHINE_NO :MACHINE_NO||'',
        P_PROGRAM : PROGRAM||'',
        P_PROC_ID :PROC_ID||'',
        P_CB_NO :CB_NO||'',
        P_SUS_NO:SUS_NO||'',
      };
     
     await InsertCallFPCSheetLeadTimeResult(data)
  
    
      if(data.P_ERROR!=null&&data.P_ERROR!=''){
        console.log(data.P_ERROR,"pppp")
        strReturn=data.P_ERROR
      }
      res.status(200).json({strReturn:strReturn,strStatus:data.P_STATUS}); 
  
  
    } catch (error) {
      console.error("ข้อผิดพลาดในการค้นหาข้อมูล:", error.message);
      writeLogError(error.message, query);
      res.status(500).json(error.message);
    } 
  };


  module.exports.GetMOTRecordTimeData = async function (req, res) {
    let query = "";
    let _intRowCount=0
    try {
      console.log('เข้าาา1')
      const { SheetNo } = req.body;
      let data={
        strSheetNo:SheetNo,
        strProcId:'1840',
        strPlantCode:'5'
      }
      const json_convertdata = JSON.stringify(data);
      const client = await ConnectPG_DB();
      query += `SELECT * from "Traceability".trc_000_common_getmotrecordtimedata('[${json_convertdata}]')`;
      console.log(query)
      const result = await client.query(query);
    
      _intRowCount=result.rows[0].row_count
      await DisconnectPG_DB(client);
      res.status(200).json(_intRowCount);
    } catch (error) {
      console.error("ข้อผิดพลาดในการค้นหาข้อมูล:", error.message);
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  };

  async function InsertCallFPCSheetLeadTimeResult(data) {
    let query = "";
    try {
      console.log("InsertCallFPCSheetLeadTimeResult", data);
      const json_convertdata = JSON.stringify(data);
      const client = await ConnectPG_DB();
      query = `call "Traceability".trc_000_common_insertcallfpcsheetleadtimeresult('[${json_convertdata}]','');`;
     
      const result = await client.query(query);
      await DisconnectPG_DB(client);
  
      return result.rows[0].roll_leaf; 
    } catch (error) {
      writeLogError(error.message, query);
      return error.message;
    }
  }

  module.exports.DeleteMOTRecordTimeData = async function (req, res) {
    let query = "";
    try {
    
      const { data } = req.body;
      console.log('เข้าาา1',data)
      const json_convertdata = JSON.stringify(data);
      const client = await ConnectPG_DB();
      query = `call "Traceability".trc_000_common_DeleteMOTRecordTimeData('[${json_convertdata}]','');`;
      const result = await client.query(query);
      res.status(200).json(result.rows[0]);
      await DisconnectPG_DB(client);
    } catch (error) {
      console.error("ข้อผิดพลาดในการค้นหาข้อมูล:", error.message);
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  };