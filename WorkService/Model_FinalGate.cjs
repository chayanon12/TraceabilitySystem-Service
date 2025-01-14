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


  module.exports.GetSerialTestResultManyTableConfirm = async function (req, res) {
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
        query = `CALL "Traceability".trc_020_finalgate_getserialtestresultmanytableconfirm('${json_convertdata}','','{}')`;
  
        queries.push(query);

      }
      const client = await ConnectPG_DB();
      const result = await Promise.all(queries.map(query => client.query(query))); 
      await DisconnectPG_DB(client);
     
      result.forEach((res, index) => {
        const response = res.rows[0].response;
  
        if (response) {
         
          const updatedSerial = dtSerial[index];
          if (response.SERIAL) updatedSerial.SERIAL = response.SERIAL;
          if (response.TEST_RESULT) updatedSerial.TEST_RESULT = response.TEST_RESULT;
          if (response.TYPE_TEST_RESULT) updatedSerial.TYPE_TEST_RESULT = response.TYPE_TEST_RESULT;
          if (response.REJECT) updatedSerial.REJECT = response.REJECT;
          if (response.TOUCH_UP) updatedSerial.TOUCH_UP = response.TOUCH_UP;
          if (response.REJECT2) updatedSerial.REJECT2 = response.REJECT2;
          if (response.REJECT_CODE) updatedSerial.REJECT_CODE = response.REJECT_CODE;
          if (response.REMARK) updatedSerial.REMARK = response.REMARK;
          if (response.UPDATE_FLG) updatedSerial.UPDATE_FLG = response.UPDATE_FLG;
          if (response.FRONT_SHEET_NO) updatedSerial.FRONT_SHEET_NO = response.FRONT_SHEET_NO;
          if (response.BACK_SHEET_NO) updatedSerial.BACK_SHEET_NO = response.BACK_SHEET_NO;
          if (response.SHEET_PCS_NO) updatedSerial.SHEET_PCS_NO = response.SHEET_PCS_NO;
          if (response.ROLL_LEAF_NO) updatedSerial.ROLL_LEAF_NO = response.ROLL_LEAF_NO;
        }
      });

      res.status(200).json(dtSerial);
    } catch (err) {
      writeLogError(err.message, query);

      res.status(500).json({ message: err.message });
    }
  };
  
  module.exports.GetSerialTestResultManyTableConfirm2 = async function (req, res) {
    var query = "";
    try {
      const client = await ConnectPG_DB();
      const { dataList,dtSerial } = req.body;
      const json_convertdata = JSON.stringify(dataList);
      // '[{"strPlantCode": "5", "strPrdName": "EN PRELIATOR", "strSerial": "","CHECK_FLG":"0"}]'

      query = `CALL "Traceability".trc_020_finalgate_getserialtestresultmanytableconfirm('[${json_convertdata}]','','{}')`;
      const result = await client.query(query);

      let response=result.rows[0].response
      let p_error=result.rows[0].p_error

      // if(p_error==''){
        if(response.REJECT!="" && response.REJECT!=null){

          dtSerial.REJECT=response.REJECT
        }
  
        if(response.REMARK!="" &&response.REMARK!=null){
 
          dtSerial.REMARK=response.REMARK
        }
  
        if(response.REJECT2!="" &&response.REJECT2!=null){

          dtSerial.REJECT2=response.REJECT2
        }
  
        if(response.TOUCH_UP!="" &&response.TOUCH_UP!=null){

          dtSerial.TOUCH_UP=response.TOUCH_UP
        }
  
        if(response.ROW_COUNT!="" &&response.ROW_COUNT!=null){

          dtSerial.ROW_COUNT=response.ROW_COUNT
        }
  
        if(response.UPDATE_FLG!="" &&response.UPDATE_FLG!=null){

          dtSerial.UPDATE_FLG=response.UPDATE_FLG
        }
  
        if(response.REJECT_CODE!="" &&response.REJECT_CODE!=null){

          dtSerial.REJECT_CODE=response.REJECT_CODE
        }
  
        if(response.TEST_RESULT!="" &&response.TEST_RESULT!=null){
  
          dtSerial.TEST_RESULT=response.TEST_RESULT
        }
  
        if(response.ROLL_LEAF_NO!="" &&response.ROLL_LEAF_NO!=null){

          dtSerial.ROLL_LEAF_NO=response.ROLL_LEAF_NO
        }
  
        if(response.SHEET_PCS_NO!="" &&response.SHEET_PCS_NO!=null){

          dtSerial.SHEET_PCS_NO=response.SHEET_PCS_NO
        }
  
        if(response.BACK_SHEET_NO!="" &&response.BACK_SHEET_NO!=null){

          dtSerial.BACK_SHEET_NO=response.BACK_SHEET_NO
        }
  
        if(response.FRONT_SHEET_NO!="" &&response.FRONT_SHEET_NO!=null){

          dtSerial.FRONT_SHEET_NO=response.FRONT_SHEET_NO
        }
  
        if(response.TYPE_TEST_RESULT!="" &&response.TYPE_TEST_RESULT!=null){

          dtSerial.TYPE_TEST_RESULT=response.TYPE_TEST_RESULT
        }
      
      


      res.status(200).json(dtSerial)

      DisconnectPG_DB(client);
    } catch (error) {
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  };

