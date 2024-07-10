const {
  ConnectPG_DB,
  DisconnectPG_DB,
  ConnectOracleDB,
  DisconnectOracleDB,
} = require("../Conncetion/DBConn.cjs");
const { writeLogError } = require("../Common/LogFuction.cjs");

//PostgreSQL
module.exports.GetRejcetCombo = async function (req, res) {
  var query = "";
  try {
    const client = await ConnectPG_DB();
    query += ` select * from  "Traceability".trc_008_rejcet_getRejcetCombo() `;

    const result = await client.query(query);

    if (result.rows.length > 0) {
      res.status(200).json(result.rows);
      await DisconnectPG_DB(client);
    }
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

module.exports.GetSearchBySerial = async function (req, res) {
  var query = "";
  let strPlantCode = process.env.FacA1;

  try {
    const { strSerialNo } = req.body;
    const client = await ConnectPG_DB();
    console.log(strSerialNo, "strSerialNo", strPlantCode, "strPlantCode");
    query += ` select * from "Traceability".trc_008_rejcet_getSearchbySerial('${strPlantCode}','${strSerialNo}'); `; //THA9366000SJFGJ6K

    const result = await client.query(query);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows);
      await DisconnectPG_DB(client);
    } else {
      res.status(404).json({ message: "Data Not found" });
      await DisconnectPG_DB(client);
    }
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

module.exports.GetSearchBylot = async function (req, res) {
  var query = "";
  let strPlantCode = process.env.FacA1;

  try {
    const { strLotNo } = req.body;
    const client = await ConnectPG_DB();
    query += ` select * from "Traceability".trc_008_rejcet_getsearchbylot('${strPlantCode}','${strLotNo}'); `; //190881203

    const result = await client.query(query);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows);
      await DisconnectPG_DB(client);
    } else {
      res.status(404).json({ message: "Data Not found" });
      await DisconnectPG_DB(client);
    }
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};
module.exports.SetSubmitData = async function (req, res) {
  var query = "";
  try {
    const client = await ConnectPG_DB();
    let { dataList } = req.body;
    const json_convertdata = JSON.stringify(dataList);
    console.log(json_convertdata, "json_convertdata");
    query = `CALL "Traceability".trc_008_reject_setsubmitdata('[${json_convertdata}]','');`;
    const result = await client.query(query);
    if (result.rows[0].p_error == "") {
      dataList = null;
      res.status(200).json({ message: "Success" });
    } else {
      res.status(400).json({ message: result.rows[0].p_error });
    }
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};
