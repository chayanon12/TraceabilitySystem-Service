const {
  ConnectPG_DB,
  DisconnectPG_DB,
  ConnectOracleDB,
  DisconnectOracleDB,
} = require("../Conncetion/DBConn.cjs");
const { writeLogError } = require("../Common/LogFuction.cjs");

module.exports.getdatatable = async function (req, res) {
  let query = "";
  try {
    const p_data = JSON.stringify(req.body);
    query = ` SELECT * FROM "Traceability".trc_002_product_master_getdatatable('${p_data}'); `;
    const client = await ConnectPG_DB();
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    writeLogError(err.message, query);
    res.status(500).json({ message: err.message });
  }
};


module.exports.getupdatecount = async function (req, res) {
  let query = "";
  try {
    const p_data = JSON.stringify(req.body);
    query = ` SELECT * FROM "Traceability".trc_002_product_master_getupdatecount('${p_data}'); `;

    const client = await ConnectPG_DB();
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    writeLogError(err.message, query);
    res.status(500).json({ message: err.message });
  }
};

module.exports.insertProduct_Master = async function (req, res) {
  let query = "";
  try {
    const p_data = JSON.stringify(req.body);
    query = `CALL "Traceability".trc_002_product_master_insert('${p_data}');`;
    const client = await ConnectPG_DB();
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    writeLogError(err.message, query);
    res.status(500).json({ message: err.message });
  }
};


module.exports.updateProduct_Master = async function (req, res) {
  let query = "";
  try {

    const p_data = JSON.stringify(req.body);

    query = `CALL "Traceability".trc_002_product_master_update('${p_data}');`;

    const client = await ConnectPG_DB();
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    writeLogError(err.message, query);
    res.status(500).json({ message: err.message });
  }
};
