const {
    ConnectPG_DB,
    DisconnectPG_DB,
    ConnectOracleDB,
    DisconnectOracleDB,
} = require("../Conncetion/DBConn.cjs");
const { writeLogError } = require("../Common/LogFuction.cjs");

module.exports.DeleteDataSheet = async function (req, res) {
    var query = "";
    try {
        const p_datadel = JSON.stringify(req.body);
        // console.log('SetLotSheetIns:', p_data);
        query = `CALL "Traceability".trc_032_smtdeletedata_deletesheet('${p_datadel}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.DeleteDataRollleaf = async function (req, res) {
    var query = "";
    try {
        const p_datadel = JSON.stringify(req.body);
        // console.log('SetLotSheetIns:', p_data);
        query = `CALL "Traceability".trc_032_smtdeletedata_deleterollleaf('${p_datadel}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};