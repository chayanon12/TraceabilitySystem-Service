const {
    ConnectPG_DB,
    DisconnectPG_DB,
    ConnectOracleDB,
    DisconnectOracleDB,
  } = require("../Conncetion/DBConn.cjs");
  const { writeLogError } = require("../Common/LogFuction.cjs");
  const oracledb = require("oracledb");
  
  module.exports.GetProductDataAVIResultConfirm = async function (req, res) {
     const { strplantcode } = req.body;
     console.log("AAA : ",strplantcode)
    var query = "";
    try {
      const client = await ConnectPG_DB();
      query += `SELECT * from "Traceability".trc_033_getproductdataaviresultconfirm('${strplantcode}')`;
      const result = await client.query(query);
      console.log("DATA SHOW trc_033_getproductdataaviresultconfirm : ",result.rows)
        res.status(200).json(result.rows);
        DisconnectPG_DB(client);
    } catch (error) {
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  };

  module.exports.GetTestTypeAVIResultConfirm = async function (req, res) {
    const { dataList } = req.body;
    console.log("BBB : ",dataList)
    const json_convertdata = JSON.stringify(dataList);
    var query = "";
    try {
      const client = await ConnectPG_DB();
      query += `SELECT * from "Traceability".trc_033_gettesttypeaviresultconfirm('[${json_convertdata}]')`;
      const result = await client.query(query);
      console.log("DATA SHOW trc_033_gettesttypeaviresultconfirm : ",result.rows)
        res.status(200).json(result.rows);
        DisconnectPG_DB(client);
    } catch (error) {
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  };
  

  module.exports.GetAVIResultConfirmDefault = async function (req, res) {
    const { dataList } = req.body;
    console.log("CCC : ",dataList)
    const json_convertdata = JSON.stringify(dataList);
    var query = "";
    try {
      const client = await ConnectPG_DB();
      query += `SELECT * from "Traceability".trc_033_getaviresultconfirmdefault('[${json_convertdata}]')`;
      const result = await client.query(query);
      console.log("DATA SHOW trc_033_getaviresultconfirmdefault : ",result.rows)
        res.status(200).json(result.rows);
        DisconnectPG_DB(client);
    } catch (error) {
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  };
  
  module.exports.GetSerialNoByVendorBarcode = async function (req, res) {
    const { dataList } = req.body;
    console.log("DDD : ",dataList)
    const json_convertdata = JSON.stringify(dataList);
    var query = "";
    try {
      const client = await ConnectPG_DB();
      query += `SELECT * from "Traceability".trc_033_getserialnobyvendorbarcode('[${json_convertdata}]')`;
      const result = await client.query(query);
      console.log("DATA SHOW trc_033_getserialnobyvendorbarcode : ",result.rows)
        res.status(200).json(result.rows);
        DisconnectPG_DB(client);
    } catch (error) {
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  };

  module.exports.GetAVIResultConfirmSerial = async function (req, res) {
    const { dataList } = req.body;
    console.log("EEE : ",dataList)
    const json_convertdata = JSON.stringify(dataList);
    var query = "";
    try {
      const client = await ConnectPG_DB();
      // query += `CALL "Traceability".trc_033_getaviresultconfirmserial('[${json_convertdata}]','','{}')`;
      query += `SELECT * from "Traceability".trc_033_getaviresultconfirmserial('[${json_convertdata}]')`;
      const result = await client.query(query);
      const filteredResult = result.rows.map(row => row.response);
      console.log("DATA SHOW trc_033_getaviresultconfirmserial_V1 : ",filteredResult)
      // console.log("DATA SHOW trc_033_getaviresultconfirmserial-V2 : ",result.rows)
        res.status(200).json(filteredResult);
        DisconnectPG_DB(client);
    } catch (error) {
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  };

  