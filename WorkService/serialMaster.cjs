const {
  ConnectPG_DB,
  DisconnectPG_DB,
  ConnectOracleDB,
  DisconnectOracleDB,
} = require("../Conncetion/DBConn.cjs");
const { writeLogError } = require("../Common/LogFuction.cjs");

module.exports.SerialCodeName = async function (req, res) {
  try {
    const p_data = JSON.stringify(req.body);
    let query = "";
    query = ` SELECT * FROM "Traceability".trc_004_serial_master_search('${p_data}'); `;
    const client = await ConnectPG_DB();
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json(result.rows);
  } catch (err) {
    writeLogError(err.message, query);
    res.status(500).json({ message: err.message });
  }
};

module.exports.insertSerial_Master = async function (req, res) {
  try {
    let query = "";
    const p_data = JSON.stringify(req.body);
    query = `CALL "Traceability".trc_004_serial_master_insert('${p_data}');`;
    const client = await ConnectPG_DB();
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json(result.rows);
  } catch (err) {
    writeLogError(err.message, query);
    res.status(500).json({ message: err.message });
  }
};

module.exports.updateSerial_Master = async function (req, res) {
  try {
    let query = "";
    const p_data = JSON.stringify(req.body);
    query = `CALL "Traceability".trc_004_serial_master_update('${p_data}');`;
    const client = await ConnectPG_DB();
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json(result.rows);
  } catch (err) {
    writeLogError(err.message, query);
    res.status(500).json({ message: err.message });
  }
};

module.exports.delSerial_Master = async function (req, res) {
  try {
    let query = "";
    const p_datadel = JSON.stringify(req.body);
    query = `
       CALL "Traceability".trc_004_serial_master_delete('${p_datadel}')
    `;
    const client = await ConnectPG_DB();
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json(result.rows);
  } catch (err) {
    writeLogError(err.message, query);
    res.status(500).json({ message: err.message });
  }
};

module.exports.runningCode = async function (req, res) {

  try {
    let query = "";
    query = `
       SELECT * FROM "Traceability".trc_004_serial_master_genrunningcode();
    `;
    const client = await ConnectPG_DB();
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json(result.rows);
  } catch (err) {
    writeLogError(err.message, query);
    res.status(500).json({ message: err.message });
  }

};
