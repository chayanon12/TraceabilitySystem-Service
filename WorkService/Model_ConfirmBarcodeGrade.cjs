const {
    ConnectPG_DB,
    DisconnectPG_DB,
    ConnectOracleDB,
    DisconnectOracleDB,
  } = require("../Conncetion/DBConn.cjs");
  const oracledb = require("oracledb");
  

  module.exports.xxxxxx = async function (req, res) {
    try {
      var strplantcode ='G'
      var query = "";
      const client = await ConnectPG_DB();
      query = `SELECT * from "Traceability".trc_000_common_getproductdata('${strplantcode}')`;
      const result = await client.query(query);
      await DisconnectPG_DB(client);
  
      res.status(200).json({ Result: result });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
