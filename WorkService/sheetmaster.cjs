const {
  ConnectPG_DB,
  DisconnectPG_DB,
  ConnectOracleDB,
  DisconnectOracleDB,
} = require("../Conncetion/DBConn.cjs");
const { writeLogError } = require("../Common/LogFuction.cjs");

module.exports.postCodeName = async function (req, res) {
  //app.post("/search/CodeName", async (req, res) => {

  try {
    const p_datasearch = JSON.stringify(req.body);
    let query = "";
    query = ` SELECT * FROM "Traceability".trc_005_sheet_master_search('${p_datasearch}'); `;
    const client = await ConnectPG_DB();
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json(result.rows);
  } catch (err) {
    writeLogError(err.message, query);
    res.status(500).json({ message: err.message });
  }
};

module.exports.insertSheet_Master = async function (req, res) {
  
  try {
    let query = "";
    const p_data = JSON.stringify(req.body);
    query = `CALL "Traceability".trc_005_sheet_master_insert('${p_data}');`;
    const client = await ConnectPG_DB();
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json(result.rows);
  } catch (err) {
    writeLogError(err.message, query);
    res.status(500).json({ message: err.message });
  }
};

module.exports.updateSheet_Master = async function (req, res) {

  try {
    let query = "";
    const p_data = JSON.stringify(req.body);
    query = `CALL "Traceability".trc_005_sheet_master_update('${p_data}');`;
    const client = await ConnectPG_DB();
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json(result.rows);
  } catch (err) {
    writeLogError(err.message, query);
    res.status(500).json({ message: err.message });
  }
};

module.exports.delSheet_Master = async function (req, res) {

  try {
    let query = "";
    const p_datadel = JSON.stringify(req.body);
    query = `CALL "Traceability".trc_005_sheet_master_delete('${p_datadel}');`;
    const client = await ConnectPG_DB();
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json(result.rows);
  } catch (err) {
    writeLogError(err.message, query);
    res.status(500).json({ message: err.message });
  }

};

module.exports.postSHTCode = async function (req, res) {

  try {
    let query = "";
    query = `
       SELECT * FROM "Traceability".trc_005_sheet_master_genrunningcode();
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