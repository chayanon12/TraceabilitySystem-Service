const {
    ConnectPG_DB,
    DisconnectPG_DB,
    ConnectOracleDB,
    DisconnectOracleDB,
  } = require("../Conncetion/DBConn.cjs");
  const { writeLogError } = require("../Common/LogFuction.cjs");

  module.exports.GetBangdingMachineData = async function (req, res) {
    var query = "";
    try {
        const {dataList} = req.body;
        console.log("มาแล้ว",dataList)
          const client = await ConnectPG_DB();
          const json_convertdata = JSON.stringify(dataList);
          query += ` SELECT * from "Traceability".trc_014_getbangdingmachinedata('[${json_convertdata}]')`;
          const result = await client.query(query);
          res.status(200).json(result.rows);
          await DisconnectPG_DB(client);
        } catch (error) {
          writeLogError(error.message, query);
          res.status(500).json({ message: error.message });
        }
  };

