const {
    ConnectPG_DB,
    DisconnectPG_DB,
    ConnectOracleDB,
    DisconnectOracleDB,
  } = require("../Conncetion/DBConn.cjs");
  const oracledb = require("oracledb");
  const { writeLogError } = require("../Common/LogFuction.cjs");

  module.exports.GetExistsBoxSerial = async function (req, res) {
    var query = "";
    try {
      const Conn = await ConnectOracleDB("PCTTTEST");
      const {Serial_No} = req.body;
       query = `SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_GetExistsBoxSerial('${Serial_No}')  FROM DUAL `;
      const result = await Conn.execute(query);
      console.log(query,"query")
      if (result.rows.length > 0) {
        let data = [
          {
            BOX_NO: result.rows[0][0][0][0],
            PACKING_NO: result.rows[0][0][0][1]
  
          },
        ];
  
        res.status(200).json(data);
        console.log("data",data)
        DisconnectOracleDB(Conn);
      }
    } catch (error) {
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  };