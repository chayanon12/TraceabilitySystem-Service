const {
    ConnectPG_DB,
    DisconnectPG_DB,
    ConnectOracleDB,
    DisconnectOracleDB,
  } = require("../Conncetion/DBConn.cjs");
  const { writeLogError } = require("../Common/LogFuction.cjs");

  module.exports.SearchDataRecord = async function (req, res) {
    console.log("เข้าจ้า")
    var query = "";
    try {
        const {dataList} = req.body;
          const client = await ConnectPG_DB();
          const json_convertdata = JSON.stringify(dataList);
        console.log(dataList,": dataList")
          query += ` SELECT * from "Traceability".trc_030_getsearchdata_record('[${json_convertdata}]')`;
          const result = await client.query(query);
          res.status(200).json(result.rows);
          console.log(query,"result")
          console.log(result.rows,"เข้าแล้ววว")
          await DisconnectPG_DB(client);
        } catch (error) {
          writeLogError(error.message, query);
          res.status(500).json({ message: error.message });
        }
  };
  module.exports.SetInsert_SerialConfirm = async function (req, res) {
    let Conn;
    let _strErrorAll = "";
    try {
        // เชื่อมต่อกับฐานข้อมูล PostgreSQL
        Conn = await ConnectPG_DB();
        const { dataList } = req.body;
        const json_convertdata = JSON.stringify(dataList);
        console.log(json_convertdata,"json_convertdata")

        // เรียกใช้ PROCEDURE ใน PostgreSQL
        const result = await Conn.query(
            `CALL "Traceability".trc_030_insert($1::jsonb, $2);`, [json_convertdata, ''] 
        );

        // ตรวจสอบค่าผลลัพธ์ p_error จาก result
        console.log(result,"result")
        _strErrorAll = result.rows[0] ? result.rows[0].p_error : ''; // ดึงค่าจาก p_error

        res.status(200).json(_strErrorAll);
    } catch (error) {
        writeLogError(error.message, '');
        res.status(500).json({ message: 'Internal server error', error: error.message });
    } finally {
        if (Conn) {
            try {
                await DisconnectOracleDB(Conn);
            } catch (closeError) {
                console.error('Failed to close the database connection:', closeError.message);
            }
        }
    }
};
