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
        res.status(200).json(result.rows[0]);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getdataproduct = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_035_traceviewpiece_getdataproduct('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getproductname = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_035_traceviewpiece_getproductname('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getproductmst = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_035_traceviewpiece_getproductmst('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getlotsheetserial = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_035_traceviewpiece_getlotsheetserial('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getspifront = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_035_traceviewpiece_getspifront('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getspiresult = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_035_traceviewpiece_getspiresult('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getresult = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_035_traceviewpiece_getresult('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getspiback = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_035_traceviewpiece_getspiback('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getspi = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_035_traceviewpiece_getspiresult2('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getpreaoifront = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_035_traceviewpiece_getpreaoifront('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getpreaoifrontelse = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_035_traceviewpiece_getpreaoifrontelse('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getaoi = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_035_traceviewpiece_getaoi('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getaoi2 = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_035_traceviewpiece_getaoi2('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getaoi3 = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_035_traceviewpiece_getaoi3('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getaoicoating = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_035_traceviewpiece_getaoicoating('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getaoicoating2 = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_035_traceviewpiece_getaoicoating2('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getaoicoating3 = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_035_traceviewpiece_getaoicoating3('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getinspectionresult = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_035_traceviewpiece_getinspectionresult('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getreject = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_035_traceviewpiece_getreject('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.gettouchup = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_035_traceviewpiece_gettouchup('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getfinalinspection = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_035_traceviewpiece_getfinalinspection('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getbending = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_035_traceviewpiece_getbending('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getelt = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_035_traceviewpiece_getelt('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getkeytype = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_035_traceviewpiece_getkeytype('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getxrayresult = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_035_traceviewpiece_getxrayresult('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getbarcodegrade = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_035_traceviewpiece_getbarcodegrade('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};