const {
  ConnectPG_DB,
  DisconnectPG_DB,
  ConnectOracleDB,
  DisconnectOracleDB,
} = require("../Conncetion/DBConn.cjs");
const { writeLogError } = require("../Common/LogFuction.cjs");

module.exports.Get_SPI_AOI_RESULT_P1 = async function (req, res) {
  var query = "";
  let _frontSheetNumber = "";
  let _rearSheetNumber = "";
  let _pcsPosition = "";
  let intCount = 0;
  let _sheetNo = "";
  let Get_SPI_AOI_RESULT_P1 = "OK";
  let _Message = "";
  try {
    const { dataList } = req.body;
    const client = await ConnectPG_DB();
    const json_convertdata = JSON.stringify(dataList);
    query += ` SELECT * from "Traceability".trc_050_pre_result_getfistquery('[${json_convertdata}]')`;
    const result1 = await client.query(query);
    if (result1.rows.length != 0) {
      _frontSheetNumber = result1.rows[0].sheet_no_front;
      _rearSheetNumber = result1.rows[0].sheet_no_back;
      _pcsPosition = result1.rows[0].pcs_no;
    }
    try {
      if (_frontSheetNumber != "") {
        _sheetNo = _frontSheetNumber;
      } else if (_rearSheetNumber != "") {
        _sheetNo = _rearSheetNumber;
      }

      if (dataList._strSPIF == "Y" || dataList._strSPIB == "Y") {
        let query2 = `SELECT * FROM "Traceability".trc_050_finalgateP1_SecondData('[${json_convertdata}]')`;
        const result2 = await client.query(query);
        if (result2.rows.length != 0) {
          if (
            ["OK", "JUDGE", "WN", "PASS", "GOOD"].includes(
              result2.rows[0].sph_result
            )
          ) {
            _Message += " , SPI" & " : OK";
          } else {
            _Message +=
              " , SPI" & " : " & _dtData.Rows(0).Item("SPH_RESULT").ToString;
            Get_SPI_AOI_RESULT_P1 = "NG";
          }
        } else {
          if (_sheetNo !== "") {
            
          }
        }
      }
    } catch (error) {}

    await DisconnectPG_DB(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
