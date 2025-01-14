const {
    ConnectPG_DB,
    DisconnectPG_DB,
    ConnectOracleDB,
    DisconnectOracleDB,
  } = require("../Conncetion/DBConn.cjs");
  const oracledb = require("oracledb");
  const { writeLogError } = require("../Common/LogFuction.cjs");

  module.exports.GetConfirmSheetDataAllByLot = async function (req, res) {
    var query = "";
  
    try {
      const client = await ConnectPG_DB();
      const { dataList  } = req.body;
      const json_convertdata = JSON.stringify(dataList);

      query += `select * from "Traceability".trc_025_packing_confirm_sheet('[${json_convertdata}]');`;
      const result = await client.query(query);

  
        res.status(200).json(result.rows);

        await DisconnectPG_DB(client);
     
    } catch (error) {
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  };

  module.exports.SetConfirmPackingSheet = async function (req, res) {
    var query = "";
  
    try {
      const client = await ConnectPG_DB();
 
      const { dataList } = req.body;
      const json_convertdata = JSON.stringify(dataList);
      const query = `CALL "Traceability".trc_025_packingconfirm_setConfirmPackingSheet('[${json_convertdata}]', '')`;

      const result = await client.query(query);
        res.status(200).json(result.rows);
        

        await DisconnectPG_DB(client);
    
    } catch (error) {
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  };