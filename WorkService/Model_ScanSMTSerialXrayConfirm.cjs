const {
    ConnectPG_DB,
    DisconnectPG_DB,
    ConnectOracleDB,
    DisconnectOracleDB,
  } = require("../Conncetion/DBConn.cjs");
  const { writeLogError } = require("../Common/LogFuction.cjs");
  const oracledb = require("oracledb");

  module.exports.GetSerialXRayResult = async function (req, res) {
    const { strlot } = req.body;
    var query = "";
    let strResult = "NO"
    try {
      const client = await ConnectPG_DB();
      query += `SELECT * FROM "Traceability".trc_039_getserialxrayresult('${strlot}')`;
      const result = await client.query(query);
      console.log("DATA SHOW trc_039_getserialxrayresult : ",result.rows)
      if(result.rows.length > 0) {
        strResult = result.rows[0].confirm_result  
      }
      console.log("DATA SHOW trc_039_getserialxrayresult : ",strResult)
        res.status(200).json(strResult);
        DisconnectPG_DB(client);
    } catch (error) {
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  };

  module.exports.GetSerialXRaySheetResult = async function (req, res) {
    const { strsheetno } = req.body;
    var query = "";
    let strResult = ""
    try {
      const client = await ConnectPG_DB();
      query += `SELECT * FROM "Traceability".trc_039_getserialxraysheetresult('${strsheetno}')`;
      const result = await client.query(query);
      console.log("DATA SHOW trc_039_getserialxraysheetresult : ",result.rows)
      if(result.rows.length > 0) {
        strResult = result.rows[0].confirm_result  
      }
      console.log("DATA SHOW trc_039_getserialxrayresult : ",strResult)
        res.status(200).json(strResult);
        DisconnectPG_DB(client);
    } catch (error) {
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  };


  
//   module.exports.GetSerialXRayResult = async function (req, res) {
//     const { dataList } = req.body;
//     console.log("DDD : ",dataList)
//     const json_convertdata = JSON.stringify(dataList);
//     var query = "";
//     try {
//       const client = await ConnectPG_DB();
//       query += `SELECT * FROM "Traceability".trc_039_getserialxrayresult(:strlot)`;
//       const result = await client.query(query);
//       console.log("DATA SHOW trc_033_getserialnobyvendorbarcode : ",result.rows)
//         res.status(200).json(result.rows);
//         DisconnectPG_DB(client);
//     } catch (error) {
//       writeLogError(error.message, query);
//       res.status(500).json({ message: error.message });
//     }
//   };


  