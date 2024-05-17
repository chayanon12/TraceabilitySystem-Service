const {
  ConnectPG_DB,
  DisconnectPG_DB,
  ConnectOracleDB,
  DisconnectOracleDB,
} = require("../Conncetion/DBConn.cjs");

module.exports.getFactory = async function (req, res) {
  try {
    let query = "";
    query += 'SELECT factory_code, factory_desc ';
    query += 'FROM "public".fpc_factory ';
    query += 'ORDER BY factory_desc ';

    const client = await ConnectPG_DB();
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.json(result.rows);
  } catch (error) {
    console.error("ข้อผิดพลาดในการค้นหาข้อมูล:", error.message);
    res.status(500).send("Internal Server Error");
  }
};


module.exports.getSerialStructure = async function (req, res) {
  try {
    let query = "";
    query += 'SELECT tssm_sn_struc_code, tssm_sn_struc_name ';
    query += 'FROM "Traceability"."trc_serial_structure_mst" ';
    query += 'ORDER BY tssm_sn_struc_name ';

    const client = await ConnectPG_DB();
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.json(result.rows);
  } catch (error) {
    console.error("ข้อผิดพลาดในการค้นหาข้อมูล:", error.message);
    res.status(500).send("Internal Server Error");
  }
};


module.exports.getSheetStructure = async function (req, res) {
  try {
    let query = "";
    query += 'SELECT tstm_sht_struc_code, tstm_sht_struc_name ';
    query += 'FROM "Traceability"."trc_sheet_structure_mst" ';
    query += 'ORDER BY tstm_sht_struc_name ';

    const client = await ConnectPG_DB();
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.json(result.rows);
  } catch (error) {
    console.error("ข้อผิดพลาดในการค้นหาข้อมูล:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

module.exports.getSheetType = async function (req, res) {
  try {
    let query = "";
    query += 'SELECT tstm_code, tstm_name ';
    query += 'FROM "Traceability"."trc_sheet_type_mst" ';
    query += 'ORDER BY tstm_name ';

    const client = await ConnectPG_DB();
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.json(result.rows);
  } catch (error) {
    console.error("ข้อผิดพลาดในการค้นหาข้อมูล:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

module.exports.getProceesControl = async function (req, res) {
  try {
    let query = "";
    query += 'SELECT tpct_code, tpct_name ';
    query += 'FROM "Traceability"."trc_process_control_time_mst" ';
    query += 'ORDER BY tpct_name ';
    
    const client = await ConnectPG_DB();
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.json(result.rows);
  } catch (error) {
    console.error("ข้อผิดพลาดในการค้นหาข้อมูล:", error.message);
    res.status(500).send("Internal Server Error");
  }
};
