const {
    ConnectPG_DB,
    DisconnectPG_DB,
    ConnectOracleDB,
    DisconnectOracleDB,
} = require("../Conncetion/DBConn.cjs");
const { writeLogError } = require("../Common/LogFuction.cjs");

module.exports.GetCountConfirmMagazineBySerial = async function (req, res) {
    var query = "";
    var _intLotCount = 0;
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_058_confirmmotp1_getcountconfirmmagazinebyserial('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        if (result.rows.length > 0) {
            _intLotCount = result.rows[0].lot_count;
        }
        res.status(200).json(_intLotCount);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};