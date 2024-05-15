const { query } = require("express");
const {
  ConnectPG_DB,
  DisconnectPG_DB,
  ConnectOracleDB,
  DisconnectOracleDB,
} = require("../Conncetion/DBConn.cjs");
const { queueRequests } = require("oracledb");

module.exports.GetProductData = async function (req, res) {
  try {
    let query = "";
    const Conn = await ConnectOracleDB("SMT");
    query += `SELECT P.PRM_PRODUCT_NAME AS PRD_NAME `;
    query += `FROM SMT_PRODUCT_MST P `;
    query += `WHERE P.PRM_PLANT_CODE = 'THA' `;
    query += `AND NVL(P.PRM_PRODUCT_STATUS,'ACTIVE') = 'ACTIVE' `;
    query += `ORDER BY P.PRM_PRODUCT_NAME ASC `;
    const result = await Conn.execute(query);
    if (result.rows.length > 0) {
      res.status(200).json({ Product: result.rows });
      DisconnectOracleDB(Conn);
    } else {
      res.status(401).json({ message: "Not Found Data" });
      DisconnectOracleDB(Conn);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.GetProductDataByLot = async function (req, res) {
  try {
    let query = "";
    const Conn = await ConnectOracleDB("FPC");
    const { strLot } = req.body;
    query += `SELECT NVL(L.LOT_PRD_NAME,' ') AS PRD_NAME`;
    query += `, NVL(L.LOT_ROLL_NO,' ') AS ROLL_NO `;
    query += `, DECODE(L.LOT_PRIORITY,'14','Y','N') AS LOT_EN `;
    query += `, TO_CHAR(LISTAGG(L.LOT||DECODE(T1.LTR_FROM_LOT,NULL,'',','||T1.LTR_FROM_LOT)||DECODE(T2.LTR_FROM_LOT,NULL,'',','||T2.LTR_FROM_LOT)||DECODE(T3.LTR_FROM_LOT,NULL,'',','||T3.LTR_FROM_LOT)||DECODE(T4.LTR_FROM_LOT,NULL,'',','||T4.LTR_FROM_LOT)||DECODE(T5.LTR_FROM_LOT,NULL,'',','||T5.LTR_FROM_LOT),',') WITHIN GROUP (ORDER BY L.LOT ASC )) AS LOT_ALL `;
    query += `FROM  FPC.FPC_LOT L `;
    query += `, FPC_LOT_TRANSFER T1 `;
    query += `, FPC_LOT_TRANSFER T2 `;
    query += `, FPC_LOT_TRANSFER T3 `;
    query += `, FPC_LOT_TRANSFER T4 `;
    query += `, FPC_LOT_TRANSFER T5 `;
    query += `WHERE L.LOT =  '${strLot}' `;
    query += `AND L.LOT = T1.LTR_LOT(+) `;
    query += `AND T1.LTR_FROM_LOT = T2.LTR_LOT(+) `;
    query += `AND T2.LTR_FROM_LOT = T3.LTR_LOT(+) `;
    query += `AND T3.LTR_FROM_LOT = T4.LTR_LOT(+) `;
    query += `AND T4.LTR_FROM_LOT = T5.LTR_LOT(+) `;
    query += `GROUP BY NVL(L.LOT_PRD_NAME,' ') `;
    query += `, NVL(L.LOT_ROLL_NO,' ') `;
    query += `, DECODE(L.LOT_PRIORITY,'14','Y','N')`;
    const result = await Conn.execute(query);
    if (result.rows.length > 0) {
      res.status(200).json({ Product: result.rows });
      DisconnectOracleDB(Conn);
    } else {
      res.status(401).json({ message: "Not Found Data" });
      DisconnectOracleDB(Conn);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
