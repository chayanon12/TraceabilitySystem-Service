const {
  ConnectPG_DB,
  DisconnectPG_DB,
  ConnectOracleDB,
  DisconnectOracleDB,
} = require("../Conncetion/DBConn.cjs");
const oracledb = require("oracledb");

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

module.exports.GetProductData = async function (req, res) {
    console.log('เข้า')
  try {
    var query = "";
    const client = await ConnectPG_DB();
    query = `SELECT "Traceability".trc_001_getproductrollleafdata()`;
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json({ Result: result });
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

module.exports.getlotserialcountdata = async function (req, res) {
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
    query = ``;
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json({ Result: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
