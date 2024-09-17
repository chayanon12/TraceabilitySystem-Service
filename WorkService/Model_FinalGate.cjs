const {
    ConnectPG_DB,
    DisconnectPG_DB,
    ConnectOracleDB,
    DisconnectOracleDB,
  } = require("../Conncetion/DBConn.cjs");
  const oracledb = require("oracledb");
  const { writeLogError } = require("../Common/LogFuction.cjs");
  const dateFns = require("date-fns");
  const { Query } = require("pg");
  
  module.exports.GetSerialTestResultManyOnlyGood = async function (req, res) {
    var query = "";
    try {
      const client = await ConnectPG_DB();
      const { dataList } = req.body;
      const json_convertdata = JSON.stringify(dataList);
      // [{"strSerialNo":"THA013506T8MTRK4E","strPlantCode":"5","strPrdName":""}]
      query += ` SELECT * from "Traceability".trc_020_finalgate_getserialtestresultmanyonlygood('[${json_convertdata}]')`;
      const result = await client.query(query);
      res.status(200).json(result.rows);
      DisconnectPG_DB(client);
    } catch (error) {
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  };

