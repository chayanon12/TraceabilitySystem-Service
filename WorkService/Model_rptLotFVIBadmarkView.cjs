const {
  ConnectPG_DB,
  DisconnectPG_DB,
  ConnectOracleDB,
  DisconnectOracleDB,
} = require("../Conncetion/DBConn.cjs");
const { writeLogError } = require("../Common/LogFuction.cjs");
const Fac = process.env.FacA1;

module.exports.GetSMTConnectShtPcsProduct = async function (req, res) {
  var query = "";
  try {
    const { dataList } = req.body;
    const client = await ConnectPG_DB();
    const json_convertdata = JSON.stringify(dataList);
    query += ` SELECT * from "Traceability".trc_031_fvibadmark_getsmtconnectshtpcsproduct('[${json_convertdata}]')`;
    const result = await client.query(query);
    res.status(200).json(result.rows[0]);
    await DisconnectPG_DB(client);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

async function GetSMTConnectShtPcsShippingNO(dataList) {
  let query = "";
  try {
    const client = await ConnectPG_DB();
    const json_convertdata = JSON.stringify(dataList);
    query += ` SELECT * from "Traceability".trc_031_fvibadmark_getsmtconnectshtpcsshippingno('[${json_convertdata}]')`;

    const result = await client.query(query);
    await DisconnectPG_DB(client);
    return result.rows[0].leaf_no;
  } catch (error) {
    writeLogError(error.message, query);
    return error.message;
  }
}

module.exports.GetFVIBadmarkResultBySheet = async function (req, res) {
  var query = "";
  try {
    const { dataList } = req.body;
    let _strShippingNo = await GetSMTConnectShtPcsShippingNO(dataList);
    const client = await ConnectOracleDB("PCTTTEST");
    query += ` SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_GetFVIBadReBySheet( '${dataList._strPrdName}','${_strShippingNo}') AS DATA1 FROM DUAL`;
    const result = await client.execute(query);
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

      res.status(200).json(data);
      DisconnectOracleDB(client);
    }
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};
module.exports.GetFVIBadmarkSheetByLot = async function (req, res) {
  var query = "";
  try {
    const { _strPlantCode, strPrdName, strLot, StrX, StrY } = req.body;
    const client = await ConnectOracleDB("PCTTTEST");
    query += ` SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_GetFVIBadSheetByLot( '${strPrdName}','${strLot}','${StrX}','${StrY}') AS DATA1 FROM DUAL`;
    const result = await client.execute(query);
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
          SHEET_NO: result.rows[0][0][i][11],
          FRONT_SHEET_NO: result.rows[0][0][i][12],
          BACK_SHEET_NO: result.rows[0][0][i][13],
          OST_RESULT: result.rows[0][0][i][14],
          AOI_RESULT: result.rows[0][0][i][15],
          strPlantCode: _strPlantCode,
          strSerialno: result.rows[0][0][i][11],
        });
      }

      for (let _drRow = 0; _drRow < data.length; _drRow++) {
        let _dtSheet = GetSheetDataBySerialNo(data);
        if (_dtSheet.length > 0) {
          data[_drRow].FRONT_SHEET_NO = _dtSheet.sheet_no_front;
          data[_drRow].BACK_SHEET_NO = _dtSheet.sheet_no_back;
        } else {
          data[_drRow].FRONT_SHEET_NO = data[_drRow].SHEET_NO;
        }
      }
      res.status(200).json(data);
      DisconnectOracleDB(client);
    }
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

async function GetSheetDataBySerialNo(data) {
  var query = "";
  try {
    const data_LIST = JSON.stringify(data);
    query = ` SELECT * FROM "Traceability".trc_000_common_getsheetdatabyserialno('${data_LIST}'); `;
    const client = await ConnectPG_DB();
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    return result.rows;

    //res.status(200).json(result.rows[0]);
  } catch (err) {
    writeLogError(err.message, query);
    return err.message;
  }
}

