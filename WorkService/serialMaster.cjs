const {
  ConnectPG_DB,
  DisconnectPG_DB,
  ConnectOracleDB,
  DisconnectOracleDB,
} = require("../Conncetion/DBConn.cjs");

module.exports.SerialCodeName = async function (req, res) {
  const { Code, Name } = req.body;
  if (Code != undefined && Name != undefined) {
    const searchQuery = `
      select
      tssm_sn_struc_code,
      tssm_sn_struc_name,
      tssm_sn_struc_upcount,
      tssm_sn_length,
      tssm_plant_flag,
      tssm_plant_code,
      tssm_plant_start_digit,
      tssm_plant_end_digit,
      tssm_week_flag,
      tssm_week_code,
      tssm_week_start_digit,
      tssm_week_end_digit,
      tssm_week_convert,
      tssm_week_convert_base,
      tssm_seq_flag,
      tssm_seq_format,
      tssm_seq_start_digit,
      tssm_seq_end_digit,
      tssm_seq_convert,
      tssm_seq_convert_base,
      tssm_eng_flag,
      tssm_eng_start_digit,
      tssm_eng_end_digit,
      tssm_rev_flag,
      tssm_rev_start_digit,
      tssm_rev_end_digit,
      tssm_checksum_flag,
      tssm_checksum_start_digit,
      tssm_checksum_end_digit,
      tssm_config_flag,
      tssm_config_start_digit,
      tssm_config_end_digit
  from
      "FETLPSQL_A1"."Traceability".trc_serial_structure_mst
  where
      tssm_sn_struc_code like '${Code}' || '%'
      and tssm_sn_struc_name like '${Name}' || '%'
  order by
      tssm_sn_struc_code,
      tssm_sn_struc_name
    `;

    try {
      const client = await ConnectPG_DB();
      const result = await client.query(searchQuery, [Code, Name]);
      const foundDataArray = result.rows;
      await DisconnectPG_DB(client);
      res.status(200).json(foundDataArray);
    } catch (error) {
      console.error("Error occurred while searching data:", error);
      res
        .status(500)
        .json({
          message: "An error occurred while searching data",
          error: error.message,
        });
    }
  } else {
    res.status(400).json({ message: "Code and Name parameters are required" });
  }
};
