const {
    ConnectPG_DB,
    DisconnectPG_DB,
    ConnectOracleDB,
    DisconnectOracleDB,
  } = require("../Conncetion/DBConn.cjs");
  const oracledb = require("oracledb");
  const { writeLogError } = require("../Common/LogFuction.cjs");

  module.exports.fnlotresultfinalgatedata = async function (req, res) {
    var query = "";
    try {
      const client = await ConnectPG_DB();
      const { strplantcode,strlotno } = req.body;
      console.log(strplantcode,strlotno,'fnlotresultfinalgatedata')
      query += ` SELECT * from "Traceability".trc_034_traceviewlot_fnlotresultfinalgatedata('${strplantcode}','${strlotno}')`;
      const result = await client.query(query);
        res.status(200).json(result.rows);
        DisconnectPG_DB(client);
    } catch (error) {
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  };
  
  module.exports.getdataviewlot = async function (req, res) {
    var query = "";
    try {
      const client = await ConnectPG_DB();
      const { txtserialno,plant_code } = req.body;
      console.log(plant_code,txtserialno)
      query += ` SELECT * from "Traceability".trc_034_traceviewlot_getdataviewlot('${txtserialno}','${plant_code}')`;
      const result = await client.query(query);
        res.status(200).json(result.rows);
        DisconnectPG_DB(client);
    } catch (error) {
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  };

  module.exports.getdataviewlot2 = async function (req, res) {
    var query = "";
    try {
      const client = await ConnectPG_DB();
      const { plant_code,txtserialno } = req.body;
      console.log(plant_code,txtserialno)
      query += ` SELECT * from "Traceability".trc_034_traceviewlot_getdataviewlot2('${plant_code}','${txtserialno}')`;
      const result = await client.query(query);
        res.status(200).json(result.rows);
        DisconnectPG_DB(client);
    } catch (error) {
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  };


  module.exports.getdataviewlot3 = async function (req, res) {
    var query = "";
    try {
      const client = await ConnectPG_DB();
      const { plant_code,txtsheetno } = req.body;
      console.log(plant_code,txtsheetno)
      query += ` SELECT * from "Traceability".trc_034_traceviewlot_getdataviewlot3('${plant_code}','${txtsheetno}')`;
      const result = await client.query(query);
        res.status(200).json(result.rows);
        DisconnectPG_DB(client);
    } catch (error) {
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  };