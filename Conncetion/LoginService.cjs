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

// module.exports.login = async (req, res) => {
//   var query = "";
//   try {
//     const { User, Password } = req.body;
//     const Conn = await ConnectOracleDB("FPC");
//     query = `
//         SELECT NUL.LOGIN_ID ,NUL.FACTORY_CODE ,NUL.ID_CODE ,INITCAP(NUL.USER_NAME) AS USER_NAME,INITCAP(NUL.USER_SURNAME) AS USER_SURNAME,NUL.EMAIL_ADD
//         FROM NAP_USER_LOGIN NUL
//         WHERE UPPER(NUL.USER_LOGIN) = UPPER('${User}')
//             AND UPPER(NUL.USER_PASSWORD) = UPPER('${Password}')
//             AND NUL.USER_STATUS = 'A' `;
//     const result = await Conn.execute(query);
//     if (result.rows.length > 0) {
//       res.status(200).json(result.rows);
//       DisconnectOracleDB(Conn);
//     } else {
//       res.status(401).json({ message: "Invalid User or Password" });
//       DisconnectOracleDB(Conn);
//     }
//   } catch (err) {
//     writeLogError(err.message,query);
//     res.status(500).json({ message: err.message });
//     console.log(err);
//   }
// };

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
      // res.status(200).json(result.rows);
      const token = jwt.sign({ User, Password }, "yourSecretKey", {
        expiresIn: "1m",
      });
      console.log(token,now())
      res.status(200).json({ token: token,result:result.rows });
      DisconnectOracleDB(Conn);
    } else {
      res.status(401).json({ message: "Invalid User or Password" });
      DisconnectOracleDB(Conn);
    }
  } catch (err) {
    writeLogError(err.message, query);
    res.status(500).json({ message: err.message });
    console.log(err);
  }
};

module.exports.verifyToken = (req, res, next) => {
  let token ;
  if (req.headers.authorization !== "") {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) return res.status(401).json({ message: "Auth Error" });

  jwt.verify(token, "yourSecretKey", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    res.json({ success: true, decoded });
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
