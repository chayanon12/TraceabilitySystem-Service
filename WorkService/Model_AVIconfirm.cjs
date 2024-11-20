const {
  ConnectPG_DB,
  DisconnectPG_DB,
  ConnectOracleDB,
  DisconnectOracleDB,
} = require("../Conncetion/DBConn.cjs");
const { writeLogError } = require("../Common/LogFuction.cjs");
const Fac = process.env.FacA1;

module.exports.GetData = async function (req, res) {
  var query = "";
  try {
    const client = await ConnectPG_DB();
    let { dataList } = req.body;
    const json_convertdata = JSON.stringify(dataList);
    console.log(json_convertdata);
    query += ` select * from "Traceability".trc_017_aviconfrim_getcheck('${json_convertdata}') `;

    const result = await client.query(query);

    if (result.rows.length > 0) {
      res.status(200).json(result.rows);
      console.log(result.rows);
      await DisconnectPG_DB(client);
    } else {
      res.status(204).json({ result: "Data Not Found" });
      await DisconnectPG_DB(client);
    }
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

module.exports.UpdateData = async function (req, res) {
    var query = "";
    try {
      const client = await ConnectPG_DB();
      let { dataList } = req.body;
      const json_convertdata = JSON.stringify(dataList);
      query += ` CALL "Traceability".trc_017_aviconfirm_updatedata('[${json_convertdata}]','') `;
  
      const result = await client.query(query);
      console.log(result.rows[0],'error')
      if (result.rows[0].p_error == ''){
        res.status(200).json({result:'Update Success'});
      }else{
        res.status(400).json({result:result.rows[0].p_error});
      }
    } catch (error) {
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  };

  module.exports.GetSerialBoxProductByProduct = async function (req, res) {
    let query = "";
    try {
      const Conn = await ConnectOracleDB("PCTTTEST");
      query += `SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_GetSBoxPByP('RGO-387W-0A') AS x  FROM DUAL`;
      const result = await Conn.execute(query);
      if (result.rows.length > 0) {
       
        let data =[ {
          'prdname':result.rows[0][0][0][0]
        }]
        res.status(200).json(data);
        console.log(result.rows,"data");
        DisconnectOracleDB(Conn);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  