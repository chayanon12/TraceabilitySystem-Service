const {
    ConnectPG_DB,
    DisconnectPG_DB,
    ConnectOracleDB,
    DisconnectOracleDB,
  } = require("../Conncetion/DBConn.cjs");
  const { writeLogError } = require("../Common/LogFuction.cjs");

  module.exports.GetBangdingMachineData = async function (req, res) {
    var query = "";
    try {
        const {dataList} = req.body;
          const client = await ConnectPG_DB();
          const json_convertdata = JSON.stringify(dataList);
          query += ` SELECT * from "Traceability".trc_014_auto_bendingtime_getbangdingmachinedata('[${json_convertdata}]')`;
          const result = await client.query(query);
          res.status(200).json(result.rows);
          await DisconnectPG_DB(client);
        } catch (error) {
          writeLogError(error.message, query);
          res.status(500).json({ message: error.message });
        }
  };
  module.exports.SetSerialBendingData = async function (req, res) {
    console.log('g-hkkkk')
    var query = "";
    let _strError ='';
    try {
      const client = await ConnectPG_DB();
      let { dataList } = req.body;
      console.log(dataList,"daddadad")
      const json_convertdata = JSON.stringify(dataList);
      console.log(json_convertdata,': dataList')
      query = `CALL "Traceability".trc_014_auto_bendingtime_setserialbendingdata('${json_convertdata}','');`;
      const result = await client.query(query);
      console.log(result.rows[0].p_error,'log' )
      if (result.rows[0].p_error !== "") {
        _strError=result.rows[0].p_error
      }
      res.status(200).json(_strError);
    } catch (error) {
      writeLogError(error.message, query);
      res.status(500).json({ message:"Can not connect database!"});
    }
  };
 


