const {
    ConnectPG_DB,
    DisconnectPG_DB,
    ConnectOracleDB,
    DisconnectOracleDB,
  } = require("../Conncetion/DBConn.cjs");
  const { writeLogError } = require("../Common/LogFuction.cjs");
  const oracledb = require("oracledb");

  module.exports.fnSheetSPIAOITimeData = async function (req, res) {
    const { dataList } = req.body;
    console.log("dataList:dataList", dataList)
    const json_convertdata = JSON.stringify(dataList);
    var query = "";
    try {
      const client = await ConnectPG_DB();
      query += ` SELECT * FROM "Traceability".trc_045_fnsheetspiaoitimedata('[${json_convertdata}]')`;
      const result = await client.query(query);
      const filteredResult = result.rows.map(row => row.response);
      console.log("DATA SHOW trc_045_fnsheetspiaoitimedata : ",filteredResult)
      res.status(200).json(filteredResult);
        DisconnectPG_DB(client);
    } catch (error) {
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  };

