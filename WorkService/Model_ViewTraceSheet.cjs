const {
    ConnectPG_DB,
    DisconnectPG_DB,
    ConnectOracleDB,
    DisconnectOracleDB,
  } = require("../Conncetion/DBConn.cjs");
  const oracledb = require("oracledb");
  const { writeLogError } = require("../Common/LogFuction.cjs");


module.exports.GetLotSheet = async function (req, res) {
    var query = "";
    try {
        const {dataList} = req.body;
          const client = await ConnectPG_DB();
          const json_convertdata = JSON.stringify(dataList);
          query += ` SELECT * from "Traceability".trc_037_traceviewsheet_getlotno('[${json_convertdata}]')`;
          const result = await client.query(query);
          res.status(200).json(result.rows);
          await DisconnectPG_DB(client);
        } catch (error) {
          writeLogError(error.message, query);
          res.status(500).json({ message: error.message });
        }
  };
  module.exports.GetProductSheet = async function (req, res) {
    var query = "";
    try {
        const {dataList} = req.body;
          const client = await ConnectPG_DB();
          const json_convertdata = JSON.stringify(dataList);
          query += ` SELECT * from "Traceability".trc_037_traceviewsheet_getproduct('[${json_convertdata}]')`;
          const result = await client.query(query);
          res.status(200).json(result.rows);
          await DisconnectPG_DB(client);
        } catch (error) {
          writeLogError(error.message, query);
          res.status(500).json({ message: error.message });
        }
  };
  module.exports.GetSPI = async function (req, res) {
    var query = "";
    try {
        const {dataList} = req.body;
          const client = await ConnectPG_DB();
          const json_convertdata = JSON.stringify(dataList);
          query += ` SELECT * from "Traceability".trc_037_traceviewsheet_getspi('[${json_convertdata}]')`;
          const result = await client.query(query);
          res.status(200).json(result.rows);
          await DisconnectPG_DB(client);
        } catch (error) {
          writeLogError(error.message, query);
          res.status(500).json({ message: error.message });
        }
  };
  module.exports.GetPreAOI = async function (req, res) {
    var query = "";
    try {
      const {dataList} = req.body;
      const client = await ConnectPG_DB();
      const json_convertdata = JSON.stringify(dataList);
      query += ` SELECT * from "Traceability".trc_037_traceviewsheet_getpreaoi('[${json_convertdata}]')`;
      const result = await client.query(query);
      res.status(200).json(result.rows);
      await DisconnectPG_DB(client);
    } catch (error) {
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  };
  module.exports.GetAOI = async function (req, res) {
    var query = "";
    try {
      const {dataList} = req.body;
    const client = await ConnectPG_DB();
    const json_convertdata = JSON.stringify(dataList);
    query += ` SELECT * from "Traceability".trc_037_traceviewsheet_getaoi('[${json_convertdata}]')`;
    const result = await client.query(query);
    res.status(200).json(result.rows);
    await DisconnectPG_DB(client);
        } catch (error) {
          writeLogError(error.message, query);
          res.status(500).json({ message: error.message });
        }
  };
  module.exports.GetAOI_Coating = async function (req, res) {
    var query = "";
    try {
      const {dataList} = req.body;
    const client = await ConnectPG_DB();
    const json_convertdata = JSON.stringify(dataList);
    query += ` SELECT * from "Traceability".trc_037_traceviewsheet_getaoi_coating('[${json_convertdata}]')`;
    const result = await client.query(query);
    res.status(200).json(result.rows);
    await DisconnectPG_DB(client);
        } catch (error) {
          writeLogError(error.message, query);
          res.status(500).json({ message: error.message });
        }
  };
  module.exports.Getinspection = async function (req, res) {
    var query = "";
    try {
      const {dataList} = req.body;
    const client = await ConnectPG_DB();
    const json_convertdata = JSON.stringify(dataList);
    query += ` SELECT * from "Traceability".trc_037_traceviewsheet_get_inspection_result('[${json_convertdata}]')`;
    const result = await client.query(query);
    res.status(200).json(result.rows);
    await DisconnectPG_DB(client);
        } catch (error) {
          writeLogError(error.message, query);
          res.status(500).json({ message: error.message });
        }
  };
  module.exports.Get_LOT_SHEET_SERIAL = async function (req, res) {
    var query = "";
    try {
      const {dataList} = req.body;
    const client = await ConnectPG_DB();
    const json_convertdata = JSON.stringify(dataList);
    query += ` SELECT * from "Traceability".trc_037_traceviewsheet_get_lot_sheet_serial('[${json_convertdata}]')`;
    const result = await client.query(query);
    res.status(200).json(result.rows);
    await DisconnectPG_DB(client);
        } catch (error) {
          writeLogError(error.message, query);
          res.status(500).json({ message: error.message });
        }
  };
 

  module.exports.GetFPCSMPJPcsCavity = async function (req, res) {
    var query = "";
    try {
      const Conn = await ConnectOracleDB("PCTTTEST");
      const { strPrdName } = req.body;
      query += `SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_GetFPCSMPJPcsCavity('${strPrdName}') as PRD_NAME  FROM DUAL`;
      const result = await Conn.execute(query);
      let data=[]
      if(result.rows[0][0].length>0){
        data = [
          {
            PCS_NAME: result.rows[0][0][0][0],
            PCS_NO: result.rows[0][0][0][1]
          }]
      }
      DisconnectOracleDB(Conn);
      res.status(200).json(data);
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
  module.exports.GetSerialOSTResult = async function (req, res) {
    let query = "";
    try {
      const { SerialNo, intPCSNo, strSMPJCavityFlg } = req.body;
      const Conn = await ConnectOracleDB("PCTTTEST");
      query = `SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_GetSerialOSTResult('${SerialNo}', ${intPCSNo}, '${strSMPJCavityFlg}') AS DATA1 FROM DUAL`;
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

  module.exports.GetSerialAVIResult = async function (req, res) {
    let query = "";
  
    try {
      const { _strFrontSheetNo, _intPcsNo, _strSMPJCavityFlgfv } = req.body;
      
      const Conn = await ConnectOracleDB("PCTTTEST");
      query = `SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_GetSerialAVIResult('${_strFrontSheetNo}', ${_intPcsNo}, '${_strSMPJCavityFlgfv}') AS DATA1 FROM DUAL`;
      
      const result = await Conn.execute(query);
      
      // เช็คผลลัพธ์
      if (result.rows.length > 0 && result.rows[0][0].length > 0) {
        let data = [];
  
        for (let i = 0; i < result.rows[0][0].length; i++) {
          data.push({
            SHEET_NO: result.rows[0][0][i][0],
            PCS_NO: result.rows[0][0][i][1],
            AVI_DATE: result.rows[0][0][i][2],
            AVI_RESULT: result.rows[0][0][i][3],
            AVI_MACHINE: result.rows[0][0][i][4],
          });
        }
  
        res.status(200).json(data); // ส่งกลับข้อมูลที่ได้
      } else {
        res.status(200).json(""); // ส่งกลับเป็นอาร์เรย์ว่าง
      }
  
      await DisconnectOracleDB(Conn);
  
    } catch (error) {
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  };
  
module.exports.GetSPI_Front = async function (req, res) {
  var query = "";
  try {
    const {dataList} = req.body;
  const client = await ConnectPG_DB();
  const json_convertdata = JSON.stringify(dataList);
  query += ` SELECT * from "Traceability".trc_037_traceviewsheet_get_spi_front('[${json_convertdata}]')`;
  const result = await client.query(query);
  res.status(200).json(result.rows);
  await DisconnectPG_DB(client);
      } catch (error) {
        writeLogError(error.message, query);
        res.status(500).json({ message: error.message });
      }
};
//GetSPI_RSLT
module.exports.GetSPI_RSLT = async function (req, res) {
  var query = "";
  try {
  const {dataList} = req.body;
  const client = await ConnectPG_DB();
  const json_convertdata = JSON.stringify(dataList);
  query += ` SELECT * from "Traceability".trc_037_traceviewsheet_get_spi_rslt('[${json_convertdata}]')`;
  const result = await client.query(query);
  res.status(200).json(result.rows);
  await DisconnectPG_DB(client);
      } catch (error) {
        writeLogError(error.message, query);
        res.status(500).json({ message: error.message });
      }
};
//
module.exports.GetRslt_Header = async function (req, res) {
  var query = "";
  try {
  const {dataList} = req.body;
  const client = await ConnectPG_DB();
  const json_convertdata = JSON.stringify(dataList);
  query += ` SELECT * from "Traceability".trc_037_traceviewsheet_get_rslt_header('[${json_convertdata}]')`;
  const result = await client.query(query);
  res.status(200).json(result.rows);
  await DisconnectPG_DB(client);
      } catch (error) {
        writeLogError(error.message, query);
        res.status(500).json({ message: error.message });
      }
};
//
module.exports.GetPreSPI = async function (req, res) {
  var query = "";
  try {
  const {dataList} = req.body;
  const client = await ConnectPG_DB();
  const json_convertdata = JSON.stringify(dataList);
  query += ` SELECT * from "Traceability".trc_037_traceviewsheet_getprespi('[${json_convertdata}]')`;
  const result = await client.query(query);
  res.status(200).json(result.rows);
  await DisconnectPG_DB(client);
      } catch (error) {
        writeLogError(error.message, query);
        res.status(500).json({ message: error.message });
      }
};
//
module.exports.GetPRD_NG_DETAIL = async function (req, res) {
  var query = "";
  try {
  const {dataList} = req.body;
  const client = await ConnectPG_DB();
  const json_convertdata = JSON.stringify(dataList);
  query += ` SELECT * from "Traceability".trc_037_traceviewsheet_getpre_rslt_detail('[${json_convertdata}]')`;
  const result = await client.query(query);
  res.status(200).json(result.rows);
  await DisconnectPG_DB(client);
      } catch (error) {
        writeLogError(error.message, query);
        res.status(500).json({ message: error.message });
      }
};
// กำลังทำ trc_037_traceviewsheet_getaoi_rslt
module.exports.GetAoi_rslt = async function (req, res) {
  var query = "";
  try {
  const {dataList} = req.body;
  const client = await ConnectPG_DB();
  const json_convertdata = JSON.stringify(dataList);
  query += ` SELECT * from "Traceability".trc_037_traceviewsheet_getaoi_rslt('[${json_convertdata}]')`;
  const result = await client.query(query);
  res.status(200).json(result.rows);
  await DisconnectPG_DB(client);
      } catch (error) {
        writeLogError(error.message, query);
        res.status(500).json({ message: error.message });
      }
};
//1565 for .net
module.exports.GetAOI_COA_RSLT = async function (req, res) {
  var query = "";
  try {
  const {dataList} = req.body;
  const client = await ConnectPG_DB();
  const json_convertdata = JSON.stringify(dataList);
  query += ` SELECT * from "Traceability".trc_037_traceviewsheet_getAOI_COA_RSLT('[${json_convertdata}]')`;
  const result = await client.query(query);
  res.status(200).json(result.rows);
  await DisconnectPG_DB(client);
      } catch (error) {
        writeLogError(error.message, query);
        res.status(500).json({ message: error.message });
      }
};

// select * from "Traceability".trc_037_traceviewsheet_getXRAY2('[{"strPCS":"24","strSheetNo":"A180831355RGO8010016"}]')
module.exports.getXRAY = async function (req, res) {
  var query = "";
  try {
  const {dataList} = req.body;
  const client = await ConnectPG_DB();
  const json_convertdata = JSON.stringify(dataList); 
  query += ` select * from "Traceability".trc_037_traceviewsheet_getXRAY('[${json_convertdata}]')`;
  const result = await client.query(query);
  res.status(200).json(result.rows);
  await DisconnectPG_DB(client);
  } catch (error) {
    writeLogError(error.message, query);
    res.status(500).json({ message: error.message });
  }
};
module.exports.getXRAY2 = async function (req, res) {
  var query = "";
  try {
  const {dataList} = req.body;
  const client = await ConnectPG_DB();
  const json_convertdata = JSON.stringify(dataList);
  query += ` select * from "Traceability".trc_037_traceviewsheet_getXRAY2('[${json_convertdata}]')`;
  const result = await client.query(query);
  res.status(200).json(result.rows);
  await DisconnectPG_DB(client);
      } catch (error) {
        writeLogError(error.message, query);
        res.status(500).json({ message: error.message });
      }
};

module.exports.GetFPCPcsNoBySMPJCavity = async function (req, res) {
  {
   let query = "";
   try {
     const{strProduct,_intPcsNo} = req.body
     const Conn = await ConnectOracleDB("PCTTTEST");
     query = ` SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_GetFPCPcsNBySMPJCVY('${strProduct}','${_intPcsNo}') FROM dual`;
     const result = await Conn.execute(query);
     if (result.rows.length > 0) {
      let data = [
        {
           pcs_no: result.rows?.[0]?.[0]?.[0]?.[0] || ''
        }
      ];
      res.status(200).json(data);
      }
      await DisconnectOracleDB(Conn);
      } catch (error) {
     writeLogError(error.message, query);
     res.status(500).json({ message: error.message });
   }
 }
}



module.exports.GetSMTConnectShtPcsCavity = async function (req, res) {
  var query = "";
  try {
  const {dataList} = req.body;
  const client = await ConnectPG_DB();
  const json_convertdata = JSON.stringify(dataList);
  query += ` select * from "Traceability".trc_037_traceviewsheet_GetSMTConnectShtPcsCavity('[${json_convertdata}]')`;
  const result = await client.query(query);
  res.status(200).json(result.rows);
  await DisconnectPG_DB(client);
      } catch (error) {
        writeLogError(error.message, query);
        res.status(500).json({ message: error.message });
      }
};

// select * from "Traceability".trc_037_traceviewsheet_GetSMTSheetReflowResult('[{"strSheetNo":"A904037039RGP4350135","strPlantCode":"5"}]')

module.exports.GetSMTSheetReflowResult = async function (req, res) {
  var query = "";
  try {
  const {dataList} = req.body;
  const client = await ConnectPG_DB();
  const json_convertdata = JSON.stringify(dataList);
  query += ` select * from "Traceability".trc_037_traceviewsheet_GetSMTSheetReflowResult('[${json_convertdata}]')`;
  const result = await client.query(query);
  res.status(200).json(result.rows);
  await DisconnectPG_DB(client);
      } catch (error) {
        writeLogError(error.message, query);
        res.status(500).json({ message: error.message });
      }
};
module.exports.GetAoi_rslt_short = async function (req, res) {
  var query = "";
  try {
  const {dataList} = req.body;
  const client = await ConnectPG_DB();
  const json_convertdata = JSON.stringify(dataList);
  query += ` SELECT * from "Traceability".trc_037_traceviewsheet_getaoi_rslt_short('[${json_convertdata}]')`;
  const result = await client.query(query);
  res.status(200).json(result.rows);
  await DisconnectPG_DB(client);
      } catch (error) {
        writeLogError(error.message, query);
        res.status(500).json({ message: error.message });
      }
};
module.exports.GetAoi_rslt_short2 = async function (req, res) {
  var query = "";
  try {
  const {dataList} = req.body;
  const client = await ConnectPG_DB();
  const json_convertdata = JSON.stringify(dataList);
  query += ` SELECT * from "Traceability".trc_037_traceviewsheet_getaoi_rslt_short2('[${json_convertdata}]')`;
  const result = await client.query(query);
  res.status(200).json(result.rows);
  await DisconnectPG_DB(client);
      } catch (error) {
        writeLogError(error.message, query);
        res.status(500).json({ message: error.message });
      }
};