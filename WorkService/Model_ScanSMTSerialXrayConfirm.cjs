const {
    ConnectPG_DB,
    DisconnectPG_DB,
    ConnectOracleDB,
    DisconnectOracleDB,
  } = require("../Conncetion/DBConn.cjs");
  const { writeLogError } = require("../Common/LogFuction.cjs");
  const oracledb = require("oracledb");

  module.exports.GetSerialXRayResult = async function (req, res) {
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



  