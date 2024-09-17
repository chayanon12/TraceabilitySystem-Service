const {
  ConnectPG_DB,
  DisconnectPG_DB,
  ConnectOracleDB,
  DisconnectOracleDB,
} = require("../Conncetion/DBConn.cjs");
const { writeLogError } = require("../Common/LogFuction.cjs");
const oracledb = require("oracledb");

module.exports.GetserialnoChangserial = async function (req, res) {
  const { strplant_code, stroldserial, strnewserial, check_type } = req.body;
  console.log("DATA SHOW P : ",strplant_code, strnewserial );
  var query = "";
  try {
    const client = await ConnectPG_DB();
    query += `SELECT "Traceability".trc_028_changserial_getserialno('${strplant_code}','${strnewserial}')`;
    const result = await client.query(query);
    console.log("DATA SHOW trc_028_changserial_getserialno : ",result.rows)
      res.status(200).json(result.rows);
      DisconnectPG_DB(client);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

module.exports.GetserialnoChangserialoldnew = async function (req, res) {
  const { strplant_code, stroldserial, strnewserial, check_type } = req.body;
  console.log("DATA SHOW P : ",strplant_code, strnewserial );
  var query = "";
  try {
    const client = await ConnectPG_DB();
    query += `SELECT "Traceability".trc_028_changserial_getserialnooldnew('${strplant_code}', '${stroldserial}', '${strnewserial}')`;
    const result = await client.query(query);
    console.log("DATA SHOW trc_028_changserial_getserialnooldnew : ",result.rows)
      res.status(200).json(result.rows);
      DisconnectPG_DB(client);
  } catch (error) {
    console.log("DATA SHOW E : ")
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

module.exports.SetserialnoChangserial = async function (req, res) {
  const { dataList } = req.body;
  const json_convertdata = JSON.stringify(dataList);
  console.log(dataList,"dataList")
  console.log(json_convertdata,"json_convertdata")
  var query = "";
  try {
    const client = await ConnectPG_DB();
    const { dataList } = req.body;
    const json_convertdata = JSON.stringify(dataList);
    // query += `CALL "Traceability".trc_028_changserial_insertandupdateserialno('[${json_convertdata}]','')`;
    const result = await client.query(query);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows);
      DisconnectPG_DB(client);
    }
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};


