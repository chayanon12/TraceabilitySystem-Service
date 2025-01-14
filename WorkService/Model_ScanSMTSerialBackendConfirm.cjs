const { query } = require("express");
const {
    ConnectPG_DB,
    DisconnectPG_DB,
    ConnectOracleDB,
    DisconnectOracleDB,
} = require("../Conncetion/DBConn.cjs");
const { writeLogError } = require("../Common/LogFuction.cjs");

module.exports.getSerialSheetManyTable = async function (req, res) {
    var query = "";
    var processedRows = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = ` select * from "Traceability".trc_018_serialbackendconfirm_getserialsheetmanytable('[${p_data}]'); `;
        const client = await ConnectPG_DB();
        const result = await client.query(query);

        if (result.rows.length > 0) {
            processedRows = result.rows.map(row => {
                return {
                    FRONT_SHEET_NO: row.front_sheet_no,
                    BACK_SHEET_NO: row.back_sheet_no,
                    SHEET_PCS_NO: row.sheet_pcs_no,
                    ROLL_LEAF_NO: row.roll_leaf_no
                };
            });
        }
        await DisconnectPG_DB(client);
        res.status(200).json(processedRows[0]);
  
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.get_backendresult = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);

        query = ` SELECT * FROM "Traceability".trc_018_serialbackendconfirm_get_backendresult('${p_data}'); `;
   
        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
  };