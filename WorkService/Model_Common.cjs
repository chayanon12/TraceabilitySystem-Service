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
  var query = "";
  var SHT_PCS_MASTER_CODE = process.env.VITE_SHT_PCS_MASTER_CODE;
  var WORKING_START_TIME = process.env.VITE_WORKING_START_TIME;
  var SHT_PCS_MASTER_TIME = process.env.VITE_SHT_PCS_MASTER_TIME;
  var SHT_PCS_MASTER_FLG = process.env.VITE_SHT_PCS_MASTER_FLG;
  var _strPlantCode = process.env.FacA1;
  if (SHT_PCS_MASTER_FLG == "1") {
    try {
      const client = await ConnectPG_DB();
      const { strProduct } = req.body;
      let datalist = {
        strProduct: strProduct.substring(0, 8),
        strPcsmasterCode: SHT_PCS_MASTER_CODE,
        strWorkstartime: WORKING_START_TIME,
        strShtPcsmastertime: SHT_PCS_MASTER_TIME,
        strPlantCode: _strPlantCode,
      };
      const json_convertdata = JSON.stringify(datalist);
      query = `SELECT * FROM "Traceability".trc_000_common_getconnectshtmastercheckresult('[${json_convertdata}]')`;
      const result = await client.query(query);
      await DisconnectPG_DB(client);
      res.status(200).json(result.rows[0]);
    } catch (error) {
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(200).json({ prd_name: "OK" });
  }
};

