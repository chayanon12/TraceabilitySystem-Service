const {
    ConnectPG_DB,
    DisconnectPG_DB,
    ConnectOracleDB,
    DisconnectOracleDB,
  } = require("../Conncetion/DBConn.cjs");
  const { writeLogError } = require("../Common/LogFuction.cjs");
  const oracledb = require("oracledb");
  
  module.exports.Update_aoiandspi_rslt = async function (req, res) {
    const { dataList } = req.body;

    const json_convertdata = JSON.stringify(dataList);
    var query = "";
    try {
      const client = await ConnectPG_DB();
      query += `CALL "Traceability".trc_057_update_aoiandspi_rslt('[${json_convertdata}]','')`;
      const result = await client.query(query);
        res.status(200).json(result.rows);
        DisconnectPG_DB(client);
    } catch (error) {
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  };
  

  module.exports.Search_aoiandspi_rslt = async function (req, res) {
    let query = "";
    try {
      const { dataList } = req.body;
      const json_convertdata = JSON.stringify(dataList);

      const client = await ConnectPG_DB();
      query += `SELECT * FROM "Traceability".trc_057_search_aoiandspi_rslt('[${json_convertdata}]')`;
      const result = await client.query(query);
      const filteredResult = result.rows.map(row => row.response);

      res.status(200).json(filteredResult);
    } catch (error) {
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  };