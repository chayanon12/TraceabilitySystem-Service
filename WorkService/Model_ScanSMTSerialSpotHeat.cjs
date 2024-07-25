const {
    ConnectPG_DB,
    DisconnectPG_DB,
    ConnectOracleDB,
    DisconnectOracleDB,
  } = require("../Conncetion/DBConn.cjs");
  const { writeLogError } = require("../Common/LogFuction.cjs");

  module.exports.GetSerialSpotHeatResult = async function (req, res) {
    var query = "";
    try {
        const {dataList} = req.body;
          let strResult = "NO"
          const client = await ConnectPG_DB();
          const json_convertdata = JSON.stringify(dataList);
        
          query += ` SELECT * from "Traceability".trc_013_getserialspotheatresult('[${json_convertdata}]')`;
      
          const result = await client.query(query);
          
          if (result.rows.length > 0) {
            strResult=result.rows[0].confirm_result
           
          }
          res.status(200).json(strResult);
          await DisconnectPG_DB(client);
        } catch (error) {
          writeLogError(error.message, query);
          res.status(500).json({ message: error.message });
        }
  };


 