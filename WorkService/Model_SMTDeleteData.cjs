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

module.exports.GetELTResult = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_032_smtdeletedata_geteltresult('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.DeleteELT = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `CALL "Traceability".trc_032_smtdeletedata_deleteelt('[${p_data}]',''); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.GetFinalGateResult = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_032_smtdeletedata_getfinalgateresult('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.FinalDelete = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `CALL "Traceability".trc_032_smtdeletedata_deletefinal('[${p_data}]',''); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};