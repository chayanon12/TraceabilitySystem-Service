const {
  ConnectPG_DB,
  DisconnectPG_DB,
  ConnectOracleDB,
  DisconnectOracleDB,
} = require("./DBConn.cjs");
const { writeLogError } = require("../Common/LogFuction.cjs");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const express = require("express");
const { now } = require("moment");
const app = express();
app.use(bodyParser.json());

JWT_SECRET = process.env.JWT_TOKEN;
module.exports.login = async (req, res) => {
  var query = "";
  try {
    const { User, Password } = req.body;
    const Conn = await ConnectOracleDB("FPC");
    query = `
        SELECT NUL.LOGIN_ID ,NUL.FACTORY_CODE ,NUL.ID_CODE ,INITCAP(NUL.USER_NAME) AS USER_NAME,INITCAP(NUL.USER_SURNAME) AS USER_SURNAME,NUL.EMAIL_ADD 		
        FROM NAP_USER_LOGIN NUL		
        WHERE UPPER(NUL.USER_LOGIN) = UPPER('${User}')		
            AND UPPER(NUL.USER_PASSWORD) = UPPER('${Password}')		
            AND NUL.USER_STATUS = 'A' `;
    const result = await Conn.execute(query);
    if (result.rows.length > 0) {
      const token = jwt.sign({ id: User, username: Password }, JWT_SECRET
        // , {expiresIn: "10h",}
      );
      res.status(200).json({
        status: "Success",
        token: token,
        Datainfo: {
          user_login: result.rows[0][0],
          factory_code: result.rows[0][1],
          id_code: result.rows[0][2],
          name: result.rows[0][3],
          surname: result.rows[0][4],
          email: result.rows[0][5],
        },
      });
      DisconnectOracleDB(Conn);
    } else {
      res
        .status(401)
        .json({ status: "Error", message: "Invalid User or Password" });
      DisconnectOracleDB(Conn);
    }
  } catch (err) {
    writeLogError(err.message, query);
    res.status(500).json({ message: err.message });
    console.log(err);
  }
};
module.exports.VerifyToken = (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res
      .status(401)
      .json({ status: "error", message: "No token provided" });
  }
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid or expired token" });
    }
    // const expDate = new Date(decoded.exp * 1000).toISOString();
    res.json({
      status: "success",
      message: "Access granted",
      user: decoded
      // timeout: expDate,
    });
  });
};
module.exports.getIPaddress = async (req, res) => {
  try {
    const clientIp = req.connection.remoteAddress;
    const ip = clientIp.includes(":") ? clientIp.split(":").pop() : clientIp;

    res.status(200).send({ ip: ip });
  } catch (error) {
    writeLogError(err.message, "Cannot get IP address");
    res.status(500).json({ message: error.message });
  }
};