module.exports.getconnectshtplasmatime = async function (req, res) {
  var query = "";
  let _strError = "";
  try {
    const client = await ConnectPG_DB();
    const { dataList } = req.body;
    const json_convertdata = JSON.stringify(dataList);
    query = `SELECT * FROM "Traceability".trc_000_common_getconneSctshtplasmatime('[${json_convertdata}]')`;
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    if (result.rows.length > 0) {
      if (result.rows[0].lot_no !== "") {
        if (dataList._strLotNo !== result.rows[0].lot_no) {
          _strError = "Sheet mix lot";
        } else if (result.rows[0].plasma_time > dataList.dblPlasmaTime) {
          _strError = `Sheet over control plasma time ${dataList.dblPlasmaTime} hrs.`;
        }
      } else {
        _strError = "Sheet no record plasma time";
      }
    } else {
      _strError = "Sheet no record plasma time";
    }
    res.status(200).json(_strError);
  } catch (error) {
    console.log("error", error);
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
  var SERIAL_DATE_START_WEEK_CODE = "01/01/1970"; //ENV
  var _strReturn = "";
  var _strDate = "";
  try {
    const connect = await ConnectOracleDB("FPC");
    const { _strLot, _strProc, _strWeekType, _strSerialInfo } = req.body;
    query += `SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_GETWEEKCODEBYLOT('${_strLot}', '${_strProc}')AS data1 FROM dual`;
    const result = await connect.execute(query);
    await DisconnectOracleDB(connect);
    if (result.rows[0][0] != null) {
      _strDate = result.rows[0][0];
      const [day, month, year] = _strDate.split("/");
      const dtToday = new Date(Date.UTC(year, month - 1, day));
      const [startDay, startMonth, startYear] =
        SERIAL_DATE_START_WEEK_CODE.split("/");
      const dtStartDate = new Date(
        Date.UTC(startYear, startMonth - 1, startDay)
      );
      const dtNextSaturday = new Date(dtToday);
      dtNextSaturday.setUTCDate(
        dtToday.getUTCDate() + (6 - dtToday.getUTCDay())
      );
      const weekNumber = (date) => {
        const start = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
        const dayOfYear = (date - start) / 86400000 + 1;
        return Math.ceil(dayOfYear / 7);
      };
      let WeekCnt = weekNumber(dtNextSaturday).toString().padStart(2, "0");

      const dtNow = dtToday;
      const strMonth = (dtNow.getUTCMonth() + 1).toString().padStart(2, "0");
      let strYear;
      if (strMonth === "12" && WeekCnt === "01") {
        strYear = (dtNow.getUTCFullYear() + 1).toString().trim();
      } else {
        strYear = dtNow.getUTCFullYear().toString().trim();
      }
      const LOT_NO = _strLot;
      let txtLot = "";
      let txtLot2 = "";
      let txtWeek = "";
      let txtYear = "";
      let txtMonth = "";
      let txtDay = "";

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

            const TempStr = await ConvertBase34(
              year - parseInt(strFirst + "000")
            );
            txtYear = TempStr[TempStr.length - 1];
          } else {
            txtYear = strYear[3];
          }
          txtDay = dtToday.getUTCDay();

          _strReturn = `${txtYear}${txtWeek}${txtDay}`;
          break;

        case "W":
          txtYear = "";
          txtDay = "";

          if (LOT_NO !== "") {
            txtLot = LOT_NO;
            txtLot2 = LOT_NO.slice(-2);
          }
          txtWeek = await ConvertBase34(
            parseInt(strYear[strYear.length - 1] + WeekCnt)
          );
          txtWeek = txtWeek.padStart(2, "0");
          _strReturn = `${txtWeek}${txtLot2}`;
          break;

        case "J":
          txtDay = await ChangeBase34(dtToday.getUTCDate());
          txtMonth = await ChangeBase34(dtToday.getUTCMonth() + 1);
          txtWeek = await ConvertBase34(
            parseInt(strYear[strYear.length - 1] + WeekCnt)
          );
          txtYear = strYear;
          _strReturn = `${txtMonth}${txtDay}`;
          break;

        case "N":
          const intDayDiff = Math.floor(
            (dtToday - dtStartDate) / (1000 * 60 * 60 * 24)
          );
          const strDayCode = await Convert000(ConvertBase34(intDayDiff));
          txtMonth = strDayCode;
          txtWeek = strDayCode[1];
          txtYear = strDayCode[0];
          txtDay = strDayCode[2];
          _strReturn = strDayCode;
          break;

        case "U":
          txtDay = await ChangeBase34(dtToday.getUTCDate());
          txtMonth = await ChangeBase34(dtToday.getUTCMonth() + 1);
          _strReturn = `${txtMonth}${txtDay}`;
          break;

        case "S":
          const formattedDate = dtToday
            .toISOString()
            .slice(2, 10)
            .replace(/-/g, ""); // yyMMdd
          console.log(
            "formattedDate :",
            formattedDate,
            parseInt(formattedDate),
            await ConvertBase34(parseInt(formattedDate)),
            await Convert0000(ConvertBase34(parseInt(formattedDate)))
          );
          _strReturn = await Convert0000(
            ConvertBase34(parseInt(formattedDate))
          );
          break;

        case "D":
          const serialDate = new Date(
            _strSerialInfo.split("/").reverse().join("-") + "T00:00:00"
          );
          const dateDiff = Math.floor(
            (dtToday - serialDate) / (1000 * 60 * 60 * 24)
          );
          _strReturn = await Convert0000(dateDiff);
          break;

        default:
          txtLot2 = LOT_NO.slice(-2);
          _strReturn = `${txtWeek}${txtLot2}`;
          break;
      }
    }
    res.status(200).json(_strReturn);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

const Convert0000 = async (strText) => {
  return ("0000" + strText).slice(-4);
};

const Convert000 = async (strText) => {
  let result = "000" + strText;
  return result.slice(-3);
};

const ConvertBase34 = async (lngNumber2) => {
  let shou;
  let Amari = [];
  let i = 0;
  let StrTemp = "";
  let LngNumber = lngNumber2;
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

const ChangeBase34 = async (lngNumber2) => {
  const strChange = "0123456789ABCDEFGHJKLMNPQRSTUVWXYZ";
  return strChange[lngNumber2];
};

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
    res.status(200).json(result.rows[0]);
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
    var boolValue = false;
    const client = await ConnectPG_DB();
    const json_data = JSON.stringify(req.body);
    query = `SELECT * FROM "Traceability".trc_000_common_getproductshtinspectdup('[${json_data}]');`;
    const result = await client.query(query);
    if (result.rows.length > 0) {
      if (result.rows[0].row_count > 0) {
        boolValue = true;
      }
    }
    res.status(200).json(boolValue);
    await DisconnectPG_DB(client);
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

module.exports.getserialduplicateconnectsht = async function (req, res) {
  var query = "";
  let intCount = 0;
  try {
    const client = await ConnectPG_DB();
    const { dataList } = req.body;
    const json_convertdata = JSON.stringify(dataList);
    query += `SELECT  * FROM "Traceability".trc_000_common_getserialduplicateconnectsht('[${json_convertdata}]')`; //--THA92770P53J17J5B
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    if (result.rows.length > 0) {
      intCount = 1;
      dataList._strSerialNoDup === result.rows[0].serial_no;
    }
    res.status(200).json(intCount);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

module.exports.GetSerialDuplicate = async function (req, res) {
  var query = "";
  try {
    const client = await ConnectPG_DB();
    const { dataList } = req.body;
    const json_convertdata = JSON.stringify(dataList);
    query += `select * from "Traceability".trc_000_common_getserialduplicate('[${json_convertdata}]')`;
    const result = await client.query(query);
    if (result.rows !== "") {
      res.status(200).json(result.rows[0]);
      await DisconnectPG_DB(client);
    }
  } catch (error) {
    writeLogError(error.message, query);
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

// module.exports.getsheetdatabyserialno = async function (req, res) {
//   try {
//     var query = "";
//     const client = await ConnectPG_DB();
//     query = ``;
//     const result = await client.query(query);
//     await DisconnectPG_DB(client);
//     res.status(200).json({ Result: result });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

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
    res.status(500).json({ message: error.message });
  }
};

module.exports.SetSerialRecordTimeTrayTableTest = async function (req, res) {
  var query = "";
  var json_convertdata = "";
  try {
    const client = await ConnectPG_DB();
    const { dataList } = req.body;
    json_convertdata = JSON.stringify(dataList);
    console.log("json_convertdatatest", json_convertdata);
    query = `call "Traceability".trc_000_TestInsert($1::json,'');`;
    // CALL "Traceability".trc_000_testinsert(:data_json);
    const result = await client.query(query, [json_convertdata]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows);
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
    console.log("SetSerialLotShtELTTable", json_convertdata);
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
    // console.log('SetSerialLotShtGradeTable',dataList)
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

    query += `CALL "Traceability".trc_006_common_get_spi_aoi_result_test('[${json_convertdata}]','','')`;

    const result = await client.query(query);
    console.log("result", result.rows);
    // res.status(200).json(result.rows[0]._strreturn);
    res.status(200).json(result.rows[0]);
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
    // cons
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
    query += ` SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_GetBoxCount( '${prdName}', '${boxNo}') AS DATA1 FROM DUAL`;
    const result = await Conn.execute(query);
    if (result.rows.length > 0) {
      let data = [
        {
          BOX_COUNT: result.rows[0][0][0][0] || 0,
          BOX_QTY: result.rows[0][0][0][1],
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
  let result_ = _strResult;
  result_ = "OK";

  if (_strAOIFlg == "Y") {
    var dtDataAOI;
    var strAOIResult = "";
    dtDataAOI = await GetSerialAOIEFPCResult(_strPlantCode,_strFrontSheetNo,_intPcsNo,_strProduct,"N");
    if (dtDataAOI.length > 0) {
      strAOIResult = dtDataAOI[0][3]; 
      console.log()
      if (strAOIResult != "" &&strAOIResult != "OK" &&strAOIResult != "PASS" &&strAOIResult != "GOOD") {
        result_ = "NG";
        _strRemark = _strRemark + " AOI-EFPC: " + strAOIResult;
      }
    } else {      
      dtDataAOI = await GetSerialAOIEFPCResult(_strPlantCode,_strBackSheetNo,_intPcsNo,_strProduct,"N");
      if (dtDataAOI.length > 0) {
        strAOIResult = dtDataAOI[0]["AOI_RESULT"]; 
        if (strAOIResult != "" &&strAOIResult != "OK" &&strAOIResult != "PASS" &&strAOIResult != "GOOD") {
          result_ = "NG";
          _strRemark = _strRemark + " AOI-EFPC: " + strAOIResult;
        }
      }
    }
  }
  if (_strOSTFlg == "Y") {
    var dtOSTData;
    var strOSTResult = "";
    dtOSTData = await GetSerialOSTResult(_strFrontSheetNo,parseInt(_intPcsNo),"N");
    if (dtOSTData.length > 0) {
      strOSTResult = dtOSTData[0][2];
      if (strOSTResult != "" &&strOSTResult != "OK" &&strOSTResult != "PASS" &&strOSTResult != "GOOD") {
        result_ = "NG";
        _strRemark = _strRemark + " OST-EFPC: " + strOSTResult;
      }
    } else {
      dtOSTData = await GetSerialOSTResult(_strBackSheetNo,_intPcsNo,"N");
      if (dtOSTData.length > 0) {
        strOSTResult = dtOSTData[0][2];
        if (strOSTResult != "" &&strOSTResult != "OK" &&strOSTResult != "PASS" &&strOSTResult != "GOOD") {
          result_ = "NG";
          _strRemark = _strRemark + " OST-EFPC: " + strOSTResult;
        }
      }
    }
  }
  if (_strAVIFlg == "Y") {
    var dtAVIData;
    var strAVIResult = "";
    dtAVIData = await GetSerialAVIResult(_strFrontSheetNo, _intPcsNo, "N");
    if (dtAVIData.length > 0) {
      strAVIResult = dtAVIData[0][0];
      if (strAVIResult != "" &&strAVIResult != "OK" &&strAVIResult != "PASS" &&strAVIResult != "GOOD") {
        result_ = "NG";
        _strRemark = _strRemark + " OST-EFPC: " + strAVIResult;
      }
    } else {
      dtAVIData = await GetSerialAVIResult(_strBackSheetNo, _intPcsNo, "N");
      if (dtAVIData.length > 0) {
        strAVIResult = dtAVIData[0][2];
        if (strAVIResult != "" &&strAVIResult != "OK" &&strAVIResult != "PASS" &&strAVIResult != "GOOD") {
          result_ = "NG";
          _strRemark = _strRemark + " OST-EFPC: " + strAVIResult;
        }
      }
    }
  }
  res.status(200).json({remark:_strRemark,result:result_});
};
 
async function GetSerialOSTResult(SerialNo, intPCSNo, strSMPJCavityFlg) {
  let query = "";
  try {
    const Conn = await ConnectOracleDB("PCTTTEST");
    query = `SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_GetSerialOSTResult('${SerialNo}', '${intPCSNo}', '${strSMPJCavityFlg}') AS DATA1 FROM DUAL`;
    console.log(query, "query");
    const result = await Conn.execute(query);
    console.log(result, "ressult");
    await DisconnectOracleDB(Conn);
    return result.rows[0][0];
  } catch (error) {
    writeLogError(error.message, query);
    return error.message;
  }
}

async function GetSerialAOIEFPCResult(_strPlantCode,_strFrontSheetNo,_intPcsNo,_strProduct,_strSMPJCavityFlg) {
  let query = "";
  try {
    let roll_leaf = await GetRollLeafBySheetNo(_strPlantCode, _strFrontSheetNo);
    console.log("roll_leaf", roll_leaf);
    const Conn = await ConnectOracleDB("PCTTTEST");
    if (roll_leaf !== "") {
      query = `SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_GetSeAOIEFPCResult('${_strPlantCode}', '${_strFrontSheetNo}', ${_intPcsNo},'${_strProduct}','${_strSMPJCavityFlg}','${roll_leaf}') AS  FROM DUAL`;
    }
    const result = await Conn.execute(query);
    await DisconnectOracleDB(Conn);
    return result.rows[0][0];
  } catch (error) {
    writeLogError(error.message, query);
    return error.message;
  }
}

async function GetSerialAVIResult(
  _strFrontSheetNo,
  _intPcsNo,
  _strSMPJCavityFlgfv
) {
  let query = "";
  try {
    const Conn = await ConnectOracleDB("PCTTTEST");
    query = `SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_GetSerialAVIResult('${_strFrontSheetNo}', '${_intPcsNo}', '${_strSMPJCavityFlg}') AS DATA1 FROM DUAL`;
    const result = await Conn.execute(query);
    await DisconnectOracleDB(Conn);
    return result.rows[0][0];
  } catch (error) {
    writeLogError(error.message, query);
    return error.message;
  }
}

async function GetRollLeafBySheetNo(strPlantCode, strSheetNo) {
  let query = "";
  let roll_leaf = "";
  const FacA1 = process.env.FacA1;
  try {
    const client = await ConnectPG_DB();
    query = `SELECT * FROM "Traceability".GetRollLeafBySheetNo('[{"strPlantCode": "${FacA1}", "strSheetNo": "${strSheetNo}"}]')`;

    // Execute the query
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    if(result.rowCount > 0){
      roll_leaf = result.rows[0].roll_leaf;
    }
    return roll_leaf;
  } catch (error) {
    writeLogError(error.message, query);
    return error.message;
  }
}

// module.exports.Getsheetnobyserialno = async function (req, res) {
//   var query = "";
//   try {
//     const { data } = req.body
//     const datalist = JSON.stringify(data);
//     query = ` SELECT * FROM "Traceability".trc_000_common_getsheetnobyserialno($1); `;

//     const client = await ConnectPG_DB();
//     const result = await client.query(query, [datalist]);
//     await DisconnectPG_DB(client);
//     res.status(200).json(result.rows[0]);
//   } catch (err) {
//     writeLogError(err.message, query);
//     res.status(500).json({ message: err.message });
//   }
// };

module.exports.Getsheetnobyserialno = async function (req, res) {
  var query = "";
  try {
    const { data } = req.body;
    console.log(data, "data");
    const datalist = JSON.stringify(data);
    query = ` SELECT * FROM "Traceability".trc_000_common_getsheetnobyserialno($1); `;

    const client = await ConnectPG_DB();
    const result = await client.query(query, [datalist]);
    await DisconnectPG_DB(client);
    if(result.rows[0]!=undefined){
      // console.log(result.rows[0], "result")
      res.status(200).json(result.rows[0]);
    } else {
      res.status(200).json({ _strsheet: "" ,sheet_no_back: "",pcs_no: "",lot_no: ""});
    }
  } catch (err) {
    writeLogError(err.message, query);
    res.status(500).json({ message: err.message });
  }
};

module.exports.Getsheetdatabyserialno = async function (req, res) {
  var query = "";
  let _dtData = "";
  try {
    const data = JSON.stringify(req.body);

    console.log(data, "data");
    query = ` SELECT * FROM "Traceability".trc_000_common_getsheetdatabyserialno('[${data}]'); `;
    console.log(query, "RRRRR");
    const client = await ConnectPG_DB();
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    console.log(result.rows, "MAYYYYYYYYYYYYY--------------------------");
    if (result.rows[0] != undefined) {
      _dtData = result.rows[0];
    }
    res.status(200).json(_dtData);
  } catch (err) {
    writeLogError(err.message, query);
    res.status(500).json({ message: err.message });
  }
};

module.exports.GetSerialBoxProductByProduct = async function (req, res) {
  var query = "";
  try {
    const Conn = await ConnectOracleDB("PCTTTEST");
    const { prdName } = req.body;
    query = `SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_GetSBProductByPd('${prdName}')  FROM DUAL `;
    const result = await Conn.execute(query);
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
  let data = [{}];
  let query=''
  try {
    let { dataList, dtSerial } = req.body;
    const queries = [];
    for (let i = 0; i < dtSerial.length; i++) {
      let strSerial = dtSerial[i].SERIAL || ''; 
      if (dataList[0] && strSerial !== '') {
        dataList[0].strSerial = strSerial;
      } else if (dataList[0] && strSerial === "") {
        dataList[0].strSerial = "";
      }
      const json_convertdata = JSON.stringify(dataList);
       query = `CALL "Traceability".trc_000_common_getserialtestresultmanytable2('${json_convertdata}','','{}')`;

      queries.push(query);
    }
    const client = await ConnectPG_DB();
    const result = await Promise.all(queries.map(query => client.query(query))); 
    await DisconnectPG_DB(client);
   
    result.forEach((res, index) => {
      const response = res.rows[0].response;

      if (response) {
        console.log(response,'testtt')
        const updatedSerial = dtSerial[index];
        if (response.SERIAL) updatedSerial.SERIAL = response.SERIAL;
        if (response.TEST_RESULT)
          updatedSerial.TEST_RESULT = response.TEST_RESULT;
        if (response.TYPE_TEST_RESULT)
          updatedSerial.TYPE_TEST_RESULT = response.TYPE_TEST_RESULT;
        if (response.REJECT) updatedSerial.REJECT = response.REJECT;
        if (response.TOUCH_UP) updatedSerial.TOUCH_UP = response.TOUCH_UP;
        if (response.REJECT2) updatedSerial.REJECT2 = response.REJECT2;
        if (response.REJECT_CODE) updatedSerial.REJECT_CODE = response.REJECT_CODE;
       if (response.REMARK) updatedSerial.REMARK = response.REMARK;
        if (response.UPDATE_FLG) updatedSerial.UPDATE_FLG = response.UPDATE_FLG;
        if (response.FRONT_SHEET_NO)
          updatedSerial.FRONT_SHEET_NO = response.FRONT_SHEET_NO;
        if (response.BACK_SHEET_NO)
          updatedSerial.BACK_SHEET_NO = response.BACK_SHEET_NO;
        if (response.SHEET_PCS_NO)
          updatedSerial.SHEET_PCS_NO = response.SHEET_PCS_NO;
        if (response.ROLL_LEAF_NO)
          updatedSerial.ROLL_LEAF_NO = response.ROLL_LEAF_NO;
      }
    });
    console.log(dtSerial[0].REMARK,'maja2')
    res.status(200).json(dtSerial);
  } catch (err) {
    writeLogError(err.message, query);
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
};

// module.exports.GetSerialTestResultManyTable = async function (req, res) {
//   let query = "";
//   try {
//     const { dataList, dtSerial } = req.body;
//     const json_convertdata = JSON.stringify(dataList);
//     console.log(dtSerial, 'json_convertdata');

//     query = `CALL "Traceability".trc_000_common_getserialtestresultmanytable2('${json_convertdata}', '', '{}')`;
//     const client = await ConnectPG_DB();
//     const result = await client.query(query);
//     console.log('dt', result.rows);
//     await DisconnectPG_DB(client);

//     const response = result.rows[0]?.response;

//     if (response) {
//       // Map ข้อมูลจาก response ไปยัง dtSerial
//       const fields = [
//         'SERIAL', 'TEST_RESULT', 'TYPE_TEST_RESULT', 'REJECT',
//         'TOUCH_UP', 'REJECT2', 'REJECT_CODE', 'REMARK',
//         'UPDATE_FLG', 'FRONT_SHEET_NO', 'BACK_SHEET_NO',
//         'SHEET_PCS_NO', 'ROLL_LEAF_NO'
//       ];

//       fields.forEach(field => {
//         if (response[field]) {
//           dtSerial[field] = response[field];
//         }
//       });
//     }

//     console.log('GetSerialTestResultManyTable', dtSerial);
//     res.status(200).json(dtSerial);
//   } catch (err) {
//     writeLogError(err.message, query);
//     res.status(500).json({ message: err.message });
//   }
// };
module.exports.SetSerialLotTrayTableGood2 = async function (req, res) {
  var query = "";

  try {
    const client = await ConnectPG_DB();
    const { dataList,data } = req.body;
    console.log('SetSerialLotTrayTableGood111',dataList)
    const json_convertdata = JSON.stringify(dataList);

    const query = `CALL "Traceability".trc_022_packing_gate_onlygood_setseriallottraytablegood2('[${json_convertdata}]', '')`;
    console.log(query,'query111')
    const result = await client.query(query);
    if (result.rows != "") {
      res.status(200).json(result.rows[0]);
      await DisconnectPG_DB(client);
    }
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

module.exports.SetSerialLotTrayTableGood = async function (req, res) {
  var query = "";

  try {
    const client = await ConnectPG_DB();
    const { dataList } = req.body;
    
    const json_convertdata = JSON.stringify(dataList);

    const query = `CALL "Traceability".trc_022_packing_gate_onlygood_setseriallottraytablegood($1, '')`;

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
module.exports.getProductDataFix = async function (req, res) {
  var query = "";
  try {
    const data = JSON.stringify(req.body);
    query = ` SELECT * FROM "Traceability".trc_000_common_getproductdatafix('[${data}]'); `;

    const client = await ConnectPG_DB();
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json(result.rows);
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
    // select * from "Traceability".trc_000_common_GetPlasmaTimeBySerialNo('[{"strSerial":"THA9276167M21387Y","strPlantCode":"5","strPacking":"","strMasterCode":"T999999999","strPrdname":"RGOZ-960ML-2D"}]')
    console.log("qqq", json_convertdata);
    query = ` select * from "Traceability".trc_000_common_GetPlasmaTimeBySerialNo('[${json_convertdata}]'); `;

    const client = await ConnectPG_DB();
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    console.log(result.rows, "may");
    if (result.rows[0].plasma_time > 0) {
      response = result.rows[0].plasma_time;
      if (result.rows[0].plasma_time == 0 && result.rows[0].plasma_count == 0) {
        response = 0;
      }
    }
    res.status(200).json({ plasma_time: response });
  } catch (err) {
    writeLogError(err.message, query);
    res.status(500).json({ message: err.message });
  }
};

// module.exports.GetSerialDuplicate = async function (req, res) {
//   var query = "";
//   try {
//     const data = JSON.stringify(req.body);
//     query = ` SELECT * FROM "Traceability".trc_000_common_getserialduplicate('[${data}]'); `;

//     const client = await ConnectPG_DB();
//     const result = await client.query(query);
//     await DisconnectPG_DB(client);
//     res.status(200).json(result.rows[0]);
//   } catch (err) {
//     writeLogError(err.message, query);
//     res.status(500).json({ message: err.message });
//   }
// };

module.exports.GetCheckSumSerial = async function (req, res) {
  let boolResult = true;
  try {
    const { _str_Serial, _str_DateType, _intEngRevEndDigit } = req.body;
    console.log(
      _str_Serial,
      _str_DateType,
      _intEngRevEndDigit,
      "GetCheckSumSerial"
    );
    const MaxEvenNumber =
      Math.trunc(_intEngRevEndDigit / 2) * 2 +
      ((_intEngRevEndDigit % 2) * 2 - 1);
    const MaxOddNumber = Math.trunc(_intEngRevEndDigit / 2) * 2;
    let EvenNumber = 0;
    let OddNumber = 0;
    let TriNumber = 0;
    let FouNumber = 0;
    let FivNumber = 0;
    let SixNumber = 0;
    let SevNumber = 0;
    if (["Y", "W", "R", "B", "I", "M"].includes(_str_DateType)) {
      if (_str_Serial.length >= _intEngRevEndDigit) {
        const SerialNumber = _str_Serial.substring(
          0,
          parseInt(_intEngRevEndDigit) + 1
        );
        const strSerialCheckSum = _str_Serial.charAt(_intEngRevEndDigit);
        console.log("charat", SerialNumber, strSerialCheckSum);
        EvenNumber = 0;
        for (let j = 1; j <= MaxEvenNumber; j += 2) {
          EvenNumber += ConvertBase34to10(SerialNumber.charAt(j - 1));
        }
        OddNumber = 0;
        for (let j = 2; j <= MaxOddNumber; j += 2) {
          OddNumber += ConvertBase34to10(SerialNumber.charAt(j - 1));
        }
        TriNumber = OddNumber * 3;
        FouNumber = EvenNumber + TriNumber;
        FivNumber = Math.ceil(FouNumber / 34);
        SixNumber = FivNumber * 34;
        SevNumber = SixNumber - FouNumber;

        if ((await ConvertBase34(SevNumber)) !== strSerialCheckSum) {
          console.log("ตรงนี้1", ConvertBase34(SevNumber), strSerialCheckSum);
          boolResult = false;
        }
      } else {
        console.log("ตรงนี้2");
        boolResult = false;
      }
    }
    res.status(200).json(boolResult);
  } catch (error) {
    writeLogError(error.message);
    res.status(500).json({ message: error.message });
  }
};
module.exports.getcheckspecialbyserial = async function (req, res) {
  var query = "";
  let response = 0;
  try {
    const { dataList } = req.body;
    const json_convertdata = JSON.stringify(dataList);
    // select * from "Traceability".trc_000_common_getcheckspecialbyserial('[{"strSerialno":"THA92770P53J17J5B","strPlantCode":"5"}]')
    query = ` select * from "Traceability".trc_000_common_getcheckspecialbyserial('[${json_convertdata}]'); `;

    const client = await ConnectPG_DB();
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    let response = 0;
    if (result.rows[0] != "") {
      response = result.rows[0].return_result;
    } else {
      response = 0;
    }
    res.status(200).json({ result: response });
  } catch (err) {
    writeLogError(err.message, query);
    res.status(500).json({ message: err.message });
  }
};

const ConvertBase34to10 = (strText) => {
  const strChange = "0123456789ABCDEFGHJKLMNPQRSTUVWXYZ";
  let result = 0;
  let j = 0;
  if (strText === "") return result;
  for (let i = strText.length - 1; i >= 0; i--) {
    const char = strText.charAt(i);
    const index = strChange.indexOf(char);
    if (index === -1) {
      throw new Error(`Character ${char} is not valid in base 34`);
    }
    result += index * Math.pow(34, j);
    j++;
  }
  return parseInt(result);
};

module.exports.GetSerialBoxTestResultManyTableOnlyGood = async function (
  req,
  res
) {
  var query = "";
  try {
    const client = await ConnectPG_DB();
    const { dataList, dtSerial } = req.body;

    const json_convertdata = JSON.stringify(dataList);

    query += `CALL "Traceability".trc_000_common_getserialboxtestresultmanytableonlygood('[${json_convertdata}]','','{}')`;
    const result = await client.query(query);

    let response = result.rows[0].response;
    if (response != null) {
      if (response.TEST_RESULT != null || response.TEST_RESULT != "") {
        dtSerial.TEST_RESULT = response.TEST_RESULT;
      }
      if (
        response.TYPE_TEST_RESULT != null ||
        response.TYPE_TEST_RESULT != ""
      ) {
        dtSerial.TYPE_TEST_RESULT = response.TYPE_TEST_RESULT;
      }
      if (response.PLASMA_TIME != null || response.PLASMA_TIME != "") {
        dtSerial.PLASMA_TIME = response.PLASMA_TIME;
      }
      if (response.REJECT != null || response.REJECT != "") {
        dtSerial.REJECT = response.REJECT;
      }
      if (response.TOUCH_UP != null || response.TOUCH_UP != "") {
        dtSerial.TOUCH_UP = response.TOUCH_UP;
      }
      if (response.REJECT2 != null || response.REJECT2 != "") {
        dtSerial.REJECT2 = response.REJECT2;
      }
      if (response.REJECT_CODE != null || response.REJECT_CODE != "") {
        dtSerial.REJECT_CODE = response.REJECT_CODE;
      }
      if (response.REMARK != null || response.REMARK != "") {
        dtSerial.REMARK = response.REMARK;
      }
      if (response.UPDATE_FLG != null || response.UPDATE_FLG != "") {
        dtSerial.UPDATE_FLG = response.UPDATE_FLG;
      }
      if (response.ROW_COUNT != null || response.ROW_COUNT != "") {
        dtSerial.ROW_COUNT = response.ROW_COUNT;
      }
      if (response.FRONT_SHEET_NO != null || response.FRONT_SHEET_NO != "") {
        dtSerial.FRONT_SHEET_NO = response.FRONT_SHEET_NO;
      }
      if (response.BACK_SHEET_NO != null || response.BACK_SHEET_NO != "") {
        dtSerial.BACK_SHEET_NO = response.BACK_SHEET_NO;
      }
      if (response.SHEET_PCS_NO != null || response.SHEET_PCS_NO != "") {
        dtSerial.SHEET_PCS_NO = response.SHEET_PCS_NO;
      }
      if (response.SHEET_PCS_NO != null || response.SHEET_PCS_NO != "") {
        dtSerial.SHEET_PCS_NO = response.SHEET_PCS_NO;
      }
    }
    res.status(200).json(dtSerial);

    await DisconnectPG_DB(client);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

module.exports.SetBoxPackingSerialTray = async function (req, res) {
  let Conn;
  let _strErrorAll = "";
  try {
    Conn = await ConnectOracleDB("PCTTTEST");

    const {
      strPrdName,
      strBox,
      strPack,
      strSerial,
      strUserID,
      strStation,
      _strResult,
    } = req.body;
    if (strSerial !== "") {
      const result = await Conn.execute(
        `BEGIN
          FPC.TRC_COMMON_TRACEABILITY.SetBoxPackingSerialTray(
           :strPrdName,
           :strBox,
           :strPack,
           :strSerial,
           :strUserID,
           :strStation,
           :P_ERROR
         );
       END;`,
        {
          strPrdName: { val: strPrdName, type: oracledb.STRING },
          strBox: { val: strBox, type: oracledb.STRING },
          strPack: { val: strPack, type: oracledb.STRING },
          strSerial: { val: strSerial, type: oracledb.STRING },
          strUserID: { val: strUserID, type: oracledb.STRING },
          strStation: { val: strStation, type: oracledb.STRING },
          P_ERROR: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
        }
      );

      _strErrorAll = result.outBinds.P_ERROR;
    }
    res.status(200).json(_strErrorAll);
  } catch (error) {
    writeLogError(error.message, "");
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  } finally {
    if (Conn) {
      try {
        await DisconnectOracleDB(Conn);
      } catch (closeError) {}
    }
  }
};
module.exports.SetSerialLotShtTable = async function (req, res) {
  var query = "";

  try {
    const client = await ConnectPG_DB();
    const json_convertdata = JSON.stringify(req.body);
    query += `call "Traceability".trc_000_common_setseriallotshttable('[${json_convertdata}]','')`;

    const result = await client.query(query);
    res.status(200).json(result.rows[0]);
    await DisconnectPG_DB(client);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

module.exports.SetRollLeafTrayTable = async function (req, res) {
  var query = "";

  try {
    const client = await ConnectPG_DB();
    const json_convertdata = JSON.stringify(req.body);
    query += `call "Traceability".trc_000_common_setrollleaftraytable('[${json_convertdata}]','')`;

    const result = await client.query(query);
    res.status(200).json(result.rows[0]);
    await DisconnectPG_DB(client);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};
module.exports.GetSheetDuplicateConnectSht = async function (req, res) {
  var query = "";

  try {
    const client = await ConnectPG_DB();
    const json_convertdata = JSON.stringify(req.body);
    query += `SELECT * FROM "Traceability".trc_000_common_getsheetduplicateconnectsht('[${json_convertdata}]')`;

    const result = await client.query(query);
    res.status(200).json(result.rows[0]);
    await DisconnectPG_DB(client);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};
module.exports.GetShippingSerialNo = async function (req, res) {
  try {
    const { strLotNo, dtSerial, strWeekType } = req.body;
    let _strReturn = "";
    let _intSeq = 1;
    let _strShetSeq = "";

    const _strLotBase34_1 = ConvertBase34(
      parseInt(strLotNo.substring(0, 1)) +
        parseInt(strLotNo.substring(1, 2)) +
        parseInt(strLotNo.substring(2, 3))
    );
    const _strLotBase34_4 = Convert0000(
      ConvertBase34(parseInt(strLotNo.substring(3, 9)))
    );

    dtSerial.forEach((drRow) => {
      let _strResult = "OK";
      let _strRemark = "";

      if (strWeekType === "S") {
        if (
          _strLotBase34_1 !== drRow.SERIAL.substring(10, 11) ||
          _strLotBase34_4 !== drRow.SERIAL.substring(19, 23)
        ) {
          _strReturn = "NG";
          _strResult = "NG";
          _strRemark = "Serial mix lot";
        } else if (drRow.SEQ.toString() !== drRow.SERIAL.substring(11, 12)) {
          _strReturn = "NG";
          _strResult = "NG";
          _strRemark = "Serial mix strip";
        } else {
          if (_intSeq === 1) {
            _strShetSeq = drRow.SERIAL.substring(7, 10);
          } else if (drRow.SERIAL.substring(7, 10) !== _strShetSeq) {
            _strReturn = "NG";
            _strResult = "NG";
            _strRemark = "Serial mix sheet";
          }
        }
      }

      drRow.SCAN_RESULT = _strResult;
      drRow.REMARK = _strRemark;

      _intSeq += 1;
    });

    res.status(200).json(_strReturn);
  } catch (error) {
    writeLogError(error.message);
    res.status(500).json({ message: error.message });
  }
};
module.exports.getlotsheetdataallbylot = async function (req, res) {
  var query = "";

  try {
    const client = await ConnectPG_DB();
    const { dataList } = req.body;
    const json_convertdata = JSON.stringify(dataList);
    query += `select * from "Traceability".trc_000_common_getlotsheetdataallbylot('[${json_convertdata}]')`;

    const result = await client.query(query);
    res.status(200).json(result.rows);
    await DisconnectPG_DB(client);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

module.exports.SetConfirmConnectShtPcs = async function (req, res) {
  var query = "";

  try {
    const client = await ConnectPG_DB();
    const { dataList } = req.body;
    const json_convertdata = JSON.stringify(dataList);
    query += `call "Traceability".trc_026_confrimShtPcs_SetConfirmConnectShtPcs('[${json_convertdata}]','')`;

    const result = await client.query(query);
    res.status(200).json(result.rows[0]);
    await DisconnectPG_DB(client);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

module.exports.GetLotRollLeafDataAllByLot = async function (req, res) {
  var query = "";
  try {
    const client = await ConnectPG_DB();
    const { dataList } = req.body;
    const json_convertdata = JSON.stringify(dataList);
    query += ` SELECT * from "Traceability".trc_000_common_GetLotRollLeafDataAllByLot('[${json_convertdata}]')`;
    const result = await client.query(query);

    // if (result.rows.length > 0) {

    // }
    res.status(200).json(result.rows);
    DisconnectPG_DB(client);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

module.exports.GetRollLeafDuplicate = async function (req, res) {
  let query = "";
  let intCount = 0;
  let datax = [];
  try {
    const { dataList, _dtRollLeaf } = req.body;
    const json_data = JSON.stringify(dataList);
    const client = await ConnectPG_DB();

    query += `SELECT * FROM "Traceability".trc_000_common_getrollleafduplicate('[${json_data}]')`;
    const result = await client.query(query);

    datax = Object.entries(_dtRollLeaf);
    if (result.rows.length > 0 && datax.length > 0) {
      if (result.rows.length > 0 != _dtRollLeaf.length) {
        intCount = 1;
      } else {
        for (let i = 0; i < result.rows.length; i++) {
          if (result.rows[i].sheet_no != _dtRollLeaf[i].SHT_NO) {
            intCount = 1;
          }
        }
      }
    }
    res.status(200).json({ intCount: intCount });
    await DisconnectPG_DB(client);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

// fnGetLotData
module.exports.fnGetLotData = async function (req, res) {
  var query = "";
  try {
    const Conn = await ConnectOracleDB("PCTTTEST");
    const { strLOTNO } = req.body;
    query += ` SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_fnGetLotData( '${strLOTNO}') AS DATA1 FROM DUAL`;
    const result = await Conn.execute(query);
    let data = [];
    if (result.rows[0][0].length > 0) {
      data = [
        {
          LOT: result.rows[0][0][0][0],
          LOT_PRD_NAME: result.rows[0][0][0][1],
          LOT_ROLL_NO: result.rows[0][0][0][2],
          PREVTLOT: result.rows[0][0][0][3],
          NEXTLOT: result.rows[0][0][0][4],
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

// ------------------------- not have in pctttest
module.exports.fnLotNoByRoll = async function (req, res) {
  var query = "";
  try {
    const Conn = await ConnectOracleDB("PCTTTEST");
    const { strRollNO } = req.body;
    query += ` SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_fnLotNoByRoll( '${strRollNO}') AS DATA1 FROM DUAL`;
    const result = await Conn.execute(query);
    let data = [];
    if (result.rows[0][0].length > 0) {
      for (let dt = 0; dt < result.rows[0][0].length; dt++) {
        data.push({
          LOT: result.rows[0][0][dt][0],
          PRD_NAME: result.rows[0][0][dt][1],
        });
      }
    }

    DisconnectOracleDB(Conn);
    res.status(200).json(data);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

module.exports.fnGetMaterialData = async function (req, res) {
  var query = "";
  try {
    const Conn = await ConnectOracleDB("PCTTTEST");
    const { strLOTNO } = req.body;
    query += ` SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_fnGetMaterialData( '${strLOTNO}') AS DATA1 FROM DUAL`;
    const result = await Conn.execute(query);
    let data = [];
    if (result.rows[0][0].length > 0) {
      for (let dt = 0; dt < result.rows[0][0].length; dt++) {
        data.push({
          MAT_CODE: result.rows[0][0][dt][0],
          MAT_NAME: result.rows[0][0][dt][1],
          MAT_CATEGORY: result.rows[0][0][dt][2],
          VENDER_LOT: result.rows[0][0][dt][3],
          SUB_VENDER_LOT: result.rows[0][0][dt][4],
          INVOICE_NO: result.rows[0][0][dt][5],
          EXPIRE_DATE: result.rows[0][0][dt][6],
          VENDER_NAME: result.rows[0][0][dt][7],
        });
      }
    }

    DisconnectOracleDB(Conn);
    res.status(200).json(data);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

//
module.exports.fnGetLotProcessDetailData = async function (req, res) {
  var query = "";
  try {
    const Conn = await ConnectOracleDB("PCTTTEST");
    const { strLOTNO } = req.body;
    query += ` SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_LotProcessDetail( '${strLOTNO}') AS DATA1 FROM DUAL`;
    const result = await Conn.execute(query);
    let data = [];
    if (result.rows[0][0].length > 0) {
      for (let dt = 0; dt < result.rows[0][0].length; dt++) {
        data.push({
          SEQ: dt + 1,
          FACTORY: result.rows[0][0][dt][1],
          PROC: result.rows[0][0][dt][2],
          PROC_DESC: result.rows[0][0][dt][3],
          PROD_DATE: result.rows[0][0][dt][4],
          MC_NO: result.rows[0][0][dt][5],
          WORKING_RECORD: result.rows[0][0][dt][6],
          OPER: result.rows[0][0][dt][7],
          EMCS: result.rows[0][0][dt][8],
          TTT_TOOLS_TYPE_NAME: result.rows[0][0][dt][9],
          TTL_TOOLS_CODE: result.rows[0][0][dt][10],
          PROC_ID: result.rows[0][0][dt][11],
          SCAN_IN: result.rows[0][0][dt][12],
        });
      }
    }

    DisconnectOracleDB(Conn);
    res.status(200).json(data);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

// not use
module.exports.GetFVIBadmarkResultByLot = async function (req, res) {
  var query = "";
  try {
    const Conn = await ConnectOracleDB("PCTTTEST");

    const { _strPrdName, _strLotNo, _strRate } = req.body;
    query += ` SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_GetFVIBadReByLot( '${_strPrdName}','${_strLotNo}','${_strRate}') AS DATA1 FROM DUAL`;
    const result = await Conn.execute(query);
    if (result.rows.length > 0) {
      let data = [];

      for (let i = 0; i < result.rows[0][0].length; i++) {
        data.push({
          PRD_MODEL: result.rows[0][0][i][0],
          DATA_ROW: result.rows[0][0][i][1],
          DATA_COLUMN: result.rows[0][0][i][2],
          SMP_PCS_NO: result.rows[0][0][i][3],
          AOM_PCS_NO: result.rows[0][0][i][4],
          AOI_PCS_NO: result.rows[0][0][i][5],
          AOI_LEAF_NO: result.rows[0][0][i][6],
          OST_PCS_NO: result.rows[0][0][i][7],
          CONN_SHT_PCS_NO: result.rows[0][0][i][8],
          Y: result.rows[0][0][i][9],
          X: result.rows[0][0][i][10],
          BADMARK_COUNT: result.rows[0][0][i][11],
          TATAL_QTY: result.rows[0][0][i][12],
          BADMARK_PCT: result.rows[0][0][i][13],
          BADMARK_COLOR: result.rows[0][0][i][14],
        });
      }
    }

    res.status(200).json(data);
    DisconnectOracleDB(Conn);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

module.exports.fnlotrollleafdata = async function (req, res) {
  var query = "";

  try {
    const client = await ConnectPG_DB();
    const strrollno = req.query.strrollno;
    query += `select * from  "Traceability".trc_036_traceviewroll_fnlotrollleafdata('${strrollno}')`;

    const result = await client.query(query);
    res.status(200).json(result.rows);
    await DisconnectPG_DB(client);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

module.exports.GetSMTSheetReflowResult = async function (req, res) {
  var query = "";
  try {
    const data = JSON.stringify(req.body);
    query = ` SELECT * FROM "Traceability".trc_000_common_getsmtsheetreflowresult('${data}'); `;

    const client = await ConnectPG_DB();
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    writeLogError(err.message, query);
    res.status(500).json({ message: err.message });
  }
};

module.exports.fnGetEDOCLink = async function (req, res) {
  var query = "";
  try {
    const Conn = await ConnectOracleDB("PCTTTEST");
    const { strEMCS, strRev } = req.body;
    query += ` SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_fnGetEDOCLink( '${strEMCS}','${strRev}') AS DATA1 FROM DUAL`;
    const result = await Conn.execute(query);
    let data = [];

    if (result.rows[0][0].length > 0) {
      for (let i = 0; i < result.rows[0][0].length; i++) {
        data.push({
          EMCS_TYPE: result.rows[0][0][i][0],
          EMCS_NO: result.rows[0][0][i][1],
          EMCS_REV: result.rows[0][0][i][2],
        });
      }
    }
    res.status(200).json(data);
    DisconnectOracleDB(Conn);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

module.exports.fnGetDocumentLink = async function (req, res) {
  var query = "";
  try {
    const Conn = await ConnectOracleDB("FPC");

    const { strEMCS } = req.body;
    query += ` SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_fnGetDocumentLink( '${strEMCS}') AS DATA1 FROM DUAL`;
    const result = await Conn.execute(query);
    let data = [];

    if (result.rows[0][0].length > 0) {
      for (let i = 0; i < result.rows[0][0].length; i++) {
        data.push({
          dcn_type: result.rows[0][0][i][0],
          dcn_dep: result.rows[0][0][i][1],
          dcn_filepdf: result.rows[0][0][i][2],
          dcn_newrev: result.rows[0][0][i][3],
          filepdf: result.rows[0][0][i][4],
        });
      }
    }
    res.status(200).json(data);
    DisconnectOracleDB(Conn);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

module.exports.GetMeterial = async function (req, res) {
  var query = "";
  try {
    const Conn = await ConnectOracleDB("PCTTTEST");
    const { txtLotNo } = req.body;
    query += ` SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_GetMeterial( '${txtLotNo}') AS DATA1 FROM DUAL`;
    const result = await Conn.execute(query);
    let data = [];

    if (result.rows[0][0].length > 0) {
      for (let dt = 0; dt < result.rows[0][0].length; dt++) {
        data.push({
          VENDER_LOT: result.rows[0][0][dt][0],
          LOT: result.rows[0][0][dt][1],
        });
      }
    }
    res.status(200).json(data);
    DisconnectOracleDB(Conn);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

module.exports.get_spi_aoi_result_p1 = async function (req, res) {
  var query = "";
  try {
    const data = JSON.stringify(req.body);
    query = ` call "Traceability".trc_000_common_get_spi_aoi_result_p1('${data}','','',''); `;
    const client = await ConnectPG_DB();
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json(result.rows);
  } catch (err) {
    writeLogError(err.message, query);
    res.status(500).json({ message: err.message });
  }
};

// SELECT * from "Traceability".trc_000_common_getcavityserialbarcodegrade('{"strProduct":"RGPZ-445ML-0D","plant_code":"5"}');
module.exports.GetCavitySerialBarcodeGrade = async function (req, res) {
  var query = "";
  try {
    const data = JSON.stringify(req.body);
    const client = await ConnectPG_DB();
    // console.log(data)
    query = ` select * from "Traceability".trc_000_common_getcavityserialbarcodegrade('${data}'); `;

    const result = await client.query(query);
    await DisconnectPG_DB(client);
    res.status(200).json(result.rows);
  } catch (err) {
    writeLogError(err.message, query);
    res.status(500).json({ message: err.message });
  }
};

module.exports.GetSerialBoxTestResultManyTable222 = async function (req, res) {
  var query = "";
  try {
    
    let { dataList, dtSerial } = req.body;

    if (!dataList || !dtSerial || dtSerial.length === 0) {
      return res.status(400).json({ message: "Missing necessary data." });
    }

    const queries = [];
    for (let i = 0; i < dtSerial.length; i++) {
      let strSerial = dtSerial[i].SERIAL || "";

      if (dataList[0] && strSerial !== "") {
        dataList[0].strSerial = strSerial;
      } else if (dataList[0] && strSerial === "") {
        dataList[0].strSerial = "";
      }
    console.log(dataList[0],'bbbbb',dtSerial.length)
      const json_convertdata = JSON.stringify(dataList);
      const query = `CALL "Traceability".trc_000_common_getserialboxtestresultmanytable('${json_convertdata}','','{}')`;
      queries.push(query);
    }
     
    const client = await ConnectPG_DB();
    const result = await Promise.all(
      queries.map((query) => client.query(query))
    );
    await DisconnectPG_DB(client);

    result.forEach((res, index) => {
      const response = res.rows[0].response;

      if (response) {
        const updatedSerial = dtSerial[index];
        if (response.SERIAL) updatedSerial.SERIAL = response.SERIAL;
        if (response.TEST_RESULT) updatedSerial.TEST_RESULT = response.TEST_RESULT;
        if (response.TYPE_TEST_RESULT)  updatedSerial.TYPE_TEST_RESULT = response.TYPE_TEST_RESULT;
        if (response.REJECT) updatedSerial.REJECT = response.REJECT;
        if (response.TOUCH_UP) updatedSerial.TOUCH_UP = response.TOUCH_UP;
        if (response.REJECT2) updatedSerial.REJECT2 = response.REJECT2;
        if (response.REJECT_CODE)  updatedSerial.REJECT_CODE = response.REJECT_CODE;
        if (response.REMARK) updatedSerial.REMARK = response.REMARK;
        if (response.UPDATE_FLG) updatedSerial.UPDATE_FLG = response.UPDATE_FLG;
        if (response.FRONT_SHEET_NO)  updatedSerial.FRONT_SHEET_NO = response.FRONT_SHEET_NO;
        if (response.BACK_SHEET_NO) updatedSerial.BACK_SHEET_NO = response.BACK_SHEET_NO;
        if (response.SHEET_PCS_NO) updatedSerial.SHEET_PCS_NO = response.SHEET_PCS_NO;
        if (response.ROLL_LEAF_NO)  updatedSerial.ROLL_LEAF_NO = response.ROLL_LEAF_NO;
      }
    });
      
      
      
    //   let response = result.rows[0].response;
    //   if (response != null) {
    //     if (response.TEST_RESULT != null || response.TEST_RESULT != "") {
    //       dtSerial.TEST_RESULT = response.TEST_RESULT;
    //     }
    //     if (
    //       response.TYPE_TEST_RESULT != null ||
    //       response.TYPE_TEST_RESULT != ""
    //     ) {
    //       dtSerial.TYPE_TEST_RESULT = response.TYPE_TEST_RESULT;
    //     }
    //     if (response.PLASMA_TIME != null || response.PLASMA_TIME != "") {
    //       dtSerial.PLASMA_TIME = response.PLASMA_TIME;
    //     }
    //     if (response.REJECT != null || response.REJECT != "") {
    //       dtSerial.REJECT = response.REJECT;
    //     }
    //     if (response.TOUCH_UP != null || response.TOUCH_UP != "") {
    //       dtSerial.TOUCH_UP = response.TOUCH_UP;
    //     }
    //     if (response.REJECT2 != null || response.REJECT2 != "") {
    //       dtSerial.REJECT2 = response.REJECT2;
    //     }
    //     if (response.REJECT_CODE != null || response.REJECT_CODE != "") {
    //       dtSerial.REJECT_CODE = response.REJECT_CODE;
    //     }
    //     if (response.REMARK != null || response.REMARK != "") {
    //       dtSerial.REMARK = response.REMARK;
    //     }
    //     if (response.UPDATE_FLG != null || response.UPDATE_FLG != "") {
    //       dtSerial.UPDATE_FLG = response.UPDATE_FLG;
    //     }
    //     if (response.ROW_COUNT != null || response.ROW_COUNT != "") {
    //       dtSerial.ROW_COUNT = response.ROW_COUNT;
    //     }
    //     if (response.FRONT_SHEET_NO != null || response.FRONT_SHEET_NO != "") {
    //       dtSerial.FRONT_SHEET_NO = response.FRONT_SHEET_NO;
    //     }
    //     if (response.BACK_SHEET_NO != null || response.BACK_SHEET_NO != "") {
    //       dtSerial.BACK_SHEET_NO = response.BACK_SHEET_NO;
    //     }
    //     if (response.SHEET_PCS_NO != null || response.SHEET_PCS_NO != "") {
    //       dtSerial.SHEET_PCS_NO = response.SHEET_PCS_NO;
    //     }
    //     if (response.SHEET_PCS_NO != null || response.SHEET_PCS_NO != "") {
    //       dtSerial.SHEET_PCS_NO = response.SHEET_PCS_NO;
    //     }
    //   }
    // }
console.log(dtSerial,'dtSerial33')
    res.status(200).json(dtSerial);

    
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};


module.exports.GetSerialBoxTestResultManyTable = async function (req, res) {
  let data = [{}];
  try {
    let { dataList, dtSerial } = req.body;

    if (!dataList || !dtSerial || dtSerial.length === 0) {
      return res.status(400).json({ message: "Missing necessary data." });
    }

    const queries = [];
    for (let i = 0; i < dtSerial.length; i++) {
      let strSerial = dtSerial[i].SERIAL || "";

      if (dataList[0] && strSerial !== "") {
        dataList[0].strSerial = strSerial;
      } else if (dataList[0] && strSerial === "") {
        dataList[0].strSerial = "";
      }

      const json_convertdata = JSON.stringify(dataList);
      console.log(json_convertdata,'mmmmm')
      const query = `CALL "Traceability".trc_000_common_getserialboxtestresultmanytable('${json_convertdata}','','{}')`;
      queries.push(query);
    }

    const client = await ConnectPG_DB();
    const result = await Promise.all(
      queries.map((query) => client.query(query))
    );
    await DisconnectPG_DB(client);

    result.forEach((res, index) => {
      const response = res.rows[0].response;

      if (response) {
        const updatedSerial = dtSerial[index];
        if (response.TEST_RESULT) updatedSerial.TEST_RESULT = response.TEST_RESULT;
        if (response.TEST_RESULT)
          updatedSerial.TYPE_TEST_RESULT = response.TYPE_TEST_RESULT;
        if (response.TYPE_TEST_RESULT)
          updatedSerial.TYPE_TEST_RESULT = response.TYPE_TEST_RESULT;
        if (response.PLASMA_TIME) updatedSerial.PLASMA_TIME = response.PLASMA_TIME;
        if (response.REJECT) updatedSerial.REJECT = response.REJECT;
        if (response.TOUCH_UP) updatedSerial.TOUCH_UP = response.TOUCH_UP;
        if (response.REJECT2)
          updatedSerial.REJECT2 = response.REJECT2;
        if (response.REJECT_CODE) updatedSerial.REJECT_CODE = response.REJECT_CODE;
        if (response.REMARK) updatedSerial.REMARK = response.REMARK;
        if (response.UPDATE_FLG)
          updatedSerial.UPDATE_FLG = response.UPDATE_FLG;
        if (response.ROW_COUNT)
          updatedSerial.ROW_COUNT = response.ROW_COUNT;
        if (response.FRONT_SHEET_NO)
          updatedSerial.FRONT_SHEET_NO = response.FRONT_SHEET_NO;
        if (response.BACK_SHEET_NO)
          updatedSerial.BACK_SHEET_NO = response.BACK_SHEET_NO;
        if (response.SHEET_PCS_NO)
          updatedSerial.SHEET_PCS_NO = response.SHEET_PCS_NO;
       
      }
    });

    console.log("GetSerialTestResultManyTable", dtSerial);
    res.status(200).json(dtSerial);
  } catch (err) {
    writeLogError(err.message, query);
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
};