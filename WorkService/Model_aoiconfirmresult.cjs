const {
    ConnectPG_DB,
    DisconnectPG_DB,
    ConnectOracleDB,
    DisconnectOracleDB,
  } = require("../Conncetion/DBConn.cjs");
  const { writeLogError } = require("../Common/LogFuction.cjs");

  module.exports.GetSheetAOIXRayResult = async function (req, res) {
    var query = "";
    try {
      const client = await ConnectPG_DB();
      const { Plant_Code,strSheetNo } = req.body;
      console.log(Plant_Code,strSheetNo)
      query += ` SELECT * from "Traceability".trc_029_aoiconfirmresult_getsheetaoixrayresult('${Plant_Code}','${strSheetNo}')`;
      const result = await client.query(query);
    //   if (result.rows.length > 0) {
        res.status(200).json(result.rows);
        DisconnectPG_DB(client);
    //   }
    } catch (error) {
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  };
