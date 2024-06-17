const {
    ConnectPG_DB,
    DisconnectPG_DB,
    ConnectOracleDB,
    DisconnectOracleDB,
} = require("../Conncetion/DBConn.cjs");
const { writeLogError } = require("../Common/LogFuction.cjs");

module.exports.getLotNo = async function (req, res) {
    try {
        const { txtlotno } = req.body;
        console.log('txtlotno:', txtlotno);

        const connect = await ConnectOracleDB("FPC");
        let query = "";
        query += `SELECT NVL(L.LOT_PRD_NAME, ' ') AS PRD_NAME, `;
        query += `NVL(L.LOT_ROLL_NO, ' ') AS ROLL_NO, `;
        query += `TO_CHAR(LISTAGG(L.LOT || `;
        query += `DECODE(T1.LTR_FROM_LOT, NULL, '', ',' || T1.LTR_FROM_LOT) || `;
        query += `DECODE(T2.LTR_FROM_LOT, NULL, '', ',' || T2.LTR_FROM_LOT) || `;
        query += `DECODE(T3.LTR_FROM_LOT, NULL, '', ',' || T3.LTR_FROM_LOT) || `;
        query += `DECODE(T4.LTR_FROM_LOT, NULL, '', ',' || T4.LTR_FROM_LOT) || `;
        query += `DECODE(T5.LTR_FROM_LOT, NULL, '', ',' || T5.LTR_FROM_LOT), ',') `;
        query += `WITHIN GROUP (ORDER BY L.LOT ASC)) AS LOT_ALL `;
        query += `FROM FPC.FPC_LOT L `;
        query += `LEFT JOIN FPC_LOT_TRANSFER T1 ON L.LOT = T1.LTR_LOT `;
        query += `LEFT JOIN FPC_LOT_TRANSFER T2 ON T1.LTR_FROM_LOT = T2.LTR_LOT `;
        query += `LEFT JOIN FPC_LOT_TRANSFER T3 ON T2.LTR_FROM_LOT = T3.LTR_LOT `;
        query += `LEFT JOIN FPC_LOT_TRANSFER T4 ON T3.LTR_FROM_LOT = T4.LTR_LOT `;
        query += `LEFT JOIN FPC_LOT_TRANSFER T5 ON T4.LTR_FROM_LOT = T5.LTR_LOT `;
        query += `WHERE L.LOT = '${txtlotno}' `;
        query += `GROUP BY NVL(L.LOT_PRD_NAME, ' '), `;
        query += `NVL(L.LOT_ROLL_NO, ' '), `;
        query += `DECODE(L.LOT_PRIORITY, 'FINAL_GATE_LOT_PRIORITY_SKIP', 'Y', 'N') `;

        const result = await connect.execute(query);
        DisconnectOracleDB(connect);
        res.json(result.rows);
    } catch (error) {
        console.error("ข้อผิดพลาดในการค้นหาข้อมูล:", error.message);
        res.status(500).send("ข้อผิดพลาดในการค้นหาข้อมูล");
    }
};

module.exports.getProductShtGroup = async function (req, res) {
    let query = "";
    try {
        const strprdname = JSON.stringify(req.body);
        console.log('txtprdName:', strprdname);
        query = ` SELECT * FROM "Traceability".trc_003_scansheetinspect_getproductshtgroup('${strprdname}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.json(result.rows);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getProductShtBIN = async function (req, res) {
    let query = "";
    try {
        const bingroup = JSON.stringify(req.body);
        console.log('bingroup:', bingroup);
        query = ` SELECT * FROM "Traceability".trc_003_scansheetinspect_getproductshtbin('${bingroup}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.json(result.rows);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getProductShtInspect = async function (req, res) {
    let query = "";
    try {
        const p_data = JSON.stringify(req.body);
        // console.log('ProductShtIn:', p_data);
        query = ` SELECT * FROM "Traceability".trc_003_scansheetinspect_getproductshtinspect('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.json(result.rows);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.SetLotSheetIns = async function (req, res) {
    let query = "";
    try {
        const p_data = JSON.stringify(req.body);
        // console.log('SetLotSheetIns:', p_data);
        query = ` CALL "Traceability".trc_003_scansheetinspect_setlotsheetins('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.json(result.rows);
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
        res.json(result.rows);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};