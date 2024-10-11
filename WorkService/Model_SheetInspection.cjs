const {
    ConnectPG_DB,
    DisconnectPG_DB,
    ConnectOracleDB,
    DisconnectOracleDB,
} = require("../Conncetion/DBConn.cjs");
const oracledb = require("oracledb");
const { writeLogError } = require("../Common/LogFuction.cjs");

module.exports.GetSerialAVIResult = async function (req, res) {
    {
        let query = "";
        let strLot = "";
        try {
            const {
                strInvNoFrom,
                strInvNoTo,
            } = req.body;
            const Conn = await ConnectOracleDB("PCTTTEST");

            if (strInvNoFrom !== "" && strInvNoTo !== "") {

                query = `SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_GetLotByInvoice('${strInvNoFrom}', '${strInvNoTo}') AS DATA1 FROM DUAL`;

                const result = await Conn.execute(query);

                if (result.rows.length > 0) {
                    let data = [];

                    for (let i = 0; i < result.rows[0][0].length; i++) {
                        data.push({
                            LOT_NO: result.rows[0][0][i][0],
                        });
                    }
                    strLot = data[0].LOT_NO;

                    res.status(200).json(strLot);
                    await DisconnectOracleDB(Conn);
                }
            }

        } catch (error) {
            writeLogError(error.message, query);
            res.status(500).json({ message: error.message });
        }
    }
};