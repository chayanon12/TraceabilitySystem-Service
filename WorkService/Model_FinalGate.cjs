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
        console.log('queryyyyy',queries)
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
      console.log(dtSerial,'maja2')
      res.status(200).json(dtSerial);
    } catch (err) {
      writeLogError(err.message, query);
      console.error(err.message);
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
      console.log('GetSerialTestResultManyTableConfirm00',json_convertdata)
      query = `CALL "Traceability".trc_020_finalgate_getserialtestresultmanytableconfirm('[${json_convertdata}]','','{}')`;
      const result = await client.query(query);
      console.log('GetSerialTestResultManyTableConfirm01',query)
      let response=result.rows[0].response
      let p_error=result.rows[0].p_error
      console.log('GetSerialTestResultManyTableConfirm02',result.rows)
      // if(p_error==''){
        if(response.REJECT!="" && response.REJECT!=null){
          console.log('เข้าReject')
          dtSerial.REJECT=response.REJECT
        }
  
        if(response.REMARK!="" &&response.REMARK!=null){
          console.log('เข้า REMARK')
          dtSerial.REMARK=response.REMARK
        }
  
        if(response.REJECT2!="" &&response.REJECT2!=null){
          console.log('เข้า REJECT2')
          dtSerial.REJECT2=response.REJECT2
        }
  
        if(response.TOUCH_UP!="" &&response.TOUCH_UP!=null){
          console.log('เข้า TOUCH_UP')
          dtSerial.TOUCH_UP=response.TOUCH_UP
        }
  
        if(response.ROW_COUNT!="" &&response.ROW_COUNT!=null){
          console.log('เข้า ROW_COUNT')
          dtSerial.ROW_COUNT=response.ROW_COUNT
        }
  
        if(response.UPDATE_FLG!="" &&response.UPDATE_FLG!=null){
          console.log('เข้า UPDATE_FLG')
          dtSerial.UPDATE_FLG=response.UPDATE_FLG
        }
  
        if(response.REJECT_CODE!="" &&response.REJECT_CODE!=null){
          console.log('เข้าREJECT_CODE')
          dtSerial.REJECT_CODE=response.REJECT_CODE
        }
  
        if(response.TEST_RESULT!="" &&response.TEST_RESULT!=null){
          console.log('เข้า TEST_RESULT')
          dtSerial.TEST_RESULT=response.TEST_RESULT
        }
  
        if(response.ROLL_LEAF_NO!="" &&response.ROLL_LEAF_NO!=null){
          console.log('เข้า ROLL_LEAF_NO')
          dtSerial.ROLL_LEAF_NO=response.ROLL_LEAF_NO
        }
  
        if(response.SHEET_PCS_NO!="" &&response.SHEET_PCS_NO!=null){
          console.log('เข้า SHEET_PCS_NO')
          dtSerial.SHEET_PCS_NO=response.SHEET_PCS_NO
        }
  
        if(response.BACK_SHEET_NO!="" &&response.BACK_SHEET_NO!=null){
          console.log('เข้า BACK_SHEET_NO')
          dtSerial.BACK_SHEET_NO=response.BACK_SHEET_NO
        }
  
        if(response.FRONT_SHEET_NO!="" &&response.FRONT_SHEET_NO!=null){
          console.log('เข้า FRONT_SHEET_NO')
          dtSerial.FRONT_SHEET_NO=response.FRONT_SHEET_NO
        }
  
        if(response.TYPE_TEST_RESULT!="" &&response.TYPE_TEST_RESULT!=null){
          console.log('เข้า TYPE_TEST_RESULT')
          dtSerial.TYPE_TEST_RESULT=response.TYPE_TEST_RESULT
        }
      
      

     console.log('response',response)
      res.status(200).json(dtSerial)

      DisconnectPG_DB(client);
    } catch (error) {
      writeLogError(error.message, query);
      res.status(500).json({ message: error.message });
    }
  };

