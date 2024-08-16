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
  try {
    const p_data = JSON.stringify(req.body);
    query = `CALL "Traceability".trc_002_product_master_insert('${p_data}');`;
    const client = await ConnectPG_DB();
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json(result.rows);
  } catch (err) {
    writeLogError(err.message, query);
    res.status(500).json({ message: err.message });
  }
};

// module.exports.updateProduct_Master = async function (req, res) {
//   try {

//     const {
//       p_tpm_factory,
//       p_tpm_product_name,
//       p_tpm_update_count,
//       p_tpm_config_code,
//       p_tpm_start_seq_serial,
//       p_tpm_start_seq_code,
//       p_tpm_product_status,
//       p_tpm_date_inproc_flg,
//       p_tpm_date_inproc,
//       p_tpm_pcs_per_sht_efpc,
//       p_tpm_pcs_per_sht_smt,
//       p_tpm_serial_file_format,
//       p_tpm_serial_side,
//       p_tpm_serial_structure,
//       p_tpm_barcode_req_lot,
//       p_tpm_barcode_grade,
//       p_tpm_sht_file_format,
//       p_tpm_sht__structure,
//       p_tpm_sht_type,
//       p_tpm_sht_per_lot_efpc,
//       p_tpm_sht_per_lot_smt,
//       p_tpm_sht_per_scan,
//       p_tpm_sht_per_laser,
//       p_tpm_sht_model_code,
//       p_tpm_sht_check_prd_flag,
//       p_tpm_sht_check_lot_flag,
//       p_tpm_sht_xray_1_time_flg,
//       p_tpm_sht_plasma_time_flg,
//       p_tpm_sht_plasma_time,
//       p_tpm_conn_roll_sht_flg,
//       p_tpm_conn_roll_sht_length,
//       p_tpm_conn_roll_leaf_flg,
//       p_tpm_conn_roll_length,
//       p_tpm_conn_leaf_length,
//       p_tpm_conn_roll_prd_flg,
//       p_tpm_conn_roll_prd_start,
//       p_tpm_conn_roll_prd_end,
//       p_tpm_conn_roll_serial_flg,
//       p_tpm_conn_roll_leaf_scan,
//       p_tpm_conn_roll_req_lot_sht,
//       p_tpm_conn_roll_lot_sht_start,
//       p_tpm_conn_roll_lot_sht_end,
//       p_tpm_conn_roll_req_prd_sht,
//       p_tpm_conn_roll_prd_sht_start,
//       p_tpm_conn_roll_prd_sht_end,
//       p_tpm_conn_roll_prd_fix,
//       p_tpm_conn_sht_control_time_flg,
//       p_tpm_conn_sht_control_time,
//       p_tpm_conn_sht_checksum_flg,
//       p_tpm_conn_sht_plasma_time_flg,
//       p_tpm_conn_sht_plasma_time,
//       p_tpm_conn_sht_check_weekcode_flg,
//       p_tpm_conn_sht_mix_lot_flg,
//       p_tpm_conn_sht_mix_product_flg,
//       p_tpm_proc_control_time_flg,
//       p_tpm_proc_control_time,
//       p_tpm_fin_pcs_per_tray,
//       p_tpm_fin_pcs_per_scan,
//       p_tpm_fin_pack_group_flg,
//       p_tpm_fin_check_weekcode_flg,
//       p_tpm_fin_pds_time_skip_elt,
//       p_tpm_fin_pds_time_hide_time,
//       p_tpm_fin_pds_time_flg,
//       p_tpm_fin_pds_time,
//       p_tpm_fin_pds_time_by,
//       p_tpm_fin_pds_time_confirm_flg,
//       p_tpm_fin_conn_sht_flg,
//       p_tpm_fin_mix_lot_flg,
//       p_tpm_fin_mix_product_flg,
//       p_tpm_fin_checksum_flg,
//       p_tpm_fin_chip_id_flg,
//       p_tpm_create_by,
//       p_tpm_create_program,
//       p_tpm_update_by,
//       p_tpm_update_program,
//     } = req.body;

