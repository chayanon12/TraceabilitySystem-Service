const {
    ConnectPG_DB,
    DisconnectPG_DB,
    ConnectOracleDB,
    DisconnectOracleDB,
  } = require("../Conncetion/DBConn.cjs");
  const { writeLogError } = require("../Common/LogFuction.cjs");

  module.exports.GetELTmasterCombo = async function (req, res) {
    var query = "";
    try {
      const client = await ConnectPG_DB();
      query += ` select * from  "Traceability".trc_009_eltmaster_geteltcombo() `;
  
      const result = await client.query(query);
  
      if (result.rows.length > 0) {
        res.status(200).json(result.rows);
        await DisconnectPG_DB(client);
      }
    } catch (error) {
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  };


  module.exports.GetELT_search = async function (req, res) {
    let query = "";
    let json_convertdata = "";
    try {
        const {dataList} = req.body;
      const client = await ConnectPG_DB();
      const json_convertdata = JSON.stringify(dataList);
      query += ` select * from "Traceability".trc_009_eltmaster_getseaech(
    '[${json_convertdata}]'
    ); `;
  
      const result = await client.query(query);
  
    //   if (result.rows.length > 0) {
        res.status(200).json(result.rows);
        await DisconnectPG_DB(client);
    //   }
    } catch (error) {
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  };
  module.exports.Submit_ELT = async function (req, res) {
    var query = "";
    try {
      const client = await ConnectPG_DB();
      let { dataList } = req.body;
      const json_convertdata = JSON.stringify(dataList);
      query = `CALL "Traceability".trc_009_elt_submitretrive('[${json_convertdata}]','');`;
      const result = await client.query(query);
      if (result.rows[0].p_error == "") {
        dataList = null; 
        res.status(200).json({ message: "Success" });
      }else{
        res.status(400).json({ message: result.rows[0].p_error });
      }
    } catch (error) {
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  };
 