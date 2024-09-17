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
  
  module.exports.GetFgh_inspect_count = async function (req, res) {
    var query = "";
    try {
      const client = await ConnectPG_DB();
      const { Plant_Code,strOldSerial } = req.body;
      console.log(Plant_Code,strOldSerial)
      query += ` SELECT * from "Traceability".trc_027_changpartialno_getfgh_inspect_count('${Plant_Code}','${strOldSerial}')`;
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

  module.exports.Set_UpdateGateheader = async function (req, res) {
    var query = "";
    try {
      const client = await ConnectPG_DB();
      const { dataList } = req.body;
      const json_convertdata = JSON.stringify(dataList);
      query += `CALL "Traceability".trc_027_changpartialno_setupdatefinal_gate_header('[${json_convertdata}]','')`;
      // CALL "Traceability".trc_027_changpartialno_setupdatefinal_gate_header('[{"strNewSerial":"test111","IP_ADDRESS":"may1","PLANT_CODE":"5","strOldSerial":"240581297PP"}]','');
      const result = await client.query(query);
      res.status(200).json(result.rows);
      await DisconnectPG_DB(client);
    } catch (error) {
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  };