const {
    ConnectPG_DB,
    DisconnectPG_DB,
    ConnectOracleDB,
    DisconnectOracleDB,
  } = require("../Conncetion/DBConn.cjs");
  const oracledb = require("oracledb");
  const { writeLogError } = require("../Common/LogFuction.cjs");

  module.exports.fnlotresultfinalgatedata = async function (req, res) {
    var query = "";
    try {
      const client = await ConnectPG_DB();
      const { dataList} = req.body;
      console.log(dataList,'fnlotresultfinalgatedata')
      const json_convertdata = JSON.stringify(dataList);
      query += ` SELECT * from "Traceability".trc_034_traceviewlot_fnlotresultfinalgatedata('[${json_convertdata}]')`;
      console.log('คิวรี่', query)
      const result = await client.query(query);
        res.status(200).json(result.rows);
        DisconnectPG_DB(client);
    } catch (error) {
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  };
  
  module.exports.getdataviewlot = async function (req, res) {
    var query = "";
    try {
      const client = await ConnectPG_DB();
      const { dataList} = req.body;
      console.log(dataList,'fnlotresultfinalgatedata')
      const json_convertdata = JSON.stringify(dataList);
      query += ` SELECT * from "Traceability".trc_034_traceviewlot_getdataviewlot('[${json_convertdata}]')`;
      console.log(query,'qqqqqq')
      const result = await client.query(query);
        res.status(200).json(result.rows);
        DisconnectPG_DB(client);
    } catch (error) {
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  };

  module.exports.getdataviewlot2 = async function (req, res) {
    var query = "";
    try {
      const client = await ConnectPG_DB();
      const { dataList} = req.body;
      console.log(dataList,'fnlotresultfinalgatedata')
      const json_convertdata = JSON.stringify(dataList);
      query += ` SELECT * from "Traceability".trc_034_traceviewlot_getdataviewlot2('[${json_convertdata}]')`;
      console.log(query)
      const result = await client.query(query);
        res.status(200).json(result.rows);
        DisconnectPG_DB(client);
    } catch (error) {
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  };


  module.exports.getdataviewlot3 = async function (req, res) {
    var query = "";
    try {
      const client = await ConnectPG_DB();
      const { dataList} = req.body;
      console.log(dataList,'fnlotresultfinalgatedata')
      const json_convertdata = JSON.stringify(dataList);
      query += ` SELECT * from "Traceability".trc_034_traceviewlot_getdataviewlot3('[${json_convertdata}]')`;
      const result = await client.query(query);
        res.status(200).json(result.rows);
        DisconnectPG_DB(client);
    } catch (error) {
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  };





  module.exports.fnLotResultFinalGateDeatailData = async function (req, res) {
    var query = "";
    try {
      const client = await ConnectPG_DB();
      const { dataList} = req.body;
      console.log(dataList,'fnlotresultfinalgatedata')
      const json_convertdata = JSON.stringify(dataList);
      query += `select * from  "Traceability".trc_034_traceviewlot_fnlotresultfinalgatedeataildata('[${ json_convertdata}]')`;
      console.log('1111111',query)
      const result = await client.query(query);
        res.status(200).json(result.rows);
        DisconnectPG_DB(client);
    } catch (error) {
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  };

  module.exports.fnSheetSerialByLotData = async function (req, res) {
    var query = "";
    try {
      const client = await ConnectPG_DB();
      const { dataList} = req.body;
      console.log(dataList,'fnSheetSerialByLotData')
      const json_convertdata = JSON.stringify(dataList);
      query += `select * from  "Traceability".trc_034_traceviewlot_fnsheetserialbylotdata1('[${json_convertdata}]')`;
      console.log('1111111',query)
      const result = await client.query(query);
      // res.status(200).json(Object.keys(data[0])); // หาก data เป็น array
        res.status(200).json(result.rows);
        // res.status(200).json(Object.keys(FinalExport[0]));
        DisconnectPG_DB(client);
    } catch (error) {
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  };


  module.exports.fnLotRollLeafByLotData = async function (req, res) {
    var query = "";
    try {
      const client = await ConnectPG_DB();
      const { dataList} = req.body;
      console.log(dataList,'fnlotresultfinalgatedata')
      const json_convertdata = JSON.stringify(dataList);
      query += `select * from  "Traceability".trc_034_traceviewlot_ ('[${json_convertdata}]')`;
      console.log('1111111',query)
      const result = await client.query(query);
     
        res.status(200).json(result.rows);
       
        DisconnectPG_DB(client);
    } catch (error) {
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  };
// -----------------------------------------------------------------------------------
  module.exports.fnLotRollLeafNo = async function (req, res) {
    var query = "";
    try {
      const client = await ConnectPG_DB();
      const { strRollNO} = req.body;
      console.log( strRollNO)
      query += `select * from  "Traceability".trc_034_traceviewlot_fnLotRollLeafNo('${strRollNO}')`;
      const result = await client.query(query);
        res.status(200).json(result.rows);
        DisconnectPG_DB(client);
    } catch (error) {
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  };

  module.exports.fnGetProcessLinkData = async function (req, res) {
    var query = "";
    try {
      const client = await ConnectPG_DB();
      console.log('1111111')
      query += `select * from  "Traceability".trc_034_traceviewlot_fngetprocesslinkdata()`;
      console.log('1111111',query)
      const result = await client.query(query);
        res.status(200).json(result.rows);
        DisconnectPG_DB(client);
    } catch (error) {
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  };
  
  module.exports.fnLotSheetFrontData = async function (req, res) {
    var query = "";
    try {
      const client = await ConnectPG_DB();
      const { strLOTNO} = req.body;
      console.log( strLOTNO)
      query += `select * from  "Traceability".trc_034_traceviewlot_fnlotsheetfrontdata('${strLOTNO}')`;
      const result = await client.query(query);
        res.status(200).json(result.rows);
        DisconnectPG_DB(client);
    } catch (error) {
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  };

  module.exports.fnLotSheetBackData = async function (req, res) {
    var query = "";
    try {
      const client = await ConnectPG_DB();
      const { strLOTNO} = req.body;
      console.log( strLOTNO)
      query += `select * from  "Traceability".trc_034_traceviewlot_fnlotsheetbackdata('${strLOTNO}')`;
      const result = await client.query(query);
        res.status(200).json(result.rows);
        DisconnectPG_DB(client);
    } catch (error) {
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  };

  module.exports.GetDatatLotTrace = async function (req, res) {
    var query = "";
    let data=[]
    try {
      const Conn = await ConnectOracleDB("PCTTTEST");
      const { txtLotNo } = req.body;
      console.log("MAAAAA",txtLotNo)
      query += ` SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_GetDatatLotTrace( '${txtLotNo}') AS DATA1 FROM DUAL`;
      console.log(query)
      const result = await Conn.execute(query);
      console.log(result.rows)
    
      if(result.rows[0][0].length>0){
        for(let dt=0;dt<result.rows[0][0].length;dt++){
          data.push({
            LOT_PRD_NAME: result.rows[0][0][dt][0],
            LOT_ROLL_NO: result.rows[0][0][dt][1],
          });
        }
       
      }
      res.status(200).json(data);
      DisconnectOracleDB(Conn);
    } catch (error) {
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  };


  module.exports.ReferPREVIUSLOT = async function (req, res) {
    var query = "";
    let data=[]
    try {
      const Conn = await ConnectOracleDB("PCTTTEST");
      const { txtLotNo } = req.body;
      console.log("MAAAAA",txtLotNo)
      query += ` SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_ReferPREVIUSLOT( '${txtLotNo}') AS DATA1 FROM DUAL`;
      console.log(query)
      const result = await Conn.execute(query);
      console.log(result.rows)
    
      if(result.rows[0][0].length>0){
        for(let dt=0;dt<result.rows[0][0].length;dt++){
          data.push({
            LOT: result.rows[0][0][dt][0],
          });
        }
       
      }
      res.status(200).json(data);
      DisconnectOracleDB(Conn);
    } catch (error) {
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  };

  module.exports.ReferNEXTLOT = async function (req, res) {
    var query = "";
    let data=[]
    try {
      const Conn = await ConnectOracleDB("PCTTTEST");
      const { txtLotNo } = req.body;
      console.log("MAAAAA",txtLotNo)
      query += ` SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_RefernextLot( '${txtLotNo}') AS DATA1 FROM DUAL`;
      console.log(query)
      const result = await Conn.execute(query);
      console.log(result.rows)
    
      if(result.rows[0][0].length>0){
        for(let dt=0;dt<result.rows[0][0].length;dt++){
          data.push({
            LOT: result.rows[0][0][dt][0],
          });
        }
       
      }
      res.status(200).json(data);
      DisconnectOracleDB(Conn);
    } catch (error) {
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  };

  module.exports.GetMaterial2 = async function (req, res) {
    console.log("มาแล้ว")
    var query = "";
    let data=[]
    try {
      const Conn = await ConnectOracleDB("PCTTTEST");
      const { txtLotNo } = req.body;
      console.log("MAAAAA",txtLotNo)
      query += ` SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_GetMaterial2( '${txtLotNo}') AS DATA1 FROM DUAL`;
      console.log(query)
      const result = await Conn.execute(query);
    
      if(result.rows[0][0].length>0){
        for(let dt=0;dt<result.rows[0][0].length;dt++){
          data.push({
            ITEM_CODE: result.rows[0][0][dt][0],
            ITEM_DESC: result.rows[0][0][dt][1],
            PROCESS: result.rows[0][0][dt][2],
            VENDER_LOT: result.rows[0][0][dt][3],
            SUB_LOT: result.rows[0][0][dt][4],
          });
        }
       
      }
      res.status(200).json(data);
      DisconnectOracleDB(Conn);
    } catch (error) {
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  };

  module.exports.GetMaterial1 = async function (req, res) {
    var query = "";
    let data=[]
    try {
      const Conn = await ConnectOracleDB("PCTTTEST");
      const { txtLotNo } = req.body;
      console.log("MAAAAA",txtLotNo)
      query += ` SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_GetMaterial1( '${txtLotNo}') AS DATA1 FROM DUAL`;
      console.log(query)
      const result = await Conn.execute(query);
      console.log(result.rows)
    
      if(result.rows[0][0].length>0){
        for(let dt=0;dt<result.rows[0][0].length;dt++){
          data.push({
            ITEM_CODE: result.rows[0][0][dt][0],
            ITEM_DESC: result.rows[0][0][dt][1],
            PROCESS: result.rows[0][0][dt][2],
            VENDER_LOT: result.rows[0][0][dt][3],
            SUB_LOT: result.rows[0][0][dt][4],
          });
        }
       
      }
      res.status(200).json(data);
      DisconnectOracleDB(Conn);
    } catch (error) {
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  };

  module.exports.GetDetail = async function (req, res) {
    var query = "";
    let data=[]
    try {
      const Conn = await ConnectOracleDB("PCTTTEST");
      const { txtLotNo } = req.body;
      console.log("MAAAAA",txtLotNo)
      query += ` SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_GetDetail( '${txtLotNo}') AS DATA1 FROM DUAL`;
      console.log(query)
      const result = await Conn.execute(query);
      console.log(result.rows)
    
      if(result.rows[0][0].length>0){
        for(let dt=0;dt<result.rows[0][0].length;dt++){
          data.push({
            SEQ: result.rows[0][0][dt][0],
            FACTORY_CODE: result.rows[0][0][dt][1],
            PROC_DISP: result.rows[0][0][dt][2],
            SCAN_DATE: result.rows[0][0][dt][3],
            PROC_SEQ: result.rows[0][0][dt][4],
          });
        }
       
      }
      res.status(200).json(data);
      DisconnectOracleDB(Conn);
    } catch (error) {
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  };