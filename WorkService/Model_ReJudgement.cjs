const {
  ConnectPG_DB,
  DisconnectPG_DB,
  ConnectOracleDB,
  DisconnectOracleDB,
} = require("../Conncetion/DBConn.cjs");
const { writeLogError } = require("../Common/LogFuction.cjs");
const Fac = process.env.FacA1;

module.exports.GetData = async function (req, res) {
  var query = "";
  try {
    const client = await ConnectPG_DB();
    let { dataList } = req.body;
    const json_convertdata = JSON.stringify(dataList);
    console.log(json_convertdata);
    query += ` select * from "Traceability".trc_021_rejudgement_search_datat('[${json_convertdata}]') `;

    const result = await client.query(query);

    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
      console.log(result.rows);
      await DisconnectPG_DB(client);
    } else {
      res.status(204).json({ result: "Data Not Found" });
      await DisconnectPG_DB(client);
    }
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};
module.exports.GetCombo= async function (req, res) {
    var query = "";
    try {
      const client = await ConnectPG_DB();
      query += `SELECT  * FROM "Traceability".trc_021_rejudgement_getcombo();`;
  
      const result = await client.query(query);
  
      if (result.rows.length > 0) {
        res.status(200).json(result.rows);
        await DisconnectPG_DB(client);
      } else {
        res.status(204).json({ result: "Data Not Found" });
        await DisconnectPG_DB(client);
      }
    } catch (error) {
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  };
module.exports.insertData = async function (req, res) {
  var query = "";
  try {
    const client = await ConnectPG_DB();
    let { dataList } = req.body;
    const json_convertdata = JSON.stringify(dataList);
    console.log(json_convertdata);
    query += `call "Traceability".trc_021_rejudgement_submitdata('[${json_convertdata}]','')`;

    const result = await client.query(query);

    if (result.rows[0].p_error == "") {
      dataList = null;
      res.status(200).json({ message: "Success" });
    } else {
      res.status(404).json({ message: result.rows[0].p_error });
    }
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};
