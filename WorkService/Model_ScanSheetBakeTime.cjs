const { query } = require("express");
const {
  ConnectPG_DB,
  DisconnectPG_DB,
  ConnectOracleDB,
  DisconnectOracleDB,
} = require("../Conncetion/DBConn.cjs");
const { writeLogError } = require("../Common/LogFuction.cjs");



module.exports.CallSMTBakingRecordTimeResult = async function (req, res) {
    let query = "";
    let json_convertdata = "";
    try {
      const {dataList} = req.body;
      const client = await ConnectPG_DB();
      const json_convertdata = JSON.stringify(dataList);
      query = `CALL "Traceability".trc_006_common_CallSMTBakingRecordTimeResult('[${json_convertdata}]','')`;
    //   const result = await client.query(query, [json_convertdata]);
    const result  = await client.query(query);
      if (result.rows.length > 0) {
        res.status(200).json(result.rows[0]);
        console.log(result.rows[0])
        await DisconnectPG_DB(client);
        return;
      } else {
        await DisconnectPG_DB(client);
      }
    } catch (error) {
      query += `${json_convertdata}`;
      writeLogError(error.message, query);
      console.log(error, "error");
      res.status(500).json({ message: error.message });
    }
  };

  module.exports.DeleteBakingRecordTimeData = async function (req, res) {
    let query = "";
    let json_convertdata = "";
    try {
      const {dataList} = req.body;
      const client = await ConnectPG_DB();
      const json_convertdata = JSON.stringify(dataList);
      query = `CALL "Traceability".trc_006_common_DeleteBakingRecordTimeData('[${json_convertdata}]','')`;
      console.log(query)
    const result  = await client.query(query);
      if (result.rows.length > 0) {
        res.status(200).json(result.rows[0]);
        await DisconnectPG_DB(client);
        return;
      } else {
        await DisconnectPG_DB(client);
      }
    } catch (error) {
      query += `${json_convertdata}`;
      writeLogError(error.message, query);
      console.log(error, "error");
      res.status(500).json({ message: error.message });
    }
  };