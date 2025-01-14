const {
  ConnectPG_DB,
  DisconnectPG_DB,
  ConnectOracleDB,
  DisconnectOracleDB,
} = require("../Conncetion/DBConn.cjs");
const { writeLogError } = require("../Common/LogFuction.cjs");
const oracledb = require("oracledb");

module.exports.GetserialnoChangserial = async function (req, res) {
  const { dataList } = req.body;

  const json_convertdata = JSON.stringify(dataList);
  var query = "";
  try {
    const client = await ConnectPG_DB();
    query += `SELECT "Traceability".trc_028_changserial_getserialno('[${json_convertdata}]')`;
    const result = await client.query(query);

      res.status(200).json(result.rows);
      DisconnectPG_DB(client);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

module.exports.GetserialnoChangserialoldnew = async function (req, res) {
  const { dataList } = req.body;

  const json_convertdata = JSON.stringify(dataList);
  var query = "";
  try {
    const client = await ConnectPG_DB();

    query += `CALL "Traceability".trc_028_changserial_getserialnooldnew('[${json_convertdata}]','','','{}');`;
    const result = await client.query(query);
      res.status(200).json(result.rows);
      DisconnectPG_DB(client);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

module.exports.SetserialnoChangserial = async function (req, res) {
  const { dataList } = req.body;
  const json_convertdata = JSON.stringify(dataList);

  var query = "";
  try {
    const client = await ConnectPG_DB();
    const { dataList } = req.body;
    const json_convertdata = JSON.stringify(dataList);
     query += `CALL "Traceability".trc_028_changserial_insertandupdateserialno('[${json_convertdata}]','')`;
    const result = await client.query(query);

    if (result.rows.length > 0) {
      res.status(200).json(result.rows);
      DisconnectPG_DB(client);
    }
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};


