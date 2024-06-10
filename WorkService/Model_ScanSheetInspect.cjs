const {
    ConnectPG_DB,
    DisconnectPG_DB,
    ConnectOracleDB,
    DisconnectOracleDB,
} = require("../Conncetion/DBConn.cjs");

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