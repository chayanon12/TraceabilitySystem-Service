const {
  ConnectPG_DB,
  DisconnectPG_DB,
  ConnectOracleDB,
  DisconnectOracleDB,
} = require("../Conncetion/DBConn.cjs");
const { writeLogError } = require("../Common/LogFuction.cjs");
const oracledb = require("oracledb");

module.exports.SetConfirmConnectRollLeaf = async function (req, res) {
  const { dataList } = req.body;
  const json_convertdata = JSON.stringify(dataList);
  console.log(dataList,"dataList")
  console.log(json_convertdata,"json_convertdata")
  var query = "";
  try {
    const client = await ConnectPG_DB();
    const { dataList } = req.body;
    const json_convertdata = JSON.stringify(dataList);
    query += `CALL "Traceability".trc_023_confrollleaf_setconfirmconrollleaf('[${json_convertdata}]','')`;
    const result = await client.query(query);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows);
      DisconnectPG_DB(client);
    }
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

module.exports.CallFPCFlowConfirmConnectRollLeaf = async function (req, res) {
  let strSQL = "FPC_PROCESS_FLOW_API.FPC_PROC_FLOW_ROLL_LEAF";
  
  try {
    const { P_FLOW_ID, P_LOT_NO, P_RESULT } = req.body;
    const connection = await ConnectOracleDB("PCTTTEST");
    const result = await connection.execute(
      `BEGIN
         FPC.TRC_COMMON_TRACEABILITY.FPC_PROC_FLOW_ROLL_LEAF(
           :P_FLOW_ID,      
           :P_LOT_NO,       
           :P_RESULT,       
           :P_ERROR         
         );
       END;`,
      {
        P_FLOW_ID: P_FLOW_ID || "",
        P_LOT_NO: P_LOT_NO || "",
        P_RESULT: P_RESULT || "",
        P_ERROR: {
          dir: oracledb.BIND_OUT,
          type: oracledb.STRING,
          maxSize: 250,
        },
      }
    );
    const strReturn = result.outBinds.P_ERROR;

    // InsertCallFPCSheetLeadTimeResult(data);
    if (strReturn) {
      strReturn = strSQL + " : " + strReturn;
    }
    res.status(200).json(strReturn);
  } catch (error) {
    console.error("Error executing procedure:", error.message);
    res.status(500).send("Error executing procedure");
  } 
};
