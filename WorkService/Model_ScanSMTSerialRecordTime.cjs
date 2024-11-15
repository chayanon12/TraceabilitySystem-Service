const { query } = require("express");
const {
    ConnectPG_DB,
    DisconnectPG_DB,
    ConnectOracleDB,
    DisconnectOracleDB,
} = require("../Conncetion/DBConn.cjs");
const { writeLogError } = require("../Common/LogFuction.cjs");

module.exports.GetOperatorRecordTimeData = async function (req, res) {
    var query = "";

    try {
        const client = await ConnectPG_DB();
        const p_data = JSON.stringify(req.body);
        query += `SELECT * FROM "Traceability".trc_059_serialrecordtime_getoperatorrecordtimedata('${p_data}')`;

        const result = await client.query(query);
        res.status(200).json(result.rows);
        await DisconnectPG_DB(client);
    } catch (error) {
        writeLogError(error.message, query);
        res.status(500).json({ message: error.message });
    }
};