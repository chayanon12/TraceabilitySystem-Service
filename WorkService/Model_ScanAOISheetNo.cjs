const {
    ConnectPG_DB,
    DisconnectPG_DB,
    ConnectOracleDB,
    DisconnectOracleDB,
} = require("../Conncetion/DBConn.cjs");
const { writeLogError } = require("../Common/LogFuction.cjs");

module.exports.GetAOISheetCountbyLot = async function (req, res) {
    var query = "";
    var intCount = 0;
    try {
        const data = JSON.stringify(req.body);
        query = ` SELECT * FROM "Traceability".trc_056_aoisheetno_getaoisheetcountbylot('${data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        if (result.rows.length > 0) {
            intCount = result.rows[0].lot_count;
        }
        res.status(200).json(intCount);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.GetAOISheetDataByLot = async function (req, res) {
    var query = "";
    try {
        const data = JSON.stringify(req.body);
        query = ` SELECT * FROM "Traceability".trc_056_aoisheetno_getaoisheetdatabylot('${data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.GetAOISheetCount = async function (req, res) {
    var query = "";
    var intCount = 0;
    try {
        const data = JSON.stringify(req.body);
        query = ` SELECT * FROM "Traceability".trc_056_aoisheetno_getaoisheetcount('${data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        if (result.rows.length > 0) {
            intCount = result.rows[0].sheet_count;
        }
        res.status(200).json(intCount);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.SetAOISheetNo = async function (req, res) {
    var query = "";
    try {
        const data = JSON.stringify(req.body);
        query = ` CALL "Traceability".trc_056_aoisheetno_setaoisheetno('[${data}]',''); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.DeleteAOISheetNo = async function (req, res) {
    var query = "";
    try {
        const data = JSON.stringify(req.body);
        query = ` CALL "Traceability".trc_056_aoisheetno_deleteaoisheetno('${data}',''); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.fnGetAOISheetRejectData = async function (req, res) {
    var query = "";
    try {
      const Conn = await ConnectOracleDB("PCTTTEST");
      const { dtSerial, strseq, strleaf } = req.body;
      query += ` SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_GetAOIShtRejectData('${dtSerial}') AS DATA1 FROM DUAL`;
      const result = await Conn.execute(query);
      let data = [];
      if (result.rows[0][0].length > 0) {
        data = [
          {
            SEQ: strseq,
            LEAF: strleaf,
            SERIAL: dtSerial,
            SIDE: result.rows[0][0][0][4],
            PCS_NO: result.rows[0][0][0][10],
            REJECT_CODE: result.rows[0][0][0][11],
            REJECT_NAME: result.rows[0][0][0][12],
          },
        ];
      }
      DisconnectOracleDB(Conn);
      res.status(200).json(data);
    } catch (error) {
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  };