const {
  ConnectPG_DB,
  DisconnectPG_DB,
  ConnectOracleDB,
  DisconnectOracleDB,
} = require("../Conncetion/DBConn.cjs");

module.exports.searchFactory = async function (req, res) {
  try {
    let query = "";
    const { Factory, Product } = req.body;
    query += 'select ';
    query += '	tpm_factory, ';
    query += '	tpm_product_name, ';
    query += '	tpm_update_count, ';
    query += '	tpm_config_code, ';
    query += '	tpm_start_seq_serial, ';
    query += '	tpm_start_seq_code, ';
    query += '	tpm_product_status, ';
    query += '	tpm_date_inproc_flg, ';
    query += '	tpm_date_inproc, ';
    query += '	tpm_pcs_per_sht_efpc, ';
    query += '	tpm_pcs_per_sht_smt, ';
    query += '	tpm_serial_file_format, ';
    query += '	tpm_serial_side, ';
    query += '	tpm_serial_structure, ';
    query += '	tpm_barcode_req_lot, ';
    query += '	tpm_barcode_grade, ';
    query += '	tpm_sht_file_format, ';
    query += '	tpm_sht__structure, ';
    query += '	tpm_sht_type, ';
    query += '	tpm_sht_per_lot_efpc, ';
    query += '	tpm_sht_per_lot_smt, ';
    query += '	tpm_sht_per_scan, ';
    query += '	tpm_sht_per_laser, ';
    query += '	tpm_sht_model_code, ';
    query += '	tpm_sht_check_prd_flag, ';
    query += '	tpm_sht_check_lot_flag, ';
    query += '	tpm_sht_xray_1_time_flg, ';
    query += '	tpm_sht_plasma_time_flg, ';
    query += '	tpm_sht_plasma_time, ';
    query += '	tpm_conn_roll_sht_flg, ';
    query += '	tpm_conn_roll_sht_length, ';
    query += '	tpm_conn_roll_leaf_flg, ';
    query += '	tpm_conn_roll_length, ';
    query += '	tpm_conn_leaf_length, ';
    query += '	tpm_conn_roll_prd_flg, ';
    query += '	tpm_conn_roll_prd_start, ';
    query += '	tpm_conn_roll_prd_end, ';
    query += '	tpm_conn_roll_serial_flg, ';
    query += '	tpm_conn_roll_leaf_scan, ';
    query += '	tpm_conn_roll_req_lot_sht, ';
    query += '	tpm_conn_roll_lot_sht_start, ';
    query += '	tpm_conn_roll_lot_sht_end, ';
    query += '	tpm_conn_roll_req_prd_sht, ';
    query += '	tpm_conn_roll_prd_sht_start, ';
    query += '	tpm_conn_roll_prd_sht_end, ';
    query += '	tpm_conn_roll_prd_fix, ';
    query += '	tpm_conn_sht_control_time_flg, ';
    query += '	tpm_conn_sht_control_time, ';
    query += '	tpm_conn_sht_checksum_flg, ';
    query += '	tpm_conn_sht_plasma_time_flg, ';
    query += '	tpm_conn_sht_plasma_time, ';
    query += '	tpm_conn_sht_check_weekcode_flg, ';
    query += '	tpm_conn_sht_mix_lot_flg, ';
    query += '	tpm_conn_sht_mix_product_flg, ';
    query += '	tpm_proc_control_time_flg, ';
    query += '	tpm_proc_control_time, ';
    query += '	tpm_fin_pcs_per_tray, ';
    query += '	tpm_fin_pcs_per_scan, ';
    query += '	tpm_fin_pack_group_flg, ';
    query += '	tpm_fin_check_weekcode_flg, ';
    query += '	tpm_fin_pds_time_skip_elt, ';
    query += '	tpm_fin_pds_time_hide_time, ';
    query += '	tpm_fin_pds_time_flg, ';
    query += '	tpm_fin_pds_time, ';
    query += '	tpm_fin_pds_time_by, ';
    query += '	tpm_fin_pds_time_confirm_flg, ';
    query += '	tpm_fin_conn_sht_flg, ';
    query += '	tpm_fin_mix_lot_flg, ';
    query += '	tpm_fin_mix_product_flg, ';
    query += '	tpm_fin_checksum_flg, ';
    query += '	tpm_fin_chip_id_flg ';
    query += 'FROM ';
    query += '	"Traceability".trc_product_mst ';
    query += 'WHERE ';
    query += `   tpm_factory like '${Factory}' || '%' `;
    query += `and tpm_product_name like '${Product}' || '%' `;
    query += 'ORDER BY ';
    query += '   tpm_factory, ';
    query += '   tpm_product_name; ';

    const client = await ConnectPG_DB();
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.json(result.rows);
  } catch (error) {
    console.error("ข้อผิดพลาดในการค้นหาข้อมูล:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

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
