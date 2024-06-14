const {
  ConnectPG_DB,
  DisconnectPG_DB,
  ConnectOracleDB,
  DisconnectOracleDB,
} = require("../Conncetion/DBConn.cjs");
const oracledb = require("oracledb");
const { queueRequests } = require("oracledb");
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


///------Example
 
module.exports.GetProductNameByLot = async function (req, res) {
  console.log('g-hkkkk')
  try {
    const { Lotno } = req.body;
    const priority ='14'
    const connect = await ConnectOracleDB("FPC");
    let query = "";
    query = `SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_GETPRODUCTDATABYLOT('${Lotno}', '${priority}') AS data1 FROM dual`;
    const result = await connect.execute(query);
    console.log(query)
    await DisconnectOracleDB(connect);
    res.json(result.rows);
  } catch (error) {
    console.error("ข้อผิดพลาดในการค้นหาข้อมูล:", error.message);
    res.status(500).send("ข้อผิดพลาดในการค้นหาข้อมูล");
  }
};


module.exports.GetProductData = async function (req, res) {
  try {
    var strplantcode ='G'
    var query = "";
    const client = await ConnectPG_DB();
    query = `SELECT * from "Traceability".trc_000_common_getproductdata('${strplantcode}')`;
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json( result.rows );
  } catch (error) {
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

// module.exports.getlotserialcountdata = async function (req, res) {
//   try {
//     const { Lotno } = req.body;
//     var query = "";
//     const client = await ConnectPG_DB();
//     query = `SELECT * from "Traceability".trc_000_common_getlotserialcountdata('${Lotno}')`;
//     const result = await client.query(query);
//     await DisconnectPG_DB(client);
//     res.status(200).json(result.rows);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

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
    query = ``;
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json({ Result: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getproductshtinspectdup = async function (req, res) {
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
    res.status(200).json({ Result: result});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
