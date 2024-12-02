const { query } = require("express");
const {
  ConnectPG_DB,
  DisconnectPG_DB,
  ConnectOracleDB,
  DisconnectOracleDB,
} = require("../Conncetion/DBConn.cjs");
const { writeLogError } = require("../Common/LogFuction.cjs");

//Function

module.exports.GetProductDataByLot = async function (req, res) {
  let query = "";
  try {
    const Conn = await ConnectOracleDB("PCTTTEST");
    const { strLot } = req.body;
    var FINAL_GATE_LOT_PRIORITY_SKIP = process.env.FINAL_GATE_LOT_PRIORITY_SKIP;
    query += `SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_GetProductDataByLot('${strLot}','${FINAL_GATE_LOT_PRIORITY_SKIP}') AS x FROM dual`;
    const result = await Conn.execute(query);
    if (result.rows && result.rows[0] && result.rows[0][0] && result.rows[0][0] != '' && result.rows[0][0] != []) {
      var resultx = result.rows[0][0][0];
      var products = {
        PRD_NAME: resultx[0],
        ROLL_NO: resultx[1],
        LOT_EN: resultx[2],
        LOT_ALL: resultx[3],
      };
      res.status(200).json(products);
    }else{
      res.status(200).json({ PRD_NAME: "", ROLL_NO: "", LOT_EN: "", LOT_ALL: "" });
    }
    DisconnectOracleDB(Conn);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports.GetWeekCodebyLot = async function (req, res) {
  var query = "";
  try {
    const Conn = await ConnectOracleDB("PCTTTEST");
    const { strLot, strProc } = req.body;
    query += `SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_GetWeekCodebyLot('${strLot}','${strProc}') as PRN_DATE  FROM DUAL`;
    const result = await Conn.execute(query);
    if (result.rows.length > 0) {
      console.log(result.rows[0][0]);
      if (result.rows[0][0] == null) {
        res.status(200).json({ strReturn: "" });
      } else if (
        result.rows[0][0] != "" ||
        result.rows[0][0] != null ||
        result.rows[0][0] != undefined
      ) {
        _strDate = result.rows[0][0];
        let SERIAL_DATE_START_WEEK_CODE = "01/01/1970";
        let dtToday = convertDateFormat(_strDate);
        let dtStartDate = convertDateFormat(SERIAL_DATE_START_WEEK_CODE);
        let dtNextSaturday = new Date(dtToday);
        dtNextSaturday.setDate(
          dtNextSaturday.getDate() + (6 - dtToday.getDay())
        );
        let WeekCnt = String(dtNextSaturday.getWeekNumber());
        let TempStr;
        let dtNow = new Date(dtToday);
        let strMonth = dtNow.getMonth() + 1;
        let strYear;
        WeekCnt = Number(WeekCnt).toString().padStart(2, "0");
        if (strMonth === 12 && WeekCnt === "01") {
          strYear = (dtNow.getFullYear() + 1).toString();
        } else {
          strYear = dtNow.getFullYear().toString();
        }

        let LOT_NO = strLot;
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
              let strFirst = strYear.slice(0, 1);
              TempStr = ConvertBase34(
                Number(dtToday.getFullYear()) - Number(strFirst + "000")
              );
              txtYear = TempStr.slice(-1);
            } else {
              txtYear = strYear.slice(-1);
            }
            txtDay = dtToday.getDay().toString();

            _strReturn = txtYear + txtWeek + txtDay;
            break;
          case "W":
            txtYear = "";
            txtDay = "";
            if (LOT_NO !== "") {
              txtLot = LOT_NO;
              txtLot2 = LOT_NO.slice(-3, 2);
            }
            txtWeek = ConvertBase34(
              Number(strYear.slice(-1) + WeekCnt)
            ).toString();
            if (txtWeek.length === 1) {
              txtWeek = "0" + txtWeek;
            }
            _strReturn = txtWeek + txtLot2;
            break;
          case "J":
            txtDay = ChangeBase34(dtToday.getDate());
            txtMonth = ChangeBase34(dtNow.getMonth() + 1);
            txtWeek = ConvertBase34(
              Number(strYear.slice(-1) + WeekCnt)
            ).toString();
            txtYear = strYear;
            _strReturn = txtMonth + txtDay;
            break;
          case "N":
            let intDayDiff = Math.floor(
              (dtToday - dtStartDate) / (1000 * 60 * 60 * 24)
            );
            let strDayCode = Convert000(ConvertBase34(intDayDiff));

            txtMonth = strDayCode;

            txtWeek = strDayCode.slice(1, 1);
            txtYear = strDayCode.slice(0, 1);
            txtDay = strDayCode.slice(2, 1);

            _strReturn = strDayCode;
            break;
          case "U":
            txtDay = ChangeBase34(dtToday.getDate());
            txtMonth = ChangeBase34(dtNow.getMonth() + 1);
            _strReturn = txtMonth + txtDay;
            break;

          case "S":
            _strReturn = Convert0000(
              ConvertBase34(
                Number(
                  dtToday.getFullYear().toString().slice(-2) +
                    ("0" + (dtToday.getMonth() + 1)).slice(-2) +
                    ("0" + dtToday.getDate()).slice(-2)
                )
              )
            );
            break;

          case "D":
            dtStartDate = new Date(
              _strSerialInfo.replace(/(\d{4})\/(\d{2})\/(\d{2})/, "$1/$2/$3")
            );
            _strReturn = Convert0000(
              Math.floor((dtToday - dtStartDate) / (1000 * 60 * 60 * 24))
            );
            break;

          default:
            txtLot2 = LOT_NO.substr(-3, 2);
            _strReturn = txtWeek + txtLot2;
            break;
        }
        res.status(200).json({ strReturn: _strReturn });
      }
    }
    DisconnectOracleDB(Conn);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

module.exports.GetRollLeafScrapRBMP = async function (req, res) {
  var query = "";
  try {
    const Conn = await ConnectOracleDB("PCTTTEST");
    const { strRollNo } = req.body;
    query += `SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_GETROLLLEAFSCRAP('${strRollNo}') AS SCRAP_FLG  FROM dual`;
    console.log(query)
    const result = await Conn.execute(query);
    if (result.rows.length > 0) {
      res.status(200).json({ SCRAP_FLG: result.rows[0][0] });
      DisconnectOracleDB(Conn);
    }
  } catch (error) {
    writeLogError(error.message, query);
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// postgres

module.exports.GetProductData = async function (req, res) {
  var query = "";
  var Fac = process.env.FacA1;
  try {
    const client = await ConnectPG_DB();
    query += `SELECT * from "Traceability".trc_000_common_getproductdata('${Fac}')`;

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
//ok
module.exports.GetLotSerialCountData = async function (req, res) {
  let query = "";
  try {
    const { dataList } = req.body;
    const json_convertdata = JSON.stringify(dataList);
    const client = await ConnectPG_DB();
    console.log(json_convertdata);
    query += `SELECT * from "Traceability".trc_000_common_getlotserialcountdata('[${json_convertdata}]')`;
    const result = await client.query(query);
    res.status(200).json(result.rows[0]);
    await DisconnectPG_DB(client);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};
//ok
module.exports.SetRollLeafTrayTable = async function (req, res) {
  var query = "";
  try {
    const client = await ConnectPG_DB();
    const {
      strOperator,
      strRowUpdate,
      strUpdateFlg,
      strRollNo,
      strLotNo,
      strRollLeaf,
      strSheetNo,
      strShtSeq,
      strIntRow,
      strProduct,
      strMachine,
      strUserID,
    } = req.body;
    const jsondata = {
      strRowUpdate: strRowUpdate,
      strUpdateFlg: strUpdateFlg,
      strRollNo: strRollNo,
      strLotNo: strLotNo,
      strRollLeaf: strRollLeaf,
      strSheetNo: strSheetNo,
      strShtSeq: strShtSeq,
      strIntRow: strIntRow,
      strProduct: strProduct,
      strMachine: strMachine,
      strUserID: strUserID,
      strOperator: strOperator,
      strPlantCode: "5",
    };
    const json_convertdata = JSON.stringify(jsondata);
    console.log(json_convertdata);
    query += `CALL "Traceability".trc_000_common_setrollleaftraytable('[${json_convertdata}]','');`;
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
//ok
module.exports.GetConnectShtMasterCheckResult = async function (req, res) {
  let query = "";
  var SHT_PCS_MASTER_FLG = process.env.SHT_PCS_MASTER_FLG;
  if (SHT_PCS_MASTER_FLG == "1 ") {
    try {
      const { strPrdname } = req.body;

      var SHT_PCS_MASTER_CODE = process.env.SHT_PCS_MASTER_CODE;
      var WORKING_START_TIME = process.env.WORKING_START_TIME;
      var SHT_PCS_MASTER_TIME = process.env.SHT_PCS_MASTER_TIME;

      const client = await ConnectPG_DB();
      const jsondata = {
        strProduct: strPrdname,
        strPcsmasterCode: SHT_PCS_MASTER_CODE,
        strWorkstartime: WORKING_START_TIME,
        strShtPcsmastertime: SHT_PCS_MASTER_TIME,
        strPlantCode: "5",
      };
      const json_convertdata = JSON.stringify(jsondata);
      query += `SELECT * FROM "Traceability".trc_000_common_getconnectshtmastercheckresult('[${json_convertdata}]');`;
      const result = await client.query(query);
      res.status(200).json(result.rows[0]);
      await DisconnectPG_DB(client);
    } catch (error) {
      writeLogError(error.message, query);
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(200).json({ prd_name: "OK" });
  }
};
//ok
module.exports.GetRollLeafDuplicate = async function (req, res) {
  let query = "";
  let intCount = 0;
  try {
    const { strRollLeaf, _dtRollLeaf } = req.body;
    let data = {
      strRollLeaf: strRollLeaf,
      strPlantCode: "5",
    };
    const json_data = JSON.stringify(data);
    const client = await ConnectPG_DB();
    let datax = [];
    datax = Object.entries(_dtRollLeaf);
    console.log(datax.length);

    query += `SELECT * FROM "Traceability".trc_000_common_getrollleafduplicate('[${json_data}]')`;
    const result = await client.query(query);
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
//ok
module.exports.GetSheetDuplicateConnectShtType = async function (req, res) {
  let query = "";
  try {
    const { strSheetnoF, strSheetnoB, strSheetType } = req.body;
    const client = await ConnectPG_DB();
    const jsondata = {
      strSheetnoF: strSheetnoF,
      strSheetnoB: strSheetnoB,
      strPlantCode: "5",
    };
    console.log(jsondata,strSheetType);
    if (strSheetType == "D") {
      const json_convertdata = JSON.stringify(jsondata);
      query += `SELECT * FROM "Traceability".trc_000_common_getsheetduplicateconnectshttyped('[${json_convertdata}]');`;
      const result = await client.query(query);
      if (result.rows.length > 0) {
        res.status(200).json(result.rows[0]);
        await DisconnectPG_DB(client);
      }
    } else {
      const json_convertdata = JSON.stringify(jsondata);
      query += `SELECT * FROM "Traceability".trc_000_common_getsheetduplicateconnectshtnotype('[${json_convertdata}]');`;
      const result = await client.query(query);
      if (result.rows.length > 0) {
        res.status(200).json(result.rows.sheet_count);
        await DisconnectPG_DB(client);
      }
    }
  } catch (error) {
    writeLogError(error.message, query);
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
//ok
module.exports.GetConnectShtPlasmaTime = async function (req, res) {
  let query = "";
  let _strError = "";
  try {
    const { strSheetnoF, strSheetnoB, lot_no, dblPlasmaTime } = req.body;
    const client = await ConnectPG_DB();
    const jsondata = {
      strSheetnoF: strSheetnoF,
      strSheetnoB: strSheetnoB,
      strPlantCode: "5",
    };
    const json_convertdata = JSON.stringify(jsondata);
    query += `SELECT * FROM "Traceability".trc_000_common_getconnectshtplasmatime('[${json_convertdata}]');`;
    const result = await client.query(query);
    if (result.rows.length > 0) {
      data = result.rows[0];
      console.log(data);
      if (data.lot_no !== "") {
        console.log(parseFloat(data.plasma_time));
        if (lot_no !== data.lot_no) {
          _strError = "Sheet mix lot";
        } else if (parseFloat(data.plasma_time) > dblPlasmaTime) {
          _strError = `Sheet over control plasma time ${dblPlasmaTime} hrs.`;
        }
      } else {
        _strError = "Sheet no record plasma time";
      }
    } else {
      _strError = "Sheet no record plasma time";
    }
    if (_strError) {
      res.status(200).json({ error: _strError });
    }
    await DisconnectPG_DB(client);
  } catch (error) {
    writeLogError(error.message, query);
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
//ok
module.exports.GetSerialDuplicateConnectSht = async function (req, res) {
  let query = "";
  try {
    const { dataList } = req.body;
    const json_convertdata = JSON.stringify(dataList);
    const client = await ConnectPG_DB();
    query += `select * from "Traceability".trc_000_common_getserialduplicateconnectsht('[${json_convertdata}]')`;
    const result = await client.query(query);
    if (result.rows.length > 0) {
      var intRow = 1;
      res.status(200).json({ intRow: intRow ,strSerialNoDup:result.rows[0].serial_no});
      await DisconnectPG_DB(client);
    } else {
      res.status(200).json({ intRow: 0,strSerialNoDup:'' });
    }
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

module.exports.SetSerialRecordTimeTrayTable = async function (req, res) {
  let query = "";
  let json_convertdata = "";
  try {
    const dataList = req.body;
    const client = await ConnectPG_DB();
    const json_convertdata = JSON.stringify(dataList);
    query = `CALL "Traceability".trc_000_common_setserialrecordtimetraytable($1::jsonb,'')`;
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

module.exports.SetSerialLotShtTable = async function (req, res) {
  let query = "";
  let json_convertdata = "";
  try {
    const dataList = req.body;
    const client = await ConnectPG_DB();
    const json_convertdata = JSON.stringify(dataList);
    query = `CALL "Traceability".trc_000_common_SetSerialLotShtTable($1::jsonb,'')`;
    const result = await client.query(query, [json_convertdata]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
      return;
    }
    await DisconnectPG_DB(client);
  } catch (error) {
    query += `${json_convertdata}`;
    writeLogError(error.message, query);
    console.log(error, "error");
    res.status(500).json({ message: error.message });
  }
};
// new function api
function ConvertBase34(num) {
  let shou;
  let Amari = [];
  let i = 1;
  let StrTemp = "";
  let LngNumber = num;

  do {
    Amari.push(LngNumber % 34);
    shou = Math.floor(LngNumber / 34);
    if (shou === 0) {
      break;
    }
    i += 1;
    if (shou < 34) {
      Amari.push(shou);
      break;
    }
    LngNumber = shou;
  } while (true);

  for (let j = i - 1; j >= 0; j--) {
    StrTemp += ChangeBase34(Amari[j]);
  }
  return StrTemp;
}

function ChangeBase34(intnumber) {
  const strChange = "0123456789ABCDEFGHJKLMNPQRSTUVWXYZ";
  return strChange[intnumber];
}
function Convert000(strText) {
  let paddedStr = "000" + strText;
  return paddedStr.sliceing(paddedStr.length - 4);
}

function Convert0000(strText) {
  let paddedStr = "0000" + strText;
  return paddedStr.sliceing(paddedStr.length - 4);
}

function convertDateFormat(dateString) {
  var parts = dateString.split("/");
  var newDate = new Date(parts[2], parts[1] - 1, parts[0]);
  var formattedDate =
    newDate.getFullYear() +
    "/" +
    (newDate.getMonth() + 1) +
    "/" +
    newDate.getDate();
  return formattedDate;
}

module.exports.GetCountSerialByLotMagazine = async function (req, res) {
  let query = "";
  try {
    const { dataList } = req.body;
    const json_convertdata = JSON.stringify(dataList);
    const client = await ConnectPG_DB();
    // select * from "Traceability".trc_000_common_GetCountSerialByLotMagazine('[{"strLotno": "200784420", "strMgzNo": "1"}]')
    query += `select * from "Traceability".trc_000_common_GetCountSerialByLotMagazine('[${json_convertdata}]')`;
    const result = await client.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

// select * from "Traceability".trc_000_common_GetCountSerial('[{"strPlantCode":"5","strSheetNo":"THA9274223GL1XW43"}]')
// call "Traceability".trc_000_common_setmanualserialno('[{"strSerialNo":"pondtest","strProduct":"pondtest","strPlantCode":"5","strLotNo":"1111","strStation":"pondtest","strMagaZine":"222"}]','')

module.exports.GetCountSerial = async function (req, res) {
  let query = "";
  try {
    const { dataList } = req.body;
    const json_convertdata = JSON.stringify(dataList);
    const client = await ConnectPG_DB();
    query += `select * from "Traceability".trc_000_common_GetCountSerial('[${json_convertdata}]')`;
    const result = await client.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

module.exports.setmanualserialno = async function (req, res) {
  let query = "";
  try {
    const { dataList } = req.body;
    const json_convertdata = JSON.stringify(dataList);
    const client = await ConnectPG_DB();
    query += `call "Traceability".trc_000_common_setmanualserialno('[${json_convertdata}]','')`;
    const result = await client.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};