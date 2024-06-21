const {
    ConnectPG_DB,
    DisconnectPG_DB,
    ConnectOracleDB,
    DisconnectOracleDB,
  } = require("../Conncetion/DBConn.cjs");
  const oracledb = require('oracledb');
  
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
    
    try {
       const { txtLotNo,txtSheetNo,txtMCNo } = req.body;
      const connect = await ConnectOracleDB("FPC");
      let query = `CALL FPC.FPC_SMART_FACTORY_SMT.SET_SMT_PROC_FLOW_LEADTIME_SHT(:Lotno, :SheetNo, :MCNo, :hfZPRNProcID, :P_STATUS, :P_ERROR)`;
      console.log(query);
      
      const result = await connect.execute(
        query,
        {
          Lotno: txtLotNo,
          SheetNo: txtSheetNo,
          MCNo: txtMCNo,
          hfZPRNProcID: '1840',
          // Lotno: '181147667',
          // SheetNo: 'A904049968RGP4660094',
          // MCNo: '909041325',
          // hfZPRNProcID: '1840',
          P_STATUS: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
          P_ERROR: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 500 }
        }
      );
      await DisconnectOracleDB(connect);
      res.json({
        P_STATUS: result.outBinds.P_STATUS,
        P_ERROR: result.outBinds.P_ERROR
      });
      console.log({
        P_STATUS: result.outBinds.P_STATUS,
        P_ERROR: result.outBinds.P_ERROR
      })
    } catch (error) {
      console.error("ข้อผิดพลาดในการค้นหาข้อมูล:", error.message);
      res.status(500).send("ข้อผิดพลาดในการค้นหาข้อมูล");
    }
  };


  module.exports.GetMOTRecordTimeData = async function (req, res) {
    let query = "";
    try {
      console.log('เข้าาา1')
      const { SheetNo } = req.body;
      let data={
        strSheetNo:SheetNo,
        strProcId:'1640',
        strPlantCode:'5'
      }
      const json_convertdata = JSON.stringify(data);
      const client = await ConnectPG_DB();
      query += `SELECT * from "Traceability".trc_000_common_getmotrecordtimedata('[${json_convertdata}]')`;
      const result = await connect.execute(query);
      res.status(200).json(result.rows);
      await DisconnectPG_DB(client);
      
    } catch (error) {
      console.error("ข้อผิดพลาดในการค้นหาข้อมูล:", error.message);
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  };
