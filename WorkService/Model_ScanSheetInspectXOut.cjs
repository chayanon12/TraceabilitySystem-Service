const {
    ConnectPG_DB,
    DisconnectPG_DB,
    ConnectOracleDB,
    DisconnectOracleDB,
} = require("../Conncetion/DBConn.cjs");
const { writeLogError } = require("../Common/LogFuction.cjs");

// module.exports.getProductShtInsXOutByLot = async function (req, res) {
//     let query = "";
//     try {
//         const p_data = JSON.stringify(req.body);
//         query = ` SELECT * FROM "Traceability".trc_007_scansheetinspectxout_getproductshtinspectbylot('${p_data}'); `;

//         const client = await ConnectPG_DB();
//         const result = await client.query(query);
//         await DisconnectPG_DB(client);
//         res.json(result.rows);
//     } catch (err) {
//         writeLogError(err.message, query);
//         res.status(500).json({ message: err.message });
//     }
// };