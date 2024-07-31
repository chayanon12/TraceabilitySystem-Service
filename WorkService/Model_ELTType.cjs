const {
    ConnectPG_DB,
    DisconnectPG_DB,
    ConnectOracleDB,
    DisconnectOracleDB,
  } = require("../Conncetion/DBConn.cjs");
  const { writeLogError } = require("../Common/LogFuction.cjs");
  const Fac = process.env.FacA1;

  module.exports.GetELTProduct = async function (req, res) {
    var query = "";
    try {
      const client = await ConnectPG_DB();
      query += ` SELECT * from "Traceability".trc_016_elttype_getproduct('${Fac}'); `;
  
      const result = await client.query(query);
  
      if (result.rows.length > 0) {
        res.status(200).json(result.rows);
        await DisconnectPG_DB(client);
      }else{
        res.status(400).json({result:'Data Not Found'});
      }
    } catch (error) {
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  };
  module.exports.GetELTType = async function (req, res) {
    var query = "";
    try {
      const client = await ConnectPG_DB();
      query += ` SELECT * from "Traceability".trc_000_common_getelttype('${Fac}'); `;
  
      const result = await client.query(query);
  
      if (result.rows.length > 0) {
        res.status(200).json(result.rows);
        await DisconnectPG_DB(client);
      }else{
        res.status(400).json({result:'Data Not Found'});
      }
    } catch (error) {
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  };
  module.exports.GetELTTypeByProduct = async function (req, res) {
    var query = "";
    try {
      
      const client = await ConnectPG_DB();
      let { dataList } = req.body;
      const json_convertdata = JSON.stringify(dataList);
      console.log(json_convertdata)
      query += ` select * from "Traceability".trc_016_ELTType_GetELTTypeByProduct('${json_convertdata}') `;
  
      const result = await client.query(query);
  
      if (result.rows.length > 0) {
        res.status(200).json(result.rows);
        await DisconnectPG_DB(client);
      }else{
        res.status(400).json({result:'Data Not Found'});
      }
    } catch (error) {
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  };
  module.exports.DeleteData = async function (req, res) {
    var query = "";
    try {
      const client = await ConnectPG_DB();
      let { dataList } = req.body;
      const json_convertdata = JSON.stringify(dataList);
      console.log(json_convertdata,'INsert')
      query += ` call "Traceability".trc_016_ELTType_deletedata('[${json_convertdata}]','') `;
  
      const result = await client.query(query);
  
      if (result.rows.length > 0) {
        res.status(200).json(result.rows);
        await DisconnectPG_DB(client);
      }else{
        res.status(400).json({result:'Data Not Found'});
      }
    } catch (error) {
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  };