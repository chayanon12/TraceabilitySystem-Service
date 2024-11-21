const {
    ConnectPG_DB,
    DisconnectPG_DB,
    ConnectOracleDB,
    DisconnectOracleDB,
  } = require("../Conncetion/DBConn.cjs");
  const oracledb = require("oracledb");
  const { writeLogError } = require("../Common/LogFuction.cjs");
const { el } = require("date-fns/locale");

  module.exports.GetExistsBoxSerial = async function (req, res) {
    let query = "";
    let connection;
  
    try {
      // เชื่อมต่อกับฐานข้อมูล Oracle
      connection = await ConnectOracleDB("PCTTTEST");
  
      const { dtSerial } = req.body;
      if (!dtSerial || dtSerial.length === 0) {
        return res.status(400).json({ message: "Missing or empty dtSerial array." });
      }
  
      // Loop ผ่านแต่ละ Serial
      for (const item of dtSerial) {
        const Serial_No = item.SERIAL || "";
        // if (!Serial_No) {
        //   console.warn("Serial number is empty or undefined");
        //   item.BOX_NO = "Serial number missing";
        //   continue;
        // }
  
        query = `SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_GetExistsBoxSerial('${Serial_No}') FROM DUAL`;
        const result = await connection.execute(query);
  
        // ตรวจสอบผลลัพธ์
        if (result.rows?.[0]?.[0]?.length > 0) {
          const data = result.rows[0][0][0];
          const BOX_NO = data?.[0] ;
          const PACKING_NO = data?.[1] ;
          item.BOX_PACK = `Box ${BOX_NO} Pack ${PACKING_NO}`;
        } 
        else{
          item.BOX_PACK = ``;
        }
      }
  
      console.log(dtSerial, "Updated dtSerial");
      res.status(200).json(dtSerial);
    } catch (error) {
      console.error("Error occurred:", error.message);
      writeLogError(error.message, query);
      res.status(500).json({ message: "An error occurred: " + error.message });
    } finally {
      if (connection) {
        await DisconnectOracleDB(connection);
      }
    }
  };
  