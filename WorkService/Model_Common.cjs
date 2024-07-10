const {
  ConnectPG_DB,
  DisconnectPG_DB,
  ConnectOracleDB,
  DisconnectOracleDB,
} = require("../Conncetion/DBConn.cjs");
const oracledb = require("oracledb");
const { writeLogError } = require("../Common/LogFuction.cjs");

///------Example
module.exports.xxxxxx = async function (req, res) {
  try {
    var query = "";
    const client = await ConnectPG_DB();
    query = ``;
    const result = await client.query(query);
    await DisconnectPG_DB(client);

    res.status(200).json({ Result: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//FPC
module.exports.GetSerialProductByProduct = async function (req, res) {
  var query = "";
  var Fac = process.env.FacA1;
  const { prdName } = req.body;
  const jsondata = {strProduct: prdName, strPlantCode: Fac};
  const json_convertdata = JSON.stringify(jsondata);
  console.log(json_convertdata,'mayyy');
  try {
    const client = await ConnectPG_DB();
    query += `SELECT * from "Traceability".trc_000_common_getserialproductbyproduct('[${json_convertdata}]');`;

    const result = await client.query(query);

    if (result.rows.length > 0) {
      res.status(200).json(result.rows);
      await DisconnectPG_DB(client);
    }
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};
module.exports.GetProductNameByLot = async function (req, res) {
  var query = "";
  try {
    const Conn = await ConnectOracleDB("FPC");
    const {strLot} = req.body;
    query += `SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_GetProductNameByLot('${strLot}') as PRD_NAME  FROM DUAL`;
    const result = await Conn.execute(query);
    if (result.rows.length > 0) {
      res.status(200).json({prdName : result.rows[0]});
    }
    DisconnectOracleDB(Conn);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
}
///------Example

module.exports.GetProductData = async function (req, res) {
  try {
    var strplantcode = "5";
    var query = "";
    const client = await ConnectPG_DB();
    query = `SELECT * from "Traceability".trc_000_common_getproductdata('${strplantcode}')`;
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports.GetMOTRecordTimeData = async function (req, res) {
  var query = "";

  try {
    const client = await ConnectPG_DB();
    const { dataList } = req.body;
    const json_convertdata = JSON.stringify(dataList);
    query += `select * from "Traceability".trc_000_common_GetMOTRecordTimeData('[${json_convertdata}]');`;
    console.log(query)
    const result = await client.query(query);

    if (result.rows.length > 0) {
      res.status(200).json(result.rows);
      await DisconnectPG_DB(client);
    }
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};
module.exports.SetRollSheetTrayTable = async function (req, res) {
  var query = "";

  try {
    const client = await ConnectPG_DB();
    const { dataList } = req.body;
    // console.log('Query',dataList)
    const json_convertdata = JSON.stringify(dataList);
    query += `CALL "Traceability".trc_006_common_setrollsheettraytable('[${json_convertdata}]','');`;
    const result = await client.query(query);
    // console.log(result.rows[0]._strerror,'result')
    if (result.rows[0]._strerror =='') {
      res.status(200).json(result.rows[0]);
      await DisconnectPG_DB(client);
     }
     else{
      res.status(200).json(result.rows[0]);
      await DisconnectPG_DB(client);
     }
  } catch (error) {
    
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};


module.exports.getconnectshtmastercheckresult = async function (req, res) {
  try {
    var query = "";
    const client = await ConnectPG_DB();
    query = ``;
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json({ Result: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getconnectshtplasmatime = async function (req, res) {
  try {
    var query = "";
    const client = await ConnectPG_DB();
    query = ``;
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json({ Result: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getfactory = async function (req, res) {
  try {
    var query = "";
    const client = await ConnectPG_DB();
    query = ``;
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json({ Result: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getlotserialcountdata = async function (req, res) {
  var query = "";
  try {
    const client = await ConnectPG_DB();
    const { dataList } = req.body;
    const json_convertdata = JSON.stringify(dataList);
    console.log(json_convertdata)
    query += ` SELECT * from "Traceability".trc_000_common_getlotserialcountdata('[${json_convertdata}]')`;
    console.log(query)
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

module.exports.getWeekCodebyLot = async function (req, res) {
  var query = "";
  try {
    const connect = await ConnectOracleDB("FPC");
    const { STRLOT, STRPROC } = req.body;
    query += `SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_GETWEEKCODEBYLOT('${STRLOT}', '${STRPROC}')AS data1 FROM dual`;
    const result = await connect.execute(query);
    await DisconnectOracleDB(connect);
    res.status(200).json(result.rows.flat());
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

module.exports.GetProductDataByLot = async function (req, res) {
  console.log('เข้า')
  var query = "";
  try {
    const connect = await ConnectOracleDB("FPC");
    const { strLot} = req.body;
    // console.log(strLot.strLot)
    // // let data={
    // //   strLot:strLot

    // // }
    // strLot.priority=process.env.priority
    
    console.log(strLot)
    query += `SELECT  FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_GETPRODUCTDATABYLOT('${strLot}','${process.env.priority}') AS data1 FROM dual`;
    const result = await connect.execute(query);
    await DisconnectOracleDB(connect);
    res.status(200).json(result.rows);
  } catch (error) {
    writeLogError(error.message, query);
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports.getlotsheetcountdata = async function (req, res) {
  try {
    var query = "";
    const client = await ConnectPG_DB();
    query = ``;
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json({ Result: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getlotsheetdataallbylot = async function (req, res) {
  try {
    var query = "";
    const client = await ConnectPG_DB();
    query = ``;
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json({ Result: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getproductdata = async function (req, res) {
  try {
    var query = "";
    const client = await ConnectPG_DB();
    query = ``;
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json({ Result: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getProductShtGroup = async function (req, res) {
  var query = "";
  try {
      const _data = JSON.stringify(req.body);
      console.log('prdName:', _data);
      query = ` SELECT * FROM "Traceability".trc_000_common_getproductshtgroup('${_data}'); `;

      const client = await ConnectPG_DB();
      const result = await client.query(query);
      await DisconnectPG_DB(client);
      res.status(200).json(result.rows);
  } catch (err) {
      writeLogError(err.message, query);
      res.status(500).json({ message: err.message });
  }
};

module.exports.getProductShtBIN = async function (req, res) {
  var query = "";
  try {
      const bingroup = JSON.stringify(req.body);
      console.log('bingroup:', bingroup);
      query = ` SELECT * FROM "Traceability".trc_000_common_getproductshtbin('${bingroup}'); `;

      const client = await ConnectPG_DB();
      const result = await client.query(query);
      await DisconnectPG_DB(client);
      res.status(200).json(result.rows);
  } catch (err) {
      writeLogError(err.message, query);
      res.status(500).json({ message: err.message });
  }
};

module.exports.getproductshtinspectbylot = async function (req, res) {
  try {
    var query = "";
    const client = await ConnectPG_DB();
    const p_data = JSON.stringify(req.body);
    query = `SELECT * FROM "Traceability".trc_000_common_getproductshtinspectxoutbylot('${p_data}');`;
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getproductshtinspectXOutbylot = async function (req, res) {
  try {
    var query = "";
    const client = await ConnectPG_DB();
    const p_data = JSON.stringify(req.body);
    query = `SELECT * FROM "Traceability".trc_000_common_getproductshtinspectxoutbylot('${p_data}');`;
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getproductshtinspectXOut = async function (req, res) {
  try {
    var query = "";
    const client = await ConnectPG_DB();
    const p_data = JSON.stringify(req.body);
    query = `SELECT * FROM "Traceability".trc_000_common_getproductshtinspectxout('${p_data}');`;
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getproductshtinspectdup = async function (req, res) {
  try {
    var query = "";
    const client = await ConnectPG_DB();
    const json_data = JSON.stringify(req.body);
    query = `SELECT * FROM "Traceability".trc_000_common_getproductshtinspectdup('${json_data}');`;
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json({ Result: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.setLotSheetInsXOut = async function (req, res) {
  try {
    var query = "";
    const client = await ConnectPG_DB();
    const p_data = JSON.stringify(req.body);
    query = `CALL "Traceability".trc_000_common_setlotsheetinsxout('${p_data}');`;
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getrollleafduplicate = async function (req, res) {
  try {
    var query = "";
    const client = await ConnectPG_DB();
    query = ``;
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json({ Result: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getserialduplicate = async function (req, res) {
  try {
    var query = "";
    const client = await ConnectPG_DB();
    query = ``;
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json({ Result: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getserialduplicateconnectsht = async function (req, res) {
  var query = "";
  try {
    const client = await ConnectPG_DB();
    const { Serial } = req.body;
    query += `SELECT  * FROM "Traceability".trc_000_common_getserialduplicateconnectsht('${Serial}')`;  //--THA92770P53J17J5B
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    const data = JSON.parse(dataJsonString);
    console.log(data);
    res.status(200).json(result.rows.flat());
  } catch (error) {
    writeLogError(error.message, query);
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports.getserialforupdate = async function (req, res) {
  try {
    var query = "";
    const client = await ConnectPG_DB();
    query = ``;
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json({ Result: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getserialpassbylotpacking = async function (req, res) {
  try {
    var query = "";
    const client = await ConnectPG_DB();
    query = ``;
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json({ Result: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getserialtouchupdata = async function (req, res) {
  try {
    var query = "";
    const client = await ConnectPG_DB();
    query = ``;
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json({ Result: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getsheetdatabyserialno = async function (req, res) {
  try {
    var query = "";
    const client = await ConnectPG_DB();
    query = ``;
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json({ Result: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getsheetduplicateconnectshttyped = async function (req, res) {
  try {
    var query = "";
    const client = await ConnectPG_DB();
    query = ``;
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json({ Result: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getsheetduplicateconnectshttypenone = async function (req, res) {
  try {
    var query = "";
    const client = await ConnectPG_DB();
    query = ``;
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json({ Result: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getsheetnobyserialno = async function (req, res) {
  try {
    var query = "";
    const client = await ConnectPG_DB();
    query = ``;
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json({ Result: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getsystemdate = async function (req, res) {
  try {
    var query = "";
    const client = await ConnectPG_DB();
    query = ``;
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json({ Result: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getworkingdate = async function (req, res) {
  try {
    var query = "";
    const client = await ConnectPG_DB();
    query = ` SELECT * FROM "Traceability".trc_000_common_getworkingdate(); `;
    const result = await client.query(query);

    console.log(result.rows);
    await DisconnectPG_DB(client);
    res.status(200).json({ Result: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.GetReflowRecordTimeData = async function (req, res) {
  var query = "";

  try {
    const client = await ConnectPG_DB();
    const {dataList} = req.body;
    const json_convertdata = JSON.stringify(dataList);

    query = `select * from "Traceability".trc_000_common_GetReflowRecordTimeData('[${json_convertdata}]');`;
    const result = await client.query(query);
    if (result.rows !== "") {
      res.status(200).json(result.rows[0]);
      await DisconnectPG_DB(client);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.CallSMTReflowRecordTimeResult = async function (req, res) {
  var query = "";
  var json_convertdata = "";
  try {
    const client = await ConnectPG_DB();
    const {dataList} = req.body;
    console.log(dataList)
    json_convertdata = JSON.stringify(dataList);
    console.log(json_convertdata);
    query = `call "Traceability".trc_000_common_CallSMTReflowRecordTimeResult($1::jsonb,'');`;
    // query = `call "Traceability".trc_000_common_CallSMTReflowRecordTimeResult('[${json_convertdata}]','');`;

    const result = await client.query(query, [json_convertdata]);
    // const result = await client.query(query);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
      await DisconnectPG_DB(client);
      return;
    } else {
      await DisconnectPG_DB(client);
    }
  } catch (error) {
    query += `${json_convertdata}`;
    writeLogError(error.message, query);
    console.log(error, "error");
    res.status(500).json({ message: error.message });
  }
};


module.exports.DeleteReflowRecordTimeData = async function (req, res) {
  var query = "";
  try {
    const client = await ConnectPG_DB();
    const {strSheetNo,strPlantCode} = req.body;
    const dataList = {strSheetNo:strSheetNo,strPlantCode:strPlantCode}
    json_convertdata = JSON.stringify(dataList);
    query = `call "Traceability".trc_000_common_DeleteReflowRecordTimeData('[${json_convertdata}]','');`;
    const result = await client.query(query);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
      await DisconnectPG_DB(client);
      return;
    } else {
      await DisconnectPG_DB(client);
    }
  } catch (error) {
    writeLogError(error.message, query);
    console.log(error, "error");
    res.status(500).json({ message: error.message });
  }
};

module.exports.getLotSerialRecordTimeData = async function (req, res) {
  var query = "";

  try {
    const client = await ConnectPG_DB();
    const json_data = JSON.stringify(req.body);
    query = `select * from "Traceability".trc_000_common_GetLotSerialRecordTimeData('[${json_data}]');`;
    const result = await client.query(query);
    if (result.rows !== "") {
      res.status(200).json(result.rows[0]);
      await DisconnectPG_DB(client);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.SetSerialRecordTimeTrayTable = async function (req, res) {
  var query = "";
  var json_convertdata = "";
  try {
    const client = await ConnectPG_DB();
    const {dataList} = req.body;
    console.log(dataList)
    json_convertdata = JSON.stringify(dataList);
    console.log(json_convertdata);
    query = `call "Traceability".trc_000_common_setserialrecordtimetraytable($1::jsonb,'');`;

    const result = await client.query(query, [json_convertdata]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
      await DisconnectPG_DB(client);
      return;
    } else {
      await DisconnectPG_DB(client);
    }
  } catch (error) {
    query += `${json_convertdata}`;
    writeLogError(error.message, query);
    console.log(error, "error");
    res.status(500).json({ message: error.message });
  }
};

module.exports.getSerialRecordTimeTrayTable = async function (req, res) {
  var query = "";
  try {
    const data = JSON.stringify(req.body); 
    console.log('Data:', data);

    query = `SELECT * FROM "Traceability".trc_000_common_getserialrecordtimetraytable('[${data}]');`;

    const client = await ConnectPG_DB(); 
    const result = await client.query(query); 

    if (result.rows !== "") {
      res.status(200).json(result.rows[0]);
      await DisconnectPG_DB(client);
    }
  } catch (err) {
    console.error(err.message);
    writeLogError(err.message, query); 
    res.status(500).json({ message: err.message }); 
  }
};

module.exports.SetSerialLotShtELTTable = async function (req, res) {
  var query = "";

  try {
    const client = await ConnectPG_DB();
    const { dataList } = req.body;
    const json_convertdata = JSON.stringify(dataList);
    query += `call "Traceability".trc_000_common_SetSerialLotShtELTTable('[${json_convertdata}]','')`;
    
    const result = await client.query(query);
    console.log(result,'result')
    if (result.rows !='') {
      res.status(200).json(result.rows);
      await DisconnectPG_DB(client);
    }
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};


module.exports.SetSerialLotShtGradeTable = async function (req, res) {
  var query = "";
  var _strError=''
  var SCAN_RESULT=''
  var REMARK=''
  const { dataList } = req.body;
  try {
    const json_convertdata = JSON.stringify(dataList);
    console.log(json_convertdata)
    const client = await ConnectPG_DB(); 
    query = `CALL "Traceability".trc_000_common_setseriallotshtgradetable('${json_convertdata}','')`;
    const result = await client.query(query); 
    _strError=result.rows[0.]._strerror
    // if (result.rows !== "") {
    if(_strError!=''){
      SCAN_RESULT='NG'
      REMARK=_strError
    }
      res.status(200).json({strError:_strError,SCAN_RESULT:SCAN_RESULT,REMARK:REMARK});
      await DisconnectPG_DB(client);
    // }
  } catch (err) {
    _strError="Can not connect database!"
    console.error(err.message);
    writeLogError(err.message, query); 
    res.status(500).json({ strError:_strError,SCAN_RESULT:'NG',REMARK:err.message }); 
  }
};

// module.exports.GetSerialProductByProduct = async function (req, res) {
//   var query = "";
//   try {
//     const client = await ConnectPG_DB();
//     const { dataList } = req.body;
//     const json_convertdata = JSON.stringify(dataList);
//     console.log('เข้า',json_convertdata)
//     query += `SELECT "Traceability".trc_000_common_getserialproductbyproduct('[${json_convertdata}]')`;
//     const result = await client.query(query);
//     console.log(result,'result')
//       res.status(200).json(result);
//       await DisconnectPG_DB(client);
//   } catch (error) {
//     writeLogError(error.message, query);
//     res.status(500).json({ message: error.message });
//   }
// };