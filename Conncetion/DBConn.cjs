const { Client } = require("pg");
const oracledb = require("oracledb");
const { writeLogError } = require("../Common/LogFuction.cjs");
require("dotenv").config();
oracledb.initOracleClient({
  // tnsAdmin: "D:\\app\\\Chayanon.I\\product\\11.2.0\\client_2\\network\\admin",
  tnsAdmin: process.env.TNS_ADMIN,
});

const ConnectPG_DB = async () => {
  const Pg_FETL_A1_Service = {
    user: process.env.FETLSQLA1_USER,
    host: process.env.FETLSQLA1_HOST,
    database: process.env.FETLSQLA1_DATABASE,
    password: process.env.FETLSQLA1_PASSWORD,
    port: process.env.FETLSQLA1_PORT,
  };
  const client = new Client(Pg_FETL_A1_Service);
  await client.connect();
  await client.query("SET timezone = 'Asia/Bangkok'");

  return client;
};

const DisconnectPG_DB = async (client) => {
  await client.end();
};

const ConnectOracleDB = async (ConnType) => {
  const oracledb = require("oracledb");

  if (ConnType === "FPC") {
    const FPC = {
      user: process.env.FPC_USER,
      password: process.env.FPC_PASSWORD,
      connectString: process.env.FPC_CONNECTION_STRING,
    };
    const connection = await oracledb.getConnection(FPC);
    return connection;
  } else if (ConnType === "SMT") {
    const SMT = {
      user: process.env.SMT_USER,
      password: process.env.SMT_PASSWORD,
      connectString: process.env.SMT_CONNECTION_STRING,
    };
    const connection = await oracledb.getConnection(SMT);
    return connection;
  } else if (ConnType === "PCTTTEST") {
    const PCTTTEST = {
      user: process.env.PCTTTEST_USER,
      password: process.env.PCTTTEST_PASSWORD,
      connectString: process.env.PCTTTEST_CONNECTION_STRING,
    };
    const connection = await oracledb.getConnection(PCTTTEST);
    return connection;
  }
};

const DisconnectOracleDB = async (connection) => {
  await connection.close();
};

async function executeQueryPostgres(query) {
  let client;
  let resultresponse;
  try {
    client = await ConnectPG_DB();
    const result = await client.query(query);
    resultresponse = result.rows[0];
    await DisconnectPG_DB(client);
  } catch (error) {
    writeLogError(error);
    await DisconnectPG_DB(client);
  }
  return resultresponse;
}
async function insertIntoPostgres(query) {
  let client;
  try {
    client = await ConnectPG_DB();
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    return result;
  } catch (error) {
    writeLogError(error);
    await DisconnectPG_DB(client);
  }
}

async function executeOracleQuery(query) {
  let connection;
  let resultresponse;
  try {
    connection = await ConnectOracleDB("PCTTTEST");
    const result = await connection.execute(query);
    resultresponse = result.rows;
    await connection.close();
  } catch (error) {
    writeLogError(error);
    await connection.close();
  }
  return resultresponse;
}
async function deleteFromOracle(query, params) {
  let connection;
  try {
    connection = await ConnectOracleDB("PCTTTEST");
    const result = await connection.execute(query, params, {
      autoCommit: true,
    });
    await connection.close();
    return result;
  } catch (error) {
    writeLogError(error);
    await connection.close();
  }
}

module.exports = {
  ConnectPG_DB,
  DisconnectPG_DB,
  ConnectOracleDB,
  DisconnectOracleDB,
  executeQueryPostgres,
  insertIntoPostgres,
  executeOracleQuery,
  deleteFromOracle,
};