module.exports.GetFVIBadmarkSerialBySheet = async function (req, res) {
  var query = "";

  try {
    let _dtSerial = "";
    const { strPlantCode, strPrdName, strLot, StrX, StrY } = req.body;
    const client = await ConnectOracleDB("PCTTTEST");
    query += `SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_GetFVIBadSeBySheet('${strPrdName}','${StrX}','${StrY}') AS DATA1 FROM DUAL`;

    const result = await client.execute(query);

    if (result.rows.length > 0) {
      let data = [];

      for (let i = 0; i < result.rows[0][0].length; i++) {
        data.push({
          PRD_MODEL: result.rows[0][0][i][0],
          SERIAL_NO: result.rows[0][0][i][1],
          SMP_PCS_NO: result.rows[0][0][i][2],
          AOM_PCS_NO: result.rows[0][0][i][3],
          AOI_PCS_NO: result.rows[0][0][i][4],
          AOI_LEAF_NO: result.rows[0][0][i][5],
          OST_PCS_NO: result.rows[0][0][i][6],
          CONN_SHT_PCS_NO: result.rows[0][0][i][7],
          X: result.rows[0][0][i][8],
          Y: result.rows[0][0][i][9],
          _strPlantCode: strPlantCode,
          _strSheetNo: strLot,
        });
      }

      if (data.length > 0) {
        _dtSerial = await GetFVIBadmarkSerialBySheet2(data);
      }

      for (let _drRow = 0; _drRow < _dtSerial.length; _drRow++) {
        let _dtSheet = GetSheetDataBySerialNo(data);
        if (_dtSheet.length > 0) {
          _dtSerial[_drRow].front_sheet_no = _dtSheet.sheet_no_front;
          _dtSerial[_drRow].back_sheet_no = _dtSheet.sheet_no_back;
        } else {
          _dtSerial[_drRow].front_sheet_no = _dtSerial[_drRow].serial_no;
        }
      }
      res.status(200).json(_dtSerial);
      await DisconnectOracleDB(client);
    }
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

async function GetFVIBadmarkSerialBySheet2(data) {
  var query = "";
  try {
    const client = await ConnectPG_DB();
    const json_convertdata = JSON.stringify(data);
    query += ` SELECT * from "Traceability".trc_031_fvibadmark_getfvibadmarkserialbysheet('${json_convertdata}')`;
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    return result.rows;
  } catch (error) {
    writeLogError(error.message, query);
    return message;
  }
}

module.exports.GetSerialOSTResult = async function (req, res) {
  let query = "";
  try {
    const { SerialNo, intPCSNo, strSMPJCavityFlg } = req.body;
    const Conn = await ConnectOracleDB("PCTTTEST");
    query = `SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_GetSerialOSTResult('${SerialNo}', '${intPCSNo}', '${strSMPJCavityFlg}') AS DATA1 FROM DUAL`;
    const result = await Conn.execute(query);
    if (result.rows.length > 0) {
      let data = [];

      for (let i = 0; i < result.rows[0][0].length; i++) {
        data.push({
          SHEET_NO: result.rows[0][0][i][0],
          PCS_NO: result.rows[0][0][i][1],
          OST_RESULT: result.rows[0][0][i][2],
          OST_DATE: result.rows[0][0][i][3],
          OST_MACHINE: result.rows[0][0][i][4],
        });
      }
      await DisconnectOracleDB(Conn);
      res.status(200).json(data);
    }
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};

module.exports.GetSerialAOIEFPCResult = async function (req, res) {
  {
    let query = "";
    try {
      const {
        _strPlantCode,
        _strFrontSheetNo,
        _intPcsNo,
        _strProduct,
        _strSMPJCavityFlg,
      } = req.body;
      let roll_leaf = await GetRollLeafBySheetNo(
        _strPlantCode,
        _strFrontSheetNo
      );
      const Conn = await ConnectOracleDB("PCTTTEST");

      query = `SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_GetSeAOIEFPCResult('${_strPlantCode}', '${_strFrontSheetNo}', ${_intPcsNo},'${_strProduct}','${_strSMPJCavityFlg}','${roll_leaf}') AS  FROM DUAL`;

      const result = await Conn.execute(query);
      if (result.rows.length > 0) {
        let data = [];

        for (let i = 0; i < result.rows[0][0].length; i++) {
          data.push({
            ROLL_LEAF: result.rows[0][0][i][0],
            LEAF_NO: result.rows[0][0][i][1],
            PCS_NO: result.rows[0][0][i][2],
            AOI_RESULT: result.rows[0][0][i][3],
            AOI_DATE: result.rows[0][0][i][4],
            AOI_MACHINE: result.rows[0][0][i][5],
          });
        }
        res.status(200).json(data);
        await DisconnectOracleDB(Conn);
      }
    } catch (error) {
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  }
};

async function GetRollLeafBySheetNo(strPlantCode, strSheetNo) {
  let query = "";
  let roll_leaf = "";
  try {
    const client = await ConnectPG_DB();
    query = `SELECT * FROM "Traceability".GetRollLeafBySheetNo('[{"strPlantCode": "${strPlantCode}", "strSheetNo": "${strSheetNo}"}]')`;

    // Execute the query
    const result = await client.query(query);
    await DisconnectPG_DB(client);
    if (result.rows.length > 0) {
      if (
        result.rows[0].roll_leaf != "" ||
        result.rows[0].roll_leaf != undefined ||
        result.rows[0].roll_leaf == null
      ) {
        roll_leaf = result.rows[0].roll_leaf;
      }
    }
    return roll_leaf;
  } catch (error) {
    writeLogError(error.message, query);
    return error.message;
  }
}
