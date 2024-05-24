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
    res.status(500).json({ message: error.message });
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
    res.status(500).json({ message: error.message });
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
    res.status(500).json({ message: error.message });
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
    res.status(500).json({ message: error.message });
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
    res.status(500).json({ message: error.message });
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
    res.status(500).json({ message: error.message });
  }
};

module.exports.insertProduct_Master = async function (req, res) {
  try {
    const {
      tpm_factory,
      tpm_product_name,
      tpm_update_count,
      tpm_config_code,
      tpm_start_seq_serial,
      tpm_start_seq_code,
      tpm_product_status,
      tpm_date_inproc_flg,
      tpm_date_inproc,
      tpm_pcs_per_sht_efpc,
      tpm_pcs_per_sht_smt,
      tpm_serial_file_format,
      tpm_serial_side,
      tpm_serial_structure,
      tpm_barcode_req_lot,
      tpm_barcode_grade,
      tpm_sht_file_format,
      tpm_sht__structure,
      tpm_sht_type,
      tpm_sht_per_lot_efpc,
      tpm_sht_per_lot_smt,
      tpm_sht_per_scan,
      tpm_sht_per_laser,
      tpm_sht_model_code,
      tpm_sht_check_prd_flag,
      tpm_sht_check_lot_flag,
      tpm_sht_xray_1_time_flg,
      tpm_sht_plasma_time_flg,
      tpm_sht_plasma_time,
      tpm_conn_roll_sht_flg,
      tpm_conn_roll_sht_length,
      tpm_conn_roll_leaf_flg,
      tpm_conn_roll_length,
      tpm_conn_leaf_length,
      tpm_conn_roll_prd_flg,
      tpm_conn_roll_prd_start,
      tpm_conn_roll_prd_end,
      tpm_conn_roll_serial_flg,
      tpm_conn_roll_leaf_scan,
      tpm_conn_roll_req_lot_sht,
      tpm_conn_roll_lot_sht_start,
      tpm_conn_roll_lot_sht_end,
      tpm_conn_roll_req_prd_sht,
      tpm_conn_roll_prd_sht_start,
      tpm_conn_roll_prd_sht_end,
      tpm_conn_roll_prd_fix,
      tpm_conn_sht_control_time_flg,
      tpm_conn_sht_control_time,
      tpm_conn_sht_checksum_flg,
      tpm_conn_sht_plasma_time_flg,
      tpm_conn_sht_plasma_time,
      tpm_conn_sht_check_weekcode_flg,
      tpm_conn_sht_mix_lot_flg,
      tpm_conn_sht_mix_product_flg,
      tpm_proc_control_time_flg,
      tpm_proc_control_time,
      tpm_fin_pcs_per_tray,
      tpm_fin_pcs_per_scan,
      tpm_fin_pack_group_flg,
      tpm_fin_check_weekcode_flg,
      tpm_fin_pds_time_skip_elt,
      tpm_fin_pds_time_hide_time,
      tpm_fin_pds_time_flg,
      tpm_fin_pds_time,
      tpm_fin_pds_time_by,
      tpm_fin_pds_time_confirm_flg,
      tpm_fin_conn_sht_flg,
      tpm_fin_mix_lot_flg,
      tpm_fin_mix_product_flg,
      tpm_fin_checksum_flg,
      tpm_fin_chip_id_flg,
      tpm_create_by,
      tpm_create_program,
      tpm_update_by,
      tpm_update_program
    } = req.body;
    console.log("มาา",tpm_factory)
    let query = "";
    query += 'INSERT ';
    query += 'INTO ';
    query += '"Traceability".trc_product_mst ';
    query += '(tpm_factory, ';
    query += 'tpm_product_name, ';
    query += 'tpm_update_count, ';
    query += 'tpm_config_code, ';
    query += 'tpm_start_seq_serial, ';
    query += 'tpm_start_seq_code, ';
    query += 'tpm_product_status, ';
    query += 'tpm_date_inproc_flg, ';
    query += 'tpm_date_inproc, ';
    query += 'tpm_pcs_per_sht_efpc, ';
    query += 'tpm_pcs_per_sht_smt, ';
    query += 'tpm_serial_file_format, ';
    query += 'tpm_serial_side, ';
    query += 'tpm_serial_structure, ';
    query += 'tpm_barcode_req_lot, ';
    query += 'tpm_barcode_grade, ';
    query += 'tpm_sht_file_format, ';
    query += 'tpm_sht__structure, ';
    query += 'tpm_sht_type, ';
    query += 'tpm_sht_per_lot_efpc, ';
    query += 'tpm_sht_per_lot_smt, ';
    query += 'tpm_sht_per_scan, ';
    query += 'tpm_sht_per_laser, ';
    query += 'tpm_sht_model_code, ';
    query += 'tpm_sht_check_prd_flag, ';
    query += 'tpm_sht_check_lot_flag, ';
    query += 'tpm_sht_xray_1_time_flg, ';
    query += 'tpm_sht_plasma_time_flg, ';
    query += 'tpm_sht_plasma_time, ';
    query += 'tpm_conn_roll_sht_flg, ';
    query += 'tpm_conn_roll_sht_length, ';
    query += 'tpm_conn_roll_leaf_flg, ';
    query += 'tpm_conn_roll_length, ';
    query += 'tpm_conn_leaf_length, ';
    query += 'tpm_conn_roll_prd_flg, ';
    query += 'tpm_conn_roll_prd_start, ';
    query += 'tpm_conn_roll_prd_end, ';
    query += 'tpm_conn_roll_serial_flg, ';
    query += 'tpm_conn_roll_leaf_scan, ';
    query += 'tpm_conn_roll_req_lot_sht, ';
    query += 'tpm_conn_roll_lot_sht_start, ';
    query += 'tpm_conn_roll_lot_sht_end, ';
    query += 'tpm_conn_roll_req_prd_sht, ';
    query += 'tpm_conn_roll_prd_sht_start, ';
    query += 'tpm_conn_roll_prd_sht_end, ';
    query += 'tpm_conn_roll_prd_fix, ';
    query += 'tpm_conn_sht_control_time_flg, ';
    query += 'tpm_conn_sht_control_time, ';
    query += 'tpm_conn_sht_checksum_flg, ';
    query += 'tpm_conn_sht_plasma_time_flg, ';
    query += 'tpm_conn_sht_plasma_time, ';
    query += 'tpm_conn_sht_check_weekcode_flg, ';
    query += 'tpm_conn_sht_mix_lot_flg, ';
    query += 'tpm_conn_sht_mix_product_flg, ';
    query += 'tpm_proc_control_time_flg, ';
    query += 'tpm_proc_control_time, ';
    query += 'tpm_fin_pcs_per_tray, ';
    query += 'tpm_fin_pcs_per_scan, ';
    query += 'tpm_fin_pack_group_flg, ';
    query += 'tpm_fin_check_weekcode_flg, ';
    query += 'tpm_fin_pds_time_skip_elt, ';
    query += 'tpm_fin_pds_time_hide_time, ';
    query += 'tpm_fin_pds_time_flg, ';
    query += 'tpm_fin_pds_time, ';
    query += 'tpm_fin_pds_time_by, ';
    query += 'tpm_fin_pds_time_confirm_flg, ';
    query += 'tpm_fin_conn_sht_flg, ';
    query += 'tpm_fin_mix_lot_flg, ';
    query += 'tpm_fin_mix_product_flg, ';
    query += 'tpm_fin_checksum_flg, ';
    query += 'tpm_fin_chip_id_flg, ';
    query += 'tpm_create_by, ';
    query += 'tpm_create_program, ';
    query += 'tpm_create_date, ';
    query += 'tpm_update_by, ';
    query += 'tpm_update_program, ';
    query += 'tpm_update_date) ';
    query += `VALUES('${tpm_factory}', `;
    query += `'${tpm_product_name}', `;
    query += `${tpm_update_count}, `;
    query += `'${tpm_config_code}', `;
    query += `${tpm_start_seq_serial}, `;
    query += `'${tpm_start_seq_code}', `;
    query += `'${tpm_product_status}', `;
    query += `'${tpm_date_inproc_flg}', `;
    query += `${tpm_date_inproc}, `;
    query += `${tpm_pcs_per_sht_efpc}, `;
    query += `${tpm_pcs_per_sht_smt}, `;
    query += `'${tpm_serial_file_format}', `;
    query += `'${tpm_serial_side}', `;
    query += `'${tpm_serial_structure}', `;
    query += `'${tpm_barcode_req_lot}', `;
    query += `'${tpm_barcode_grade}', `;
    query += `'${tpm_sht_file_format}', `;
    query += `'${tpm_sht__structure}', `;
    query += `'${tpm_sht_type}', `;
    query += `${tpm_sht_per_lot_efpc}, `;
    query += `${tpm_sht_per_lot_smt}, `;
    query += `${tpm_sht_per_scan}, `;
    query += `${tpm_sht_per_laser}, `;
    query += `'${tpm_sht_model_code}', `;
    query += `'${tpm_sht_check_prd_flag}', `;
    query += `'${tpm_sht_check_lot_flag}', `;
    query += `'${tpm_sht_xray_1_time_flg}', `;
    query += `'${tpm_sht_plasma_time_flg}', `;
    query += `${tpm_sht_plasma_time}, `;
    query += `'${tpm_conn_roll_sht_flg}', `;
    query += `${tpm_conn_roll_sht_length}, `;
    query += `'${tpm_conn_roll_leaf_flg}', `;
    query += `${tpm_conn_roll_length}, `;
    query += `${tpm_conn_leaf_length}, `;
    query += `'${tpm_conn_roll_prd_flg}', `;
    query += `${tpm_conn_roll_prd_start}, `;
    query += `${tpm_conn_roll_prd_end}, `;
    query += `'${tpm_conn_roll_serial_flg}', `;
    query += `${tpm_conn_roll_leaf_scan}, `;
    query += `'${tpm_conn_roll_req_lot_sht}', `;
    query += `${tpm_conn_roll_lot_sht_start}, `;
    query += `${tpm_conn_roll_lot_sht_end}, `;
    query += `'${tpm_conn_roll_req_prd_sht}', `;
    query += `${tpm_conn_roll_prd_sht_start}, `;
    query += `${tpm_conn_roll_prd_sht_end}, `;
    query += `'${tpm_conn_roll_prd_fix}', `;
    query += `'${tpm_conn_sht_control_time_flg}', `;
    query += `${tpm_conn_sht_control_time}, `;
    query += `'${tpm_conn_sht_checksum_flg}', `;
    query += `'${tpm_conn_sht_plasma_time_flg}', `;
    query += `${tpm_conn_sht_plasma_time}, `;
    query += `'${tpm_conn_sht_check_weekcode_flg}', `;
    query += `'${tpm_conn_sht_mix_lot_flg}', `;
    query += `'${tpm_conn_sht_mix_product_flg}', `;
    query += `'${tpm_proc_control_time_flg}', `;
    query += `${tpm_proc_control_time}, `;
    query += `${tpm_fin_pcs_per_tray}, `;
    query += `${tpm_fin_pcs_per_scan}, `;
    query += `'${tpm_fin_pack_group_flg}', `;
    query += `'${tpm_fin_check_weekcode_flg}', `;
    query += `'${tpm_fin_pds_time_skip_elt}', `;
    query += `'${tpm_fin_pds_time_hide_time}', `;
    query += `'${tpm_fin_pds_time_flg}', `;
    query += `${tpm_fin_pds_time}, `;
    query += `'${tpm_fin_pds_time_by}', `;
    query += `'${tpm_fin_pds_time_confirm_flg}', `;
    query += `'${tpm_fin_conn_sht_flg}', `;
    query += `'${tpm_fin_mix_lot_flg}', `;
    query += `'${tpm_fin_mix_product_flg}', `;
    query += `'${tpm_fin_checksum_flg}', `;
    query += `'${tpm_fin_chip_id_flg}', `;
    query += `'${tpm_create_by}', `;
    query += `'${tpm_create_program}', `;
    query += 'current_timestamp, ';
    query += `'${tpm_update_by}', `;
    query += `'${tpm_update_program}', `;
    query += 'current_timestamp) ';

    const client = await ConnectPG_DB();
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
