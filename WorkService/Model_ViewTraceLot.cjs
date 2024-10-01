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