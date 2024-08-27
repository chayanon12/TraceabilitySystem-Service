const {
  ConnectPG_DB,
  DisconnectPG_DB,
  ConnectOracleDB,
  DisconnectOracleDB,
} = require("../Conncetion/DBConn.cjs");
const oracledb = require("oracledb");
const { writeLogError } = require("../Common/LogFuction.cjs");
const dateFns = require('date-fns');
const { Query } = require("pg");

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
  const jsondata = { strProduct: prdName, strPlantCode: Fac };
  const json_convertdata = JSON.stringify(jsondata);
  try {
    const client = await ConnectPG_DB();
    query += `SELECT * from "Traceability".trc_000_common_getserialproductbyproduct('[${json_convertdata}]');`;

    const result = await client.query(query);

    res.status(200).json(result.rows);
    await DisconnectPG_DB(client);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};
module.exports.GetProductNameByLot = async function (req, res) {
  var query = "";
  var _strPrdName = "";
  try {
    const Conn = await ConnectOracleDB("FPC");
    const { strLot } = req.body;
    query += `SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_GetProductNameByLot('${strLot}') as PRD_NAME  FROM DUAL`;
    const result = await Conn.execute(query);

    if (result.rows[0][0] != null) {
      _strPrdName = result.rows[0];
    }
    // if (result.rows.length > 0) {
    res.status(200).json({ prdName: _strPrdName });
    // }
    DisconnectOracleDB(Conn);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};
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
    const result = await client.query(query);
    ("Schemas");

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
    const json_convertdata = JSON.stringify(dataList);
    query += `CALL "Traceability".trc_006_common_setrollsheettraytable('[${json_convertdata}]','');`;
    const result = await client.query(query);
    if (result.rows[0]._strerror == "") {
      res.status(200).json(result.rows[0]);
      await DisconnectPG_DB(client);
    } else {
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
    query += ` SELECT * from "Traceability".trc_000_common_getlotserialcountdata('[${json_convertdata}]')`;
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
  var SERIAL_DATE_START_WEEK_CODE= '01/01/1970' //ENV
  var _strReturn=''
  var _strDate=''
  try {
    const connect = await ConnectOracleDB("FPC");
    const { _strLot, _strProc,_strWeekType ,_strSerialInfo} = req.body;
    console.log('getWeekCodebyLot ','----',_strLot,'----',_strProc,'----',_strWeekType ,'----',_strSerialInfo)
    query += `SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_GETWEEKCODEBYLOT('${_strLot}', '${_strProc}')AS data1 FROM dual`;
    const result = await connect.execute(query);
    await DisconnectOracleDB(connect);
    if(result.rows[0][0]!=null){
      _strDate=result.rows[0][0]
      const [day, month, year] = _strDate.split('/');
      const dtToday = new Date(Date.UTC(year, month - 1, day));
      const [startDay, startMonth, startYear] = SERIAL_DATE_START_WEEK_CODE.split('/');
      const dtStartDate = new Date(Date.UTC(startYear, startMonth - 1, startDay));
      const dtNextSaturday = new Date(dtToday);
      dtNextSaturday.setUTCDate(dtToday.getUTCDate() + (6 - dtToday.getUTCDay()));
      const weekNumber = (date) => {
          const start = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
          const dayOfYear = ((date - start) / 86400000) + 1;
          return Math.ceil(dayOfYear / 7);
      };
      let WeekCnt = weekNumber(dtNextSaturday).toString().padStart(2, '0');
      
      const dtNow = dtToday;
      const strMonth = (dtNow.getUTCMonth() + 1).toString().padStart(2, '0');
      let strYear;
      if (strMonth === '12' && WeekCnt === '01') {
          strYear = (dtNow.getUTCFullYear() + 1).toString().trim();
      } else {
          strYear = dtNow.getUTCFullYear().toString().trim();
      }
      const LOT_NO = _strLot;
      let txtLot = '';
      let txtLot2 = '';
      let txtWeek = '';
      let txtYear = '';
      let txtMonth = '';
      let txtDay = '';

      switch (_strWeekType) {
        case "Y":
        case "R":
        case "I":
        case "M":
        case "C":
            if (LOT_NO !== "") {
                txtLot = LOT_NO;
            }
            txtWeek = WeekCnt;
            if (_strWeekType === "Y") {
              
                const strFirst = strYear[0];
                
                const TempStr = await ConvertBase34(year - parseInt(strFirst + "000"));
                console.log(strYear,'---',strYear[0],strFirst + "000",TempStr)
                txtYear = TempStr[TempStr.length - 1];
              
            } else {
                txtYear = strYear[3];
            }
            txtDay = dtToday.getUTCDay(); 
           
            _strReturn = `${txtYear}${txtWeek}${txtDay}`;
            break;

        case "W":
            txtYear = '';
            txtDay = '';
            
            if (LOT_NO !== "") {
                txtLot = LOT_NO;
                txtLot2 = LOT_NO.slice(-2);
            }
            txtWeek =await ConvertBase34(parseInt(strYear[strYear.length - 1] + WeekCnt));
            txtWeek = txtWeek.padStart(2, '0');
            _strReturn = `${txtWeek}${txtLot2}`;
            break;

        case "J":
            txtDay =await ChangeBase34(dtToday.getUTCDate());
            txtMonth =await ChangeBase34(dtToday.getUTCMonth() + 1);
            txtWeek =await ConvertBase34(parseInt(strYear[strYear.length - 1] + WeekCnt));
            txtYear = strYear;
            _strReturn = `${txtMonth}${txtDay}`;
            break;

        case "N":
            const intDayDiff = Math.floor((dtToday - dtStartDate) / (1000 * 60 * 60 * 24));
            const strDayCode =await Convert000(ConvertBase34(intDayDiff));
            txtMonth = strDayCode;
            txtWeek = strDayCode[1];
            txtYear = strDayCode[0];
            txtDay = strDayCode[2];
            _strReturn = strDayCode;
            break;

        case "U":
            txtDay =await ChangeBase34(dtToday.getUTCDate());
            txtMonth =await ChangeBase34(dtToday.getUTCMonth() + 1);
            _strReturn = `${txtMonth}${txtDay}`;
            break;

        case "S":
            const formattedDate = dtToday.toISOString().slice(2, 10).replace(/-/g, ''); // yyMMdd
            console.log('formattedDate :',formattedDate,parseInt(formattedDate),await ConvertBase34(parseInt(formattedDate)),await Convert0000(ConvertBase34(parseInt(formattedDate))))
            _strReturn =await Convert0000(ConvertBase34(parseInt(formattedDate)));
            break;

        case "D":
            const serialDate = new Date(_strSerialInfo.split('/').reverse().join('-') + "T00:00:00");
            const dateDiff = Math.floor((dtToday - serialDate) / (1000 * 60 * 60 * 24));
            _strReturn =await Convert0000(dateDiff);
            break;

        default:
            txtLot2 = LOT_NO.slice(-2);
            _strReturn = `${txtWeek}${txtLot2}`;
            break;
    }
     
    }
    console.log('----',_strReturn)
    // console.log(_strDate ,'1 ',dtToday,' ',dtStartDate,' ',dtNextSaturday,' ',WeekCnt,' ',dtNow,' ',strMonth,' ',strYear,' ',_strReturn)
    res.status(200).json(_strReturn);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

const Convert0000 = async (strText) => {
  return ("0000" + strText).slice(-4);
};

const Convert000= async (strText) =>{
  let result = "000" + strText;
  return result.slice(-3);
}

const ConvertBase34 = async (lngNumber2) => {
  let shou;
  let Amari = [];
  let i = 0;
  let StrTemp = "";
  let LngNumber = lngNumber2;
  // console.log(lngNumber2);
  do {
    Amari[i] = LngNumber % 34;
    shou = Math.floor(LngNumber / 34);
    if (shou === 0) {
      break;
    }
    i++;
    if (shou < 34) {
      Amari[i] = shou;
      break;
    }
    LngNumber = shou;
  } while (true);

  for (let j = i; j >= 0; j--) {
    StrTemp += await ChangeBase34(Amari[j]);
  }
  return StrTemp;
};


const ChangeBase34 = async (lngNumber2) =>  {
  const strChange = "0123456789ABCDEFGHJKLMNPQRSTUVWXYZ";
  return strChange[lngNumber2];
}


module.exports.GetProductDataByLot = async function (req, res) {
  var query = "";
  try {
    const connect = await ConnectOracleDB("FPC");
    const { strLot } = req.body;
    query += `SELECT  FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_GETPRODUCTDATABYLOT('${strLot}','${process.env.priority}') AS data1 FROM dual`;
    const result = await connect.execute(query);
    await DisconnectOracleDB(connect);
    res.status(200).json(result.rows);
  } catch (error) {
    writeLogError(error.message, query);
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



module.exports.getserialduplicateconnectsht = async function (req, res) {
  var query = "";
  try {
    const client = await ConnectPG_DB();
    const { Serial } = req.body;
    query += `SELECT  * FROM "Traceability".trc_000_common_getserialduplicateconnectsht('${Serial}')`; //--THA92770P53J17J5B
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    const data = JSON.parse(dataJsonString);
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
    const { dataList } = req.body;
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
    const { dataList } = req.body;
    json_convertdata = JSON.stringify(dataList);
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
    const { strSheetNo, strPlantCode } = req.body;
    const dataList = { strSheetNo: strSheetNo, strPlantCode: strPlantCode };
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

module.exports.getleafduplicateconnectroll = async function (req, res) {
  var query = "";
  intCount = 0;
  strLeafDup = "";

  try {
    const client = await ConnectPG_DB();
    const { dataList } = req.body;

    json_convertdata = JSON.stringify(dataList);
    query = `select * from "Traceability".trc_000_common_getleafduplicateconnectroll('[${json_convertdata}]');`;
    const result = await client.query(query);
    if (result.rows.length > 0) {
      if (
        dataList._strRollLeaf == result.rows[0].roll_leaf &&
        dataList._strRollNo == result.rows[0].roll_no &&
        dataList._strLot == result.rows[0].lot_no &&
        dataList._intSeq == result.rows[0].sheet_seq
      ) {
        intCount = 0;
      } else {
        intCount = 1;
      }
    }
    _strLeafDup = "";
    res.status(200).json(intCount);
    await DisconnectPG_DB(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.SetSerialRecordTimeTrayTable = async function (req, res) {
  var query = "";
  var json_convertdata = "";
  try {
    const client = await ConnectPG_DB();
    const { dataList } = req.body;
    json_convertdata = JSON.stringify(dataList);
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
    if (result.rows != "") {
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
  var _strError = "";
  var SCAN_RESULT = "";
  var REMARK = "";
  const { dataList } = req.body;
  try {
    const json_convertdata = JSON.stringify(dataList);

    const client = await ConnectPG_DB();
    query = `CALL "Traceability".trc_006_common_SetSerialLotShtGradeTable('${json_convertdata}','')`;
    const result = await client.query(query);
    _strError = result.rows[0]._strerror;

    if (_strError == null) {
      _strError = "";
    }
    if (_strError != "") {
      SCAN_RESULT = "NG";
      REMARK = _strError;
    }
    res
      .status(200)
      .json({ strError: _strError, SCAN_RESULT: SCAN_RESULT, REMARK: REMARK });
    await DisconnectPG_DB(client);
  } catch (err) {
    _strError = "Can not connect database!";
    console.error(err.message);
    writeLogError(err.message, query);
    res
      .status(500)
      .json({ strError: _strError, SCAN_RESULT: "NG", REMARK: err.message });
  }
};

module.exports.get_spi_aoi_result = async function (req, res) {
  var query = "";
  try {
    const client = await ConnectPG_DB();
    const { dataList } = req.body;
    const json_convertdata = JSON.stringify(dataList);

    query += `CALL "Traceability".trc_006_common_get_spi_aoi_result('[${json_convertdata}]','')`;
    const result = await client.query(query);
    res.status(200).json(result.rows[0]._strreturn);
    await DisconnectPG_DB(client);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

module.exports.getSerialPassByLot = async function (req, res) {
  var query = "";
  try {
    const data = JSON.stringify(req.body);
    query = ` SELECT * FROM "Traceability".trc_000_common_getserialpassbylot('${data}'); `;

    const client = await ConnectPG_DB();
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    writeLogError(err.message, query);
    res.status(500).json({ message: err.message });
  }
};

module.exports.SetSerialLotTrayTable = async function (req, res) {
  var query = "";

  try {
    const client = await ConnectPG_DB();
    const { dataList } = req.body;
    const json_convertdata = JSON.stringify(dataList);
    const query = `CALL "Traceability".trc_000_common_setseriallottraytable($1, '')`;

    const result = await client.query(query, [json_convertdata]);
    if (result.rows != "") {
      res.status(200).json(result.rows[0]);
      await DisconnectPG_DB(client);
    }
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

//เปลี่ยนเป็น env
module.exports.GetFinalGateMasterCheckResult = async function (req, res) {
  var query = "";
  var _strResult = "NG";
  var FINAL_GATE_MASTER_FLG = process.env.VITE_FINAL_GATE_MASTER_FLG;
  var _strPlantCode = process.env.FacA1;
  var FINAL_GATE_MASTER_CODE = process.env.VITE_FINAL_GATE_MASTER_CODE;
  var WORKING_START_TIME = process.env.VITE_WORKING_START_TIME;
  var _FINAL_GATE_MASTER_TIME = process.env.VITE__FINAL_GATE_MASTER_TIME;
  try {
    const client = await ConnectPG_DB();
    const { strProduct } = req.body;
    let datalist = {
      _strProduct: strProduct,
      _strPlantCode: _strPlantCode,
      FINAL_GATE_MASTER_CODE: FINAL_GATE_MASTER_CODE,
      WORKING_START_TIME: WORKING_START_TIME,
      _FINAL_GATE_MASTER_TIME: _FINAL_GATE_MASTER_TIME,
    };
    const json_convertdata = JSON.stringify(datalist);
    if (FINAL_GATE_MASTER_FLG == 1) {
      const query = `SELECT * from  "Traceability".trc_020_finalgate_getfinalgatemastercheckresult('[${json_convertdata}]');`;
      const result = await client.query(query);
      if (result.rows != "") {
        _strResult = result.rows[0].MASTER_RESULT;
      }
    } else {
      _strResult = "OK";
    }
    res.status(200).json(_strResult);
    await DisconnectPG_DB(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.GetSerialPassByLotPacking = async function (req, res) {
  var query = "";
  
  try {
    const data = JSON.stringify(req.body);
    query = ` SELECT * FROM "Traceability".trc_000_common_getserialpassbylotpacking('[${data}]'); `;
    console.log('query:',query)
    const client = await ConnectPG_DB();
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    writeLogError(err.message, query);
    res.status(500).json({ message: err.message });
  }
};

module.exports.GetSerialFinInspectResult = async function (req, res) {
  var query = "";
  var _strReturn = "SKIP FQC";
  try {
    // {
    //   "dataList":
    //     {"_strSerialNo": "TestSerialNo",
    //      "_strProc": "ZFIN",
    //      "_strPlantCode": "5" }
    // }
    const { dataList } = req.body;
    const json_convertdata = JSON.stringify(dataList);
    query += `select * from "Traceability".trc_000_common_getserialfininspectresult('[${json_convertdata}]');`;
    const client = await ConnectPG_DB();
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    if (result.rows.length > 0) {
      if (result.rows[0].row_count > 0) {
        _strReturn = "OK";
      }
    }
    res.status(200).json(_strReturn);
  } catch (err) {
    writeLogError(err.message, query);
    res.status(500).json({ message: err.message });
  }
};

module.exports.GetCheckChipDuplicate = async function (req, res) {
  var query = "";
  var _intSuccess = 0;
  try {
    // {
    //   "dataList":
    //     {"_strPrdName": "RGOZ-412MW-0A",//1
    //         "_strSerial": "TestSerial",//2
    //         "_strPlantCode": "5"//3
    //     }
    // }
    const { dataList } = req.body;
    const json_convertdata = JSON.stringify(dataList);
    query += `select * from "Traceability".trc_000_common_getcheckchipduplicate('[${json_convertdata}]');`;
    const client = await ConnectPG_DB();
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    if (result.rows.length > 0) {
      if (result.rows[0].test_result == "OK") {
        _intSuccess = 1;
      }
    }
    res.status(200).json(_intSuccess);
  } catch (err) {
    writeLogError(err.message, query);
    res.status(500).json({ message: err.message });
  }
};

module.exports.GetBoxCount = async function (req, res) {
  var query = "";
  var intCount = 0;
  try {
    const Conn = await ConnectOracleDB("PCTTTEST");
    const { prdName, boxNo } = req.body;
    console.log(prdName, boxNo ,"get Box count")
    query += ` SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_GetBoxCount( '${prdName}', '${boxNo}') AS DATA1 FROM DUAL`;
    const result = await Conn.execute(query);
    console.log(query,"query")
    if (result.rows.length > 0) {
      let data = [
        {
          BOX_COUNT: result.rows[0][0][0][0],
          BOX_QTY: result.rows[0][0][0][1],
        },
      ];

      if (data.length > 0) {
        intCount = data[0].BOX_COUNT;
      }
      res.status(200).json(intCount);
      DisconnectOracleDB(Conn);
    }
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

module.exports.GetCountTrayByBoxPacking = async function (req, res) {
  var query = "";
  try {
    const Conn = await ConnectOracleDB("PCTTTEST");
    const { prdName, boxNo, srtPack } = req.body;
    query += ` SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_GetCTrayBBoxPack( '${prdName}', '${boxNo}','${srtPack}') AS DATA1 FROM DUAL`;
    const result = await Conn.execute(query);
    if (result.rows.length > 0) {
      let data = [
        {
          BOX_COUNT: result.rows[0][0][0][0],
          PACKING_COUNT: result.rows[0][0][0][1],
        },
      ];

      //  if(data.length > 0){
      //   intCount = data[0].BOX_COUNT
      //  }

      res.status(200).json(data);
      DisconnectOracleDB(Conn);
    }
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};



module.exports.GetEFPCSheetInspectionResult = async function (req, res) {
  const {
    _strPlantCode,
    _strProduct,
    _strFrontSheetNo,
    _strBackSheetNo,
    _intPcsNo,
    _strAOMFlg,
    _strAOIFlg,
    _strOSTFlg,
    _strAVIFlg,
    _strResult,
  } = req.body;
  var _strRemark = "";
  _strResult = "OK";

  if (_strAOMFlg == "Y") {
  }
  if (_strAOIFlg == "Y") {
    var dtDataAOI;
    var strAOIResult = "";
     dtDataAOI = await GetSerialAOIEFPCResult(
      _strPlantCode,
      _strFrontSheetNo,
      _intPcsNo,
      _strProduct,
      "N"
    );
    if (dtDataAOI.length > 0) {
      strAOIResult = dtDataAOI[0]["AOI_RESULT"]; //ยังไม่ถูก
      if (
        strAOIResult != "" &&
        strAOIResult != "OK" &&
        strAOIResult != "PASS" &&
        strAOIResult != "GOOD"
      ) {
        _strResult = "NG";
        _strRemark = _strRemark + " AOI-EFPC: " + strAOIResult;
      }
    } else {
      dtDataAOI = await GetSerialAOIEFPCResult(
        _strPlantCode,
        _strBackSheetNo,
        _intPcsNo,
        _strProduct,
        "N"
      );
      if (dtDataAOI.length > 0) {
        strAOIResult = dtDataAOI[0]["AOI_RESULT"]; //ยังไม่ถูก
        if (
          strAOIResult != "" &&
          strAOIResult != "OK" &&
          strAOIResult != "PASS" &&
          strAOIResult != "GOOD"
        ) {
          _strResult = "NG";
          _strRemark = _strRemark + " AOI-EFPC: " + strAOIResult;
        }
      }
    }
  }
  if (_strOSTFlg == "Y") {
    var dtOSTData;
    var strOSTResult = "";
    dtOSTData = await GetSerialOSTResult(
      _strPlantCode,
      _strFrontSheetNo,
      _intPcsNo,
      "N"
    );
    if (dtOSTData.length > 0) {
      strOSTResult = dtOSTData[0]["OST_RESULT"];
      if (
        strOSTResult != "" &&
        strOSTResult != "OK" &&
        strOSTResult != "PASS" &&
        strOSTResult != "GOOD"
      ) {
        _strResult = "NG";
        _strRemark = _strRemark + " OST-EFPC: " + strOSTResult;
      }
    } else {
      dtOSTData = await GetSerialOSTResult(
        _strPlantCode,
        _strBackSheetNo,
        _intPcsNo,
        "N"
      );
      if (dtOSTData.length > 0) {
        strOSTResult = dtOSTData[0]["OST_RESULT"];
        if (
          strOSTResult != "" &&
          strOSTResult != "OK" &&
          strOSTResult != "PASS" &&
          strOSTResult != "GOOD"
        ) {
          _strResult = "NG";
          _strRemark = _strRemark + " OST-EFPC: " + strOSTResult;
        }
      }
    }
  }
  if (_strAVIFlg == "Y") {
    var dtAVIData;
    var strAVIResult = "";
    dtAVIData = await GetSerialAVIResult(
      _strPlantCode,
      _strFrontSheetNo,
      _intPcsNo,
      "N"
    );
    if (dtAVIData.length > 0) {
      strAVIResult = dtAVIData[0]["AVI_RESULT"];
      if (
        strAVIResult != "" &&
        strAVIResult != "OK" &&
        strAVIResult != "PASS" &&
        strAVIResult != "GOOD"
      ) {
        _strResult = "NG";
        _strRemark = _strRemark + " OST-EFPC: " + strAVIResult;
      }
    } else {
      dtAVIData = await GetSerialAVIResult(
        _strPlantCode,
        _strBackSheetNo,
        _intPcsNo,
        "N"
      );
      if (dtAVIData.length > 0) {
        strAVIResult = dtAVIData[0]["AVI_RESULT"];
        if (
          strAVIResult != "" &&
          strAVIResult != "OK" &&
          strAVIResult != "PASS" &&
          strAVIResult != "GOOD"
        ) {
          _strResult = "NG";
          _strRemark = _strRemark + " OST-EFPC: " + strAVIResult;
        }
      }
    }
  }
  res.status(200).json(_strRemark);
};

async function GetSerialOSTResult(SerialNo, intPCSNo, strSMPJCavityFlg) {
  let query = "";
  try {
    const Conn = await ConnectOracleDB("PCTTTEST");
    console.log("data:", SerialNo, intPCSNo, strSMPJCavityFlg, "เข้า");
    query = `SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_GetSerialOSTResult('${SerialNo}', '${intPCSNo}', '${strSMPJCavityFlg}') AS DATA1 FROM DUAL`;
    const result = await Conn.execute(query);
    await DisconnectOracleDB(Conn);
    return result.rows[0][0];
  } catch (error) {
    writeLogError(error.message, query);
    return error.message;
  }
}

async function GetSerialAOIEFPCResult(
  _strPlantCode,
  _strFrontSheetNo,
  _intPcsNo,
  _strProduct,
  _strSMPJCavityFlg
) {
  let query = "";
  try {
    const Conn = await ConnectOracleDB("PCTTTEST");
    // query = `SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_GetSerialOSTResult('${SerialNo}', '${intPCSNo}', '${strSMPJCavityFlg}') AS DATA1 FROM DUAL`;
    const result = await Conn.execute(query);
    await DisconnectOracleDB(Conn);
    return result.rows[0][0];
  } catch (error) {
    writeLogError(error.message, query);
    return error.message;
  }
}

async function GetSerialAVIResult(
  _strPlantCode,
  _strFrontSheetNo,
  _intPcsNo,
  _strSMPJCavityFlg
) {
  let query = "";
  try {
    const Conn = await ConnectOracleDB("PCTTTEST");
    // query = `SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_GetSerialOSTResult('${SerialNo}', '${intPCSNo}', '${strSMPJCavityFlg}') AS DATA1 FROM DUAL`;
    const result = await Conn.execute(query);
    await DisconnectOracleDB(Conn);
    return result.rows[0][0];
  } catch (error) {
    writeLogError(error.message, query);
    return error.message;
  }
}


module.exports.Getsheetnobyserialno = async function (req, res) {
  var query = "";
  try {
      const data = JSON.stringify(req.body);
      query = ` SELECT * FROM "Traceability".trc_000_common_getsheetnobyserialno('[${data}]'); `;
 
      const client = await ConnectPG_DB();
      const result = await client.query(query);
      await DisconnectPG_DB(client);
      res.status(200).json(result.rows[0]);
  } catch (err) {
      writeLogError(err.message, query);
      res.status(500).json({ message: err.message });
  }
};
module.exports.Getsheetdatabyserialno = async function (req, res) {
  var query = "";
  try {
      const data = JSON.stringify(req.body);
      query = ` SELECT * FROM "Traceability".trc_000_common_getsheetdatabyserialno('[${data}]'); `;
 
      const client = await ConnectPG_DB();
      const result = await client.query(query);
      await DisconnectPG_DB(client);
      res.status(200).json(result.rows[0]);
  } catch (err) {
      writeLogError(err.message, query);
      res.status(500).json({ message: err.message });
  }
};

module.exports.GetSerialBoxProductByProduct = async function (req, res) {
  var query = "";
  try {
    const Conn = await ConnectOracleDB("PCTTTEST");
    const {prdName} = req.body;
     query = `SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_GetSBProductByPd('${prdName}')  FROM DUAL `;
    const result = await Conn.execute(query);
    console.log(query,"query")
    if (result.rows.length > 0) {
      let data = [
        {
          SLM_PRD_NAME: result.rows[0][0][0][0],
          SLM_CUST_PART_NAME: result.rows[0][0][0][1],
          SLM_SERIAL_LENGTH: result.rows[0][0][0][2],
          SLM_FIX_FLAG: result.rows[0][0][0][3],
          SLM_FIX_DIGIT: result.rows[0][0][0][4],
          SLM_FIX_START_DIGIT: result.rows[0][0][0][5],
          SLM_FIX_END_DIGIT: result.rows[0][0][0][6],
          SLM_TRAY_FLAG: result.rows[0][0][0][7],
          SLM_TRAY_LENGTH: result.rows[0][0][0][8],
          SLM_TEST_RESULT_FLAG: result.rows[0][0][0][9],
          SLM_SERIAL_COUNT: result.rows[0][0][0][10],
          SLM_AUTO_SCAN: result.rows[0][0][0][11],
          SLM_BARCODE_REQ_CONFIG: result.rows[0][0][0][12],
          SLM_CONFIG_CODE: result.rows[0][0][0][13],
          SLM_START_CONFIG: result.rows[0][0][0][14],
          SLM_END_CONFIG: result.rows[0][0][0][15],
          SLM_TRAY_SERIAL_COUNT: result.rows[0][0][0][16],
          SLM_LOT_FLAG: result.rows[0][0][0][17],
          SLM_LOT_SERIAL_START: result.rows[0][0][0][18],
          SLM_LOT_SERIAL_END: result.rows[0][0][0][19],
          SLM_LOT_START: result.rows[0][0][0][20],
          SLM_LOT_END: result.rows[0][0][0][21],
          SLM_FINAL_GATE_FLG: result.rows[0][0][0][22],
          SLM_FACTORY_NAME: result.rows[0][0][0][23],
          SLM_PLASMA_TIME_FLG: result.rows[0][0][0][24],
          SLM_PLASMA_TIME: result.rows[0][0][0][25],
          SLM_START_SEQ_FLG: result.rows[0][0][0][26],
          SLM_START_SEQ_CODE: result.rows[0][0][0][27],
          SLM_START_SEQ_START: result.rows[0][0][0][28],
          SLM_START_SEQ_END: result.rows[0][0][0][29],
          SLM_DATE_INPROC_FLG: result.rows[0][0][0][30],
          SLM_DATE_INPROC: result.rows[0][0][0][31],
          SLM_DATE_TYPE: result.rows[0][0][0][32],
          SLM_CHECK_WEEKCODE_FLG: result.rows[0][0][0][33],
          SLM_CHECK_WEEKCODE_START: result.rows[0][0][0][34],
          SLM_CHECK_WEEKCODE_END: result.rows[0][0][0][35],
          SLM_SERIAL_START_CODE: result.rows[0][0][0][36],

        },
      ];

     
      res.status(200).json(data);
      DisconnectOracleDB(Conn);
    }
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

module.exports.GetSerialTestResultManyTable = async function (req, res) {
  var query = "";
  let data=[{}]
  try {
      //query = `CALL "Traceability".trc_000_common_getserialtestresultmanytable( '{"strPlantCode":"5","strPrdname":"RGOZ-960ML-2D","strWeekCodeType":"U","strSerial":"THA9276167M21387Y"}', '{}');
      const { dataList,dtSerial } = req.body;
      const json_convertdata = JSON.stringify(dataList);
      query += `CALL "Traceability".trc_000_common_getserialtestresultmanytable('${json_convertdata}','','{}')`;
      const client = await ConnectPG_DB();
      const result = await client.query(query);
      // console.log('dtserial0',result.rows[0])
      await DisconnectPG_DB(client);
      let response=result.rows[0].response
      if(response!=null){
        console.log(response.SERIAL,dtSerial.SERIAL)
        if(response.SERIAL!=null ||response.SERIAL!=''){
          dtSerial.SERIAL=response.SERIAL
        }
        if(response.TEST_RESULT!=null ||response.TEST_RESULT!=''){
          dtSerial.TEST_RESULT=response.TEST_RESULT
        }

        if(response.TYPE_TEST_RESULT!=null ||response.TYPE_TEST_RESULT!=''){
          dtSerial.TYPE_TEST_RESULT=response.TYPE_TEST_RESULT
        }

        if(response.REJECT!=null ||response.REJECT!=''){
          dtSerial.REJECT=response.REJECT
        }

        if(response.TOUCH_UP!=null ||response.TOUCH_UP!=''){
          dtSerial.TOUCH_UP=response.TOUCH_UP
        }

        if(response.REJECT2!=null ||response.REJECT2!=''){
          dtSerial.REJECT2=response.REJECT2
        }

        if(response.REJECT_CODE!=null ||response.REJECT_CODE!=''){
          dtSerial.REJECT_CODE=response.REJECT_CODE
        }

        if(response.REMARK!=null ||response.REMARK!=''){
          dtSerial.REMARK=response.REMARK
        }

        if(response.UPDATE_FLG!=null ||response.UPDATE_FLG!=''){
          dtSerial.UPDATE_FLG=response.UPDATE_FLG
        }

        if(response.FRONT_SHEET_NO!=null ||response.FRONT_SHEET_NO!=''){
          dtSerial.FRONT_SHEET_NO=response.FRONT_SHEET_NO
        }

        if(response.BACK_SHEET_NO!=null ||response.BACK_SHEET_NO!=''){
          dtSerial.BACK_SHEET_NO=response.BACK_SHEET_NO
        }

        if(response.SHEET_PCS_NO!=null ||response.SHEET_PCS_NO!=''){
          dtSerial.SHEET_PCS_NO=response.SHEET_PCS_NO
        }

        if(response.ROLL_LEAF_NO!=null ||response.ROLL_LEAF_NO!=''){
          dtSerial.ROLL_LEAF_NO=response.ROLL_LEAF_NO
        }
      }
      // console.log('dtserial1',dtSerial)
      res.status(200).json(dtSerial);
  } catch (err) {
      writeLogError(err.message, query);
      res.status(500).json({ message: err.message });
  }
};

module.exports.getProductDataFix = async function (req, res) {
  var query = "";
  try {
      const data = JSON.stringify(req.body);
      query = ` SELECT * FROM "Traceability".trc_000_common_getproductdatafix('${data}'); `;
 
      const client = await ConnectPG_DB();
      const result = await client.query(query);
      await DisconnectPG_DB(client);
      res.status(200).json(result.rows[0]);
  } catch (err) {
      writeLogError(err.message, query);
      res.status(500).json({ message: err.message });
  }
};

module.exports.GetPlasmaTimeBySerialNo = async function (req, res) {
  var query = "";
  let response = 0;
  try {
    const { dataList } = req.body;
    const json_convertdata = JSON.stringify(dataList);
    console.log (json_convertdata);
      // select * from "Traceability".trc_000_common_GetPlasmaTimeBySerialNo('[{"strSerial":"THA9276167M21387Y","strPlantCode":"5","strPacking":"","strMasterCode":"T999999999","strPrdname":"RGOZ-960ML-2D"}]')
      query = ` select * from "Traceability".trc_000_common_GetPlasmaTimeBySerialNo('[${json_convertdata}]'); `;
 
      const client = await ConnectPG_DB();
      const result = await client.query(query);
      await DisconnectPG_DB(client);
      if (result.rows[0].plasma_time > 0){
        response = result.rows[0].plasma_time;
        if (result.rows[0].plasma_time == 0 && result.rows[0].plasma_count == 0){
          response = 0;
        }
      }
      res.status(200).json({plasma_time:response});
  } catch (err) {
      writeLogError(err.message, query);
      res.status(500).json({ message: err.message });
  }
};