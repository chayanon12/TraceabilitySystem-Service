const {
    ConnectPG_DB,
    DisconnectPG_DB,
    ConnectOracleDB,
    DisconnectOracleDB,
  } = require("../Conncetion/DBConn.cjs");
  const oracledb = require("oracledb");
  const { writeLogError } = require("../Common/LogFuction.cjs");
  const dateFns = require("date-fns");
  const { Query } = require("pg");

  module.exports.GetConfirmToolingByLot = async function (req, res) {
    var query = "";
    try {
      const Conn = await ConnectOracleDB("PCTTTEST");
      const { strLot,strProcList } = req.body;
      console.log(strLot,strProcList, "GetConfirmToolingByLot");
      // {"strLot":"130272927","strProcList":"W/H"}
      const data1 =strProcList.map((value)=>`'${value}'`).join(", ")
      console.log(data1,'data1')
      query += ` SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_GetConfirmToolingByLot( '${strLot}','${data1}') AS DATA1 FROM DUAL`;
      console.log(query)
      const result = await Conn.execute(query);
        let data=[]
        console.log(result.rows)
        if(result.rows[0][0].length>0){
          data = [
            {
              PROCESS: result.rows[0][0][0][0],
            }]
        }
        DisconnectOracleDB(Conn);
        res.status(200).json(result.rows);
    } catch (error) {
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  };

  module.exports.GetCheckConfirmMagazineBySerial = async function (req, res) {
    console.log("GetCheckConfirmMagazineBySerial");
    var query = "";
    try {
      const { dataList } = req.body;
      //('[{"strSerial":"0340C2007008741","strPlantCode":"5"}]')
      const client = await ConnectPG_DB();
      const json_convertdata = JSON.stringify(dataList);
      query += `select * from "Traceability".trc_054_connectboard_getcheckconfirmmagazinebyserial('[${json_convertdata}]')`;
      console.log(query)
      const result = await client.query(query); 
      res.status(200).json(result.rows);
      await DisconnectPG_DB(client);
    } catch (error) {
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  };  