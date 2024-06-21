const {
  ConnectPG_DB,
  DisconnectPG_DB,
  ConnectOracleDB,
  DisconnectOracleDB,
} = require("../Conncetion/DBConn.cjs");
const oracledb = require("oracledb");
const { writeLogError } = require("../Common/LogFuction.cjs");

///------Example
module.exports.xxxxxx = async function (req, res) {
  try {
    var query = "";
    const client = await ConnectPG_DB();
    query = ``;
    const result = await client.query(query);
    await DisconnectPG_DB(client);

    res.status(200).json({ Result: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//FPC
module.exports.GetProductNameByLot = async function (req, res) {
  var query = "";
  try {
    const Conn = await ConnectOracleDB("FPC");
    const {strLot} = req.body;
    query += `SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_GetProductNameByLot('${strLot}') as PRD_NAME  FROM DUAL`;
    const result = await Conn.execute(query);
    if (result.rows.length > 0) {
      res.status(200).json({prdName : result.rows[0]});
    }
    DisconnectOracleDB(Conn);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
}
///------Example

module.exports.GetProductData = async function (req, res) {
  try {
    var strplantcode = "G";
    var query = "";
    const client = await ConnectPG_DB();
    query = `SELECT * from "Traceability".trc_000_common_getproductdata('${strplantcode}')`;
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports.GetMOTRecordTimeData = async function (req, res) {
  var query = "";

  try {
    const client = await ConnectPG_DB();
    const { dataList } = req.body;
    const json_convertdata = JSON.stringify(dataList);
    query += `select * from "Traceability".trc_000_common_GetMOTRecordTimeData('[${json_convertdata}]');`;
    console.log(query)
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

module.exports.getconnectshtmastercheckresult = async function (req, res) {
  try {
    var query = "";
    const client = await ConnectPG_DB();
    query = ``;
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json({ Result: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getconnectshtplasmatime = async function (req, res) {
  try {
    var query = "";
    const client = await ConnectPG_DB();
    query = ``;
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json({ Result: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getfactory = async function (req, res) {
  try {
    var query = "";
    const client = await ConnectPG_DB();
    query = ``;
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json({ Result: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getlotserialcountdata = async function (req, res) {
  var query = "";
  try {
    const client = await ConnectPG_DB();
    const { Lotno } = req.body;
    query += `SELECT * from "Traceability".trc_000_common_getlotserialcountdata('${Lotno}')`;
    const result = await client.query(query);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows);
      DisconnectPG_DB(client);
    }
  } catch (error) {
    writeLogError(error.message, query);
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports.getWeekCodebyLot = async function (req, res) {
  console.log("เข้า");
  var query = "";
  try {
    const connect = await ConnectOracleDB("FPC");
    const { STRLOT, STRPROC } = req.body;
    query += `SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_GETWEEKCODEBYLOT('${STRLOT}', '${STRPROC}')AS data1 FROM dual`;
    const result = await connect.execute(query);
    await DisconnectOracleDB(connect);
    res.status(200).json(result.rows.flat());
  } catch (error) {
    writeLogError(error.message, query);
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports.GetProductDataByLot = async function (req, res) {
  console.log('เข้า')
  var query = "";
  try {
    const connect = await ConnectOracleDB("FPC");
    const { strLot} = req.body;
    console.log(strLot)
    query += `SELECT  FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_GETPRODUCTDATABYLOT('${strLot}','${process.env.priority}') AS data1 FROM dual`;
    const result = await connect.execute(query);
    await DisconnectOracleDB(connect);
    res.status(200).json(result.rows);
  } catch (error) {
    writeLogError(error.message, query);
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports.getlotsheetcountdata = async function (req, res) {
  try {
    var query = "";
    const client = await ConnectPG_DB();
    query = ``;
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json({ Result: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getlotsheetdataallbylot = async function (req, res) {
  try {
    var query = "";
    const client = await ConnectPG_DB();
    query = ``;
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json({ Result: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getproductdata = async function (req, res) {
  try {
    var query = "";
    const client = await ConnectPG_DB();
    query = ``;
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json({ Result: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getproductshtinspectbylot = async function (req, res) {
  try {
    var query = "";
    const client = await ConnectPG_DB();
    const p_data = JSON.stringify(req.body);
    query = `SELECT * FROM "Traceability".trc_000_common_getproductshtinspectxoutbylot('${p_data}');`;
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getproductshtinspectXOutbylot = async function (req, res) {
  try {
    var query = "";
    const client = await ConnectPG_DB();
    const p_data = JSON.stringify(req.body);
    query = `SELECT * FROM "Traceability".trc_000_common_getproductshtinspectxoutbylot('${p_data}');`;
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getproductshtinspectdup = async function (req, res) {
  try {
    var query = "";
    const client = await ConnectPG_DB();
    const json_data = JSON.stringify(req.body);
    query = `SELECT * FROM "Traceability".trc_000_common_getproductshtinspectdup('${json_data}');`;
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json({ Result: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getrollleafduplicate = async function (req, res) {
  try {
    var query = "";
    const client = await ConnectPG_DB();
    query = ``;
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json({ Result: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getserialduplicate = async function (req, res) {
  try {
    var query = "";
    const client = await ConnectPG_DB();
    query = ``;
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json({ Result: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getserialduplicateconnectsht = async function (req, res) {
  var query = "";
  try {
    const client = await ConnectPG_DB();
    const { Serial } = req.body;
    query += `SELECT  * FROM "Traceability".trc_000_common_getserialduplicateconnectsht('${Serial}')`;  //--THA92770P53J17J5B
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    const data = JSON.parse(dataJsonString);
    console.log(data);
    res.status(200).json(result.rows.flat());
  } catch (error) {
    writeLogError(error.message, query);
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports.getserialforupdate = async function (req, res) {
  try {
    var query = "";
    const client = await ConnectPG_DB();
    query = ``;
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json({ Result: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getserialpassbylotpacking = async function (req, res) {
  try {
    var query = "";
    const client = await ConnectPG_DB();
    query = ``;
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json({ Result: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getserialtouchupdata = async function (req, res) {
  try {
    var query = "";
    const client = await ConnectPG_DB();
    query = ``;
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json({ Result: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getsheetdatabyserialno = async function (req, res) {
  try {
    var query = "";
    const client = await ConnectPG_DB();
    query = ``;
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json({ Result: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getsheetduplicateconnectshttyped = async function (req, res) {
  try {
    var query = "";
    const client = await ConnectPG_DB();
    query = ``;
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json({ Result: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getsheetduplicateconnectshttypenone = async function (req, res) {
  try {
    var query = "";
    const client = await ConnectPG_DB();
    query = ``;
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json({ Result: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getsheetnobyserialno = async function (req, res) {
  try {
    var query = "";
    const client = await ConnectPG_DB();
    query = ``;
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json({ Result: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getsystemdate = async function (req, res) {
  try {
    var query = "";
    const client = await ConnectPG_DB();
    query = ``;
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json({ Result: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getworkingdate = async function (req, res) {
  try {
    var query = "";
    const client = await ConnectPG_DB();
    query = ` SELECT * FROM "Traceability".trc_000_common_getworkingdate(); `;
    const result = await client.query(query);

    console.log(result.rows);
    await DisconnectPG_DB(client);
    res.status(200).json({ Result: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.GetReflowRecordTimeData = async function (req, res) {
  var query = "";

  try {
    const client = await ConnectPG_DB();
    const {dataList} = req.body;
    const json_convertdata = JSON.stringify(dataList);

    query = `select * from "Traceability".trc_000_common_GetReflowRecordTimeData('[${json_convertdata}]');`;
    const result = await client.query(query);
    if (result.rows !== "") {
      res.status(200).json(result.rows[0]);
      await DisconnectPG_DB(client);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.CallSMTReflowRecordTimeResult = async function (req, res) {
  var query = "";
  var json_convertdata = "";
  try {
    const client = await ConnectPG_DB();
    const {dataList} = req.body;
    console.log(dataList)
    json_convertdata = JSON.stringify(dataList);
    console.log(json_convertdata);
    query = `call "Traceability".trc_000_common_CallSMTReflowRecordTimeResult($1::jsonb,'');`;
    // query = `call "Traceability".trc_000_common_CallSMTReflowRecordTimeResult('[${json_convertdata}]','');`;

    const result = await client.query(query, [json_convertdata]);
    // const result = await client.query(query);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
      await DisconnectPG_DB(client);
      return;
    } else {
      await DisconnectPG_DB(client);
    }
  } catch (error) {
    query += `${json_convertdata}`;
    writeLogError(error.message, query);
    console.log(error, "error");
    res.status(500).json({ message: error.message });
  }
};


module.exports.DeleteReflowRecordTimeData = async function (req, res) {
  var query = "";
  try {
    const client = await ConnectPG_DB();
    const {strSheetNo,strPlantCode} = req.body;
    const dataList = {strSheetNo:strSheetNo,strPlantCode:strPlantCode}
    json_convertdata = JSON.stringify(dataList);
    query = `call "Traceability".trc_000_common_DeleteReflowRecordTimeData('[${json_convertdata}]','');`;
    const result = await client.query(query);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
      await DisconnectPG_DB(client);
      return;
    } else {
      await DisconnectPG_DB(client);
    }
  } catch (error) {
    writeLogError(error.message, query);
    console.log(error, "error");
    res.status(500).json({ message: error.message });
  }
};
