const {
  ConnectPG_DB,
  DisconnectPG_DB,
  ConnectOracleDB,
  DisconnectOracleDB,
} = require("../Conncetion/DBConn.cjs");
const oracledb = require("oracledb");
const { writeLogError } = require("../Common/LogFuction.cjs");

let CONNECT_SERIAL_ERROR = "999999";

module.exports.xxxxxx = async function (req, res) {
  try {
    var strplantcode = "G";
    var query = "";
    const client = await ConnectPG_DB();
    query = `SELECT * from "Traceability".trc_000_common_getproductdata('${strplantcode}')`;
    const result = await client.query(query);
    await DisconnectPG_DB(client);

    res.status(200).json({ Result: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// module.exports.SetSerialLotShtELTTable = async function (req, res) {
//   var query1 = "";
//   var query2 = "";
//   try {
//     const client = await ConnectPG_DB();
//     let { data } = req.body;
//     // console.log(data.length);

//     console.log(data);
//     if (data && Array.isArray(data)) {
//       for (let i = 0; i < data.length; i++) {
//         data[i].strPlantCode = "THA";
//         var _strSerial = "";
//         var _strSideFront = "";
//         var _strSideBack = "";
//         var _strPcsNo = "";
//         var _strErrorMsg = "";
//         var _strPlantCode = data[i].strPlantCode;
//         var _strProductName = data[i].strProductName;
//         _strSerial = data[i].SERIAL;
//         _strSideFront = data[i].FRONT_SIDE;
//         _strSideBack = data[i].BACK_SIDE;
//         _strPcsNo = data[i].SEQ;
//         console.log(_strSerial.length, data[i].intSerialLength);
//         if (
//           _strSerial != "" &&
//           _strSerial != CONNECT_SERIAL_ERROR &&
//           _strSerial.length == data[i].intSerialLength
//         ) {
//           console.log("เเเเเเเ");
//           query1 = `
//         SELECT S.SHE_PLANT_CODE,  
//           S.SHE_SHEET_NO,  
//           S.SHE_ELT_TYPE,  
//           S.SHE_CAVITY_NO,  
//           S.SHE_SEQ_NO,  
//           S.SHE_INS_RESULT,  
//           S.SHE_MACHINE_ID,  
//           S.SHE_PRODUCT_NAME,  
//           TO_CHAR(S.SHE_INS_DATE,'dd/mm/yyyy hh24:mi:ss') AS SHE_INS_DATE,  
//           S.SHE_CREATE_BY,  
//           S.SHE_CREATE_PROGRAM,  
//           TO_CHAR(S.SHE_CREATE_DATE,'dd/mm/yyyy hh24:mi:ss') AS SHE_CREATE_DATE,  
//           S.SHE_UPDATE_BY,  
//           S.SHE_UPDATE_PROGRAM,  
//           TO_CHAR(S.SHE_UPDATE_DATE,'dd/mm/yyyy hh24:mi:ss') AS SHE_UPDATE_DATE ,
//           (select COUNT(*) FROM "Traceability".trc_CHECKER_HEADER H WHERE H.CHE_PLANT_CODE = T.PST_PLANT_CODE AND H.CHE_TEST_TYPE = T.PST_TEST_TYPE AND H.CHE_SERIAL_NO = '${_strSerial}') AS ELT_COUNT 
//         FROM "Traceability".trc_SHEET_ELT S  
//           , "Traceability".trc_PRODUCT_SERIAL_TEST T  
//           , "Traceability".trc_SHEET_ELT_POSI P  
//         WHERE S.SHE_PLANT_CODE =T.PST_PLANT_CODE  
//           AND S.SHE_ELT_TYPE = T.PST_TEST_TYPE  
//           AND T.PST_PLANT_CODE =P.SHP_PLANT_CODE 
        
//           AND S.SHE_CAVITY_NO = P.SHP_ELT_CAVITY_NO   
//           AND T.PST_PRD_NAME ='${_strProductName}'
//           AND T.PST_PLANT_CODE = '${_strPlantCode}'
//           AND (S.SHE_SHEET_NO = '${_strSideFront}' 
//           OR   S.SHE_SHEET_NO = '${_strSideBack}' )
//           AND P.SHP_SHT_POS_NO = ${_strPcsNo}`;
//           console.log(query1);
//           console.log("jgjgjgj");
//           const result = await client.query(query1);
//           // const result = await client.query(query);
//           // let _dtDataELT = result.rows;
//           console.log("_dtDataELT", result.rows);
//           if (result.rows.length > 0) {
//             console.log("update or insert", result.rows[0].elt_count);
//             if (result.rows[0].elt_count > "0") {
//               console.log("update");
//             } else {
//               console.log("insert");

//               query1 = `
//               INSERT INTO "Traceability".trc_checker_header
//               ( 
//                 che_plant_code 
//                 , che_test_type 
//                 , che_serial_no 
//                 , che_inspect_count 
//                 , che_product_name 
//                 , che_master_ver 
//                 , che_prod_result 
//                 , che_inspect_date 
//                 , che_machine_name 
//                 , che_create_by 
//                 , che_create_program 
//                 , che_create_date 
//                 , che_update_by 
//                 , che_update_program 
//                 , che_update_date 
//                ) 
//                values 
//                (   
//                  '${result.rows[0].she_plant_code}'
//                  ,'${result.rows[0].she_elt_type}'
//                  , '${_strSerial}' 
//                  ,'${result.rows[0].she_seq_no}'
//                  ,'${result.rows[0].she_product_name}'
//                  , 1 
//                  ,'${result.rows[0].she_ins_result}'
//                  , to_date('${result.rows[0].she_ins_date}','dd/mm/yyyy hh24:mi:ss')  
//                  ,'${result.rows[0].she_machine_id}'
//                  ,'${result.rows[0].she_create_by}'
//                  ,'${result.rows[0].she_create_program}'
//                  , to_date('${result.rows[0].she_create_date}','dd/mm/yyyy hh24:mi:ss')  
//                  ,'${result.rows[0].she_update_by}'
//                  ,'${result.rows[0].she_update_program}'
//                  , to_date('${result.rows[0].she_update_date}','dd/mm/yyyy hh24:mi:ss')  
//                )`;
//                   console.log(query1)
//                const result2 = await client.query(query1);
//             }
//           } else {
//           }

//           // res.status(200).json(result.rows);
//         }
//       }
//       await DisconnectPG_DB(client);
//     }
//   } catch (error) {
//     // query += `${json_convertdata}`;
//     writeLogError(error.message, query1);
//     console.log(error, "error");
//     res.status(500).json({ message: error.message });
//   }
// };
// const json_data = JSON.stringify(data);
// query = ` SELECT * FROM "Traceability".trc_000_common_getproductshtinspectbylot('${json_data}'); `;
//   // AND T.PST_PRD_NAME LIKE P.SHP_PRODUCT_MODEL||'%'   บรรทัดที่80



module.exports.SetSerialLotShtELTTable = async function (req, res) {
  var query1 = "";
 
  try {
    const client = await ConnectPG_DB();
    let { data } = req.body;
  
    
  } catch (error) {
    // query += `${json_convertdata}`;
    writeLogError(error.message, query1);
    console.log(error, "error");
    res.status(500).json({ message: error.message });
  }
};
// const json_data = JSON.stringify(data);
// query = ` SELECT * FROM "Traceability".trc_000_common_getproductshtinspectbylot('${json_data}'); `;
//   // AND T.PST_PRD_NAME LIKE P.SHP_PRODUCT_MODEL||'%'   บรรทัดที่80
