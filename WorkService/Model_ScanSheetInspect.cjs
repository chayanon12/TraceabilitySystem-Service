const {
    ConnectPG_DB,
    DisconnectPG_DB,
    ConnectOracleDB,
    DisconnectOracleDB,
} = require("../Conncetion/DBConn.cjs");
const { writeLogError } = require("../Common/LogFuction.cjs");

module.exports.getProductShtInspect = async function (req, res) {
    let query = "";
    try {

        query = ` SELECT * FROM "Traceability".trc_003_scansheetinspect_getproductshtinspect('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.SetLotSheetIns = async function (req, res) {
    let query = "";
    try {
        const p_data = JSON.stringify(req.body);

        query = ` CALL "Traceability".trc_003_scansheetinspect_setlotsheetins('${p_data}', ''); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getProductShtInspectByLot = async function (req, res) {
    let query = "";
    try {
        const data = JSON.stringify(req.body);
        query = ` SELECT * FROM "Traceability".trc_003_scansheetinspect_getproductshtinspectbylot('${data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};