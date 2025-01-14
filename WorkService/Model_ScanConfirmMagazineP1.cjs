const {
  ConnectPG_DB,
  DisconnectPG_DB,
  ConnectOracleDB,
  DisconnectOracleDB,
} = require("../Conncetion/DBConn.cjs");
const { writeLogError } = require("../Common/LogFuction.cjs");
const oracledb = require("oracledb");

module.exports.GetCountSerialByLotMagazine = async function (req, res) {
  let query = "";
  try {
    const { dataList } = req.body;
    const json_convertdata = JSON.stringify(dataList);

    const client = await ConnectPG_DB();
    query += `select * from "Traceability".trc_000_common_GetCountSerialByLotMagazine('[${json_convertdata}]')`;
    const result = await client.query(query);

    res.status(200).json(result.rows);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

module.exports.SetManualConfirmMagazine = async function (req, res) {
  let query = "";
  try {
    const { dataList } = req.body;
    const json_convertdata = JSON.stringify(dataList);

    const client = await ConnectPG_DB();
    query += `CALL "Traceability".trc_055_setmanualconfirmmagazine('[${json_convertdata}]','')`;
    const result = await client.query(query);

    res.status(200).json(result.rows);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

module.exports.GetSerialMagazineByLot = async function (req, res) {
  let query = "";
  try {
    const { dataList } = req.body;
    const json_convertdata = JSON.stringify(dataList);

    const client = await ConnectPG_DB();
    query += `SELECT * from "Traceability".trc_055_getserialmagazinebylot('[${json_convertdata}]')`;
    const result = await client.query(query);
    const filteredResult = result.rows.map(row => row.response);

    res.status(200).json(filteredResult);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};