//     query = ` CALL "Traceability".trc_002_product_master_update(
//     '${p_tpm_factory}', 
//     '${p_tpm_product_name}', 
//     ${p_tpm_update_count}, 
//     '${p_tpm_config_code}', 
//     ${p_tpm_start_seq_serial}, 
//     '${p_tpm_start_seq_code}', 
//     '${p_tpm_product_status}', 
//     '${p_tpm_date_inproc_flg}', 
//     ${p_tpm_date_inproc ? `'${p_tpm_date_inproc}'` : null},
//     ${p_tpm_pcs_per_sht_efpc}, 
//     ${p_tpm_pcs_per_sht_smt}, 
//     '${p_tpm_serial_file_format}', 
//     '${p_tpm_serial_side}', 
//     '${p_tpm_serial_structure}', 
//     '${p_tpm_barcode_req_lot}', 
//     ${p_tpm_barcode_grade ? `'${p_tpm_barcode_grade}'` : null},
//     '${p_tpm_sht_file_format}', 
//     '${p_tpm_sht__structure}', 
//     '${p_tpm_sht_type}',
//     ${p_tpm_sht_per_lot_efpc}, 
//     ${p_tpm_sht_per_lot_smt}, 
//     ${p_tpm_sht_per_scan}, 
//     ${p_tpm_sht_per_laser}, 
//     '${p_tpm_sht_model_code}', 
//     '${p_tpm_sht_check_prd_flag}', 
//     '${p_tpm_sht_check_lot_flag}', 
//     '${p_tpm_sht_xray_1_time_flg}', 
//     '${p_tpm_sht_plasma_time_flg}', 
//     ${p_tpm_sht_plasma_time}, 
//     '${p_tpm_conn_roll_sht_flg}', 
//     ${p_tpm_conn_roll_sht_length}, 
//     '${p_tpm_conn_roll_leaf_flg}', 
//     ${p_tpm_conn_roll_length}, 
//     ${p_tpm_conn_leaf_length}, 
//     '${p_tpm_conn_roll_prd_flg}', 
//     ${p_tpm_conn_roll_prd_start}, 
//     ${p_tpm_conn_roll_prd_end}, 
//     '${p_tpm_conn_roll_serial_flg}', 
//     ${p_tpm_conn_roll_leaf_scan}, 
//     '${p_tpm_conn_roll_req_lot_sht}', 
//     ${p_tpm_conn_roll_lot_sht_start}, 
//     ${p_tpm_conn_roll_lot_sht_end}, 
//     '${p_tpm_conn_roll_req_prd_sht}', 
//     ${p_tpm_conn_roll_prd_sht_start}, 
//     ${p_tpm_conn_roll_prd_sht_end}, 
//     '${p_tpm_conn_roll_prd_fix}', 
//     '${p_tpm_conn_sht_control_time_flg}', 
//     ${p_tpm_conn_sht_control_time}, 
//     '${p_tpm_conn_sht_checksum_flg}', 
//     '${p_tpm_conn_sht_plasma_time_flg}', 
//     ${p_tpm_conn_sht_plasma_time}, 
//     '${p_tpm_conn_sht_check_weekcode_flg}', 
//     '${p_tpm_conn_sht_mix_lot_flg}', 
//     '${p_tpm_conn_sht_mix_product_flg}', 
//     '${p_tpm_proc_control_time_flg}', 
//     ${p_tpm_proc_control_time}, 
//     ${p_tpm_fin_pcs_per_tray}, 
//     ${p_tpm_fin_pcs_per_scan}, 
//     '${p_tpm_fin_pack_group_flg}', 
//     '${p_tpm_fin_check_weekcode_flg}', 
//     '${p_tpm_fin_pds_time_skip_elt}', 
//     '${p_tpm_fin_pds_time_hide_time}', 
//     '${p_tpm_fin_pds_time_flg}', 
//     ${p_tpm_fin_pds_time}, 
//     '${p_tpm_fin_pds_time_by}', 
//     '${p_tpm_fin_pds_time_confirm_flg}', 
//     '${p_tpm_fin_conn_sht_flg}', 
//     '${p_tpm_fin_mix_lot_flg}', 
//     '${p_tpm_fin_mix_product_flg}', 
//     '${p_tpm_fin_checksum_flg}', 
//     '${p_tpm_fin_chip_id_flg}', 
//     '${p_tpm_create_by}', 
//     '${p_tpm_create_program}', 
//     current_timestamp, 
//     '${p_tpm_update_by}', 
//     '${p_tpm_update_program}', 
//     current_timestamp 
//   );
// `;

//     const client = await ConnectPG_DB();
//     const result = await client.query(query);
//     await DisconnectPG_DB(client);
//     res.status(200).json(result.rows);
//   } catch (err) {
//     writeLogError(err.message, query);
//     res.status(500).json({ message: err.message });
//   }
// };

module.exports.updateProduct_Master = async function (req, res) {
  try {

    const p_data = JSON.stringify(req.body);

    query = `CALL "Traceability".trc_002_product_master_update('${p_data}');`;

    const client = await ConnectPG_DB();
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json(result.rows);
  } catch (err) {
    writeLogError(err.message, query);
    res.status(500).json({ message: err.message });
  }
};

module.exports.deleteProduct_Master = async function (req, res) {
  try {
    const p_datadel = JSON.stringify(req.body);
    query = `
       CALL "Traceability".trc_002_product_master_delete('${p_datadel}')
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
