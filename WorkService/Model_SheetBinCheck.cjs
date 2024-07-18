const {
    ConnectPG_DB,
    DisconnectPG_DB,
    ConnectOracleDB,
    DisconnectOracleDB,
  } = require("../Conncetion/DBConn.cjs");
  const { writeLogError } = require("../Common/LogFuction.cjs");

  module.exports.GetSheetBinInspectNo = async function (req, res) {
    var query = "";
    try {
    
    const {dataList} = req.body;
      const client = await ConnectPG_DB();
      const json_convertdata = JSON.stringify(dataList);
      query += ` SELECT * from "Traceability".trc_012_getsheetbininspectno('[${json_convertdata}]')`;
  
      const result = await client.query(query);
      if (result.rows.length > 0) {
        res.status(200).json(result.rows[0].bin_no);
      }
      else{
        res.status(200).json("NO BIN");
      }
      await DisconnectPG_DB(client);
    } catch (error) {
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  };


