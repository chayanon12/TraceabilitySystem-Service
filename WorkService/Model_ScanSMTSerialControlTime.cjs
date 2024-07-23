const { query } = require("express");
const {
    ConnectPG_DB,
    DisconnectPG_DB,
    ConnectOracleDB,
    DisconnectOracleDB,
} = require("../Conncetion/DBConn.cjs");
const { writeLogError } = require("../Common/LogFuction.cjs");

module.exports.GetSerialProcControlTimeTable = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = ` select * from "Traceability".trc_010_serialcontroltime_getserialproccontroltimetable('${p_data}'); `;
        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.SetSerialProcControlTimeTable = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = ` CALL "Traceability".trc_010_serialcontroltime_setserialproccontroltimetable('${p_data}', ''); `;
        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};