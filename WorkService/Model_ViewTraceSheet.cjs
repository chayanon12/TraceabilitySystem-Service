const {
    ConnectPG_DB,
    DisconnectPG_DB,
    ConnectOracleDB,
    DisconnectOracleDB,
  } = require("../Conncetion/DBConn.cjs");
  const oracledb = require("oracledb");
  const { writeLogError } = require("../Common/LogFuction.cjs");


module.exports.GetLotSheet = async function (req, res) {
    var query = "";
    try {
        const {dataList} = req.body;
          const client = await ConnectPG_DB();
          const json_convertdata = JSON.stringify(dataList);
          query += ` SELECT * from "Traceability".trc_037_traceviewsheet_getlotno('[${json_convertdata}]')`;
          const result = await client.query(query);
          res.status(200).json(result.rows);
          await DisconnectPG_DB(client);
        } catch (error) {
          writeLogError(error.message, query);
          res.status(500).json({ message: error.message });
        }
  };
  module.exports.GetProductSheet = async function (req, res) {
    var query = "";
    try {
        const {dataList} = req.body;
          const client = await ConnectPG_DB();
          const json_convertdata = JSON.stringify(dataList);
          query += ` SELECT * from "Traceability".trc_037_traceviewsheet_getproduct('[${json_convertdata}]')`;
          const result = await client.query(query);
          res.status(200).json(result.rows);
          await DisconnectPG_DB(client);
        } catch (error) {
          writeLogError(error.message, query);
          res.status(500).json({ message: error.message });
        }
  };
  module.exports.GetSPI = async function (req, res) {
    var query = "";
    try {
        const {dataList} = req.body;
          const client = await ConnectPG_DB();
          const json_convertdata = JSON.stringify(dataList);
          query += ` SELECT * from "Traceability".trc_037_traceviewsheet_getspi('[${json_convertdata}]')`;
          const result = await client.query(query);
          res.status(200).json(result.rows);
          await DisconnectPG_DB(client);
        } catch (error) {
          writeLogError(error.message, query);
          res.status(500).json({ message: error.message });
        }
  };
  module.exports.GetPreAOI = async function (req, res) {
    var query = "";
    try {
      const {dataList} = req.body;
      const client = await ConnectPG_DB();
      const json_convertdata = JSON.stringify(dataList);
      query += ` SELECT * from "Traceability".trc_037_traceviewsheet_getpreaoi('[${json_convertdata}]')`;
      const result = await client.query(query);
      res.status(200).json(result.rows);
      await DisconnectPG_DB(client);
    } catch (error) {
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  };
  module.exports.GetAOI = async function (req, res) {
    var query = "";
    try {
      const {dataList} = req.body;
    const client = await ConnectPG_DB();
    const json_convertdata = JSON.stringify(dataList);
    query += ` SELECT * from "Traceability".trc_037_traceviewsheet_getaoi('[${json_convertdata}]')`;
    const result = await client.query(query);
    res.status(200).json(result.rows);
    await DisconnectPG_DB(client);
        } catch (error) {
          writeLogError(error.message, query);
          res.status(500).json({ message: error.message });
        }
  };
  module.exports.GetAOI_Coating = async function (req, res) {
    var query = "";
    try {
      const {dataList} = req.body;
    const client = await ConnectPG_DB();
    const json_convertdata = JSON.stringify(dataList);
    query += ` SELECT * from "Traceability".trc_037_traceviewsheet_getaoi_coating('[${json_convertdata}]')`;
    const result = await client.query(query);
    res.status(200).json(result.rows);
    await DisconnectPG_DB(client);
        } catch (error) {
          writeLogError(error.message, query);
          res.status(500).json({ message: error.message });
        }
  };
  module.exports.Getinspection = async function (req, res) {
    var query = "";
    try {
      const {dataList} = req.body;
    const client = await ConnectPG_DB();
    const json_convertdata = JSON.stringify(dataList);
    query += ` SELECT * from "Traceability".trc_037_traceviewsheet_get_inspection_result('[${json_convertdata}]')`;
    const result = await client.query(query);
    res.status(200).json(result.rows);
    await DisconnectPG_DB(client);
        } catch (error) {
          writeLogError(error.message, query);
          res.status(500).json({ message: error.message });
        }
  };
  module.exports.Get_LOT_SHEET_SERIAL = async function (req, res) {
    var query = "";
    try {
      const {dataList} = req.body;
    const client = await ConnectPG_DB();
    const json_convertdata = JSON.stringify(dataList);
    query += ` SELECT * from "Traceability".trc_037_traceviewsheet_get_lot_sheet_serial('[${json_convertdata}]')`;
    const result = await client.query(query);
    res.status(200).json(result.rows);
    await DisconnectPG_DB(client);
        } catch (error) {
          writeLogError(error.message, query);
          res.status(500).json({ message: error.message });
        }
  };
  module.exports.GetXray = async function (req, res) {
    var query = "";
   
    try {
      const {dataList} = req.body;
      console.log("เข้าจ้า",dataList)
    const client = await ConnectPG_DB();
    const json_convertdata = JSON.stringify(dataList);
    query += ` SELECT * from "Traceability".trc_037_traceviewsheet_get_xray('[${json_convertdata}]')`;
    console.log(query,"query")
    const result = await client.query(query);
    res.status(200).json(result.rows);
    console.log("ข้อมูล", result.rows)
    await DisconnectPG_DB(client);
        } catch (error) {
          writeLogError(error.message, query);
          res.status(500).json({ message: error.message });
        }
  };