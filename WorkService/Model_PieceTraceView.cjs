const {
    ConnectPG_DB,
    DisconnectPG_DB,
    ConnectOracleDB,
    DisconnectOracleDB,
} = require("../Conncetion/DBConn.cjs");
const { writeLogError } = require("../Common/LogFuction.cjs");

module.exports.GetSerialNo = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_035_traceviewpiece_getserialno('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};