const {
  ConnectPG_DB,
  DisconnectPG_DB,
  ConnectOracleDB,
  DisconnectOracleDB,
} = require("./DBConn.cjs");


module.exports.login = async (req, res) => {
  try {
    const { User, Password } = req.body;
    const Conn = await ConnectOracleDB("FPC");
    const query = `
        SELECT NUL.LOGIN_ID ,NUL.FACTORY_CODE ,NUL.ID_CODE ,INITCAP(NUL.USER_NAME) AS USER_NAME,INITCAP(NUL.USER_SURNAME) AS USER_SURNAME,NUL.EMAIL_ADD 		
        FROM NAP_USER_LOGIN NUL		
        WHERE UPPER(NUL.USER_LOGIN) = UPPER('${User}')		
            AND UPPER(NUL.USER_PASSWORD) = UPPER('${Password}')		
            AND NUL.USER_STATUS = 'A' `;
    const result = await Conn.execute(query);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows);
      DisconnectOracleDB(Conn);
    } else {
      res.status(401).json({ message: "Invalid User or Password" });
      DisconnectOracleDB(Conn);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err);
  }
};
