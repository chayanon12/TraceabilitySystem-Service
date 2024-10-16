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
    console.log("GetCountSerialByLotMagazine",dataList);
    const client = await ConnectPG_DB();
    query += `select * from "Traceability".trc_000_common_GetCountSerialByLotMagazine('[${json_convertdata}]')`;
    const result = await client.query(query);
    console.log(" DATA SHOW trc_000_common_GetCountSerialByLotMagazine",result.rows);
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
    console.log("SetManualConfirmMagazine",dataList);
    const client = await ConnectPG_DB();
    query += `CALL "Traceability".trc_055_setmanualconfirmmagazine('[${json_convertdata}]','')`;
    const result = await client.query(query);
    console.log(" DATA SHOW trc_055_setmanualconfirmmagazine",result.rows);
    res.status(200).json(result.rows);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};



module.exports.GetSerialMagazineByLot = async function (req, res) {
  const { dataList } = req.body;
  const json_convertdata = JSON.stringify(dataList);
  console.log("GetSerialMagazineByLot",dataList);
  var query = "";
  try {
    const client = await ConnectPG_DB();
    query += `CALL "Traceability".trc_055_getserialmagazinebylot('[${json_convertdata}]','','{}');`;
    const result = await client.query(query);
    console.log("DATA SHOW trc_055_getserialmagazinebylot : ",result.rows)
      res.status(200).json(result.rows);
      DisconnectPG_DB(client);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

