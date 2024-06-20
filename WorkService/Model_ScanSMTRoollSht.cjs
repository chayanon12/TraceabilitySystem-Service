const {
    ConnectPG_DB,
    DisconnectPG_DB,
    ConnectOracleDB,
    DisconnectOracleDB,
  } = require("../Conncetion/DBConn.cjs");

  module.exports.getLot = async function (req, res) {
    try {
      const { txt_lotno } = req.body;
      console.log('txt_lotno:', txt_lotno);
  
      const connect = await ConnectOracleDB("FPC");
      let query = "";
      query += `SELECT NVL(L.LOT_PRD_NAME, ' ') AS PRD_NAME, `;
      query += `NVL(L.LOT_ROLL_NO, ' ') AS ROLL_NO, `;
      query += `TO_CHAR(LISTAGG(L.LOT || `;
      query += `DECODE(T1.LTR_FROM_LOT, NULL, '', ',' || T1.LTR_FROM_LOT) || `;
      query += `DECODE(T2.LTR_FROM_LOT, NULL, '', ',' || T2.LTR_FROM_LOT) || `;
      query += `DECODE(T3.LTR_FROM_LOT, NULL, '', ',' || T3.LTR_FROM_LOT) || `;
      query += `DECODE(T4.LTR_FROM_LOT, NULL, '', ',' || T4.LTR_FROM_LOT) || `;
      query += `DECODE(T5.LTR_FROM_LOT, NULL, '', ',' || T5.LTR_FROM_LOT), ',') `;
      query += `WITHIN GROUP (ORDER BY L.LOT ASC)) AS LOT_ALL `;
      query += `FROM FPC.FPC_LOT L `;
      query += `LEFT JOIN FPC_LOT_TRANSFER T1 ON L.LOT = T1.LTR_LOT `;
      query += `LEFT JOIN FPC_LOT_TRANSFER T2 ON T1.LTR_FROM_LOT = T2.LTR_LOT `;
      query += `LEFT JOIN FPC_LOT_TRANSFER T3 ON T2.LTR_FROM_LOT = T3.LTR_LOT `;
      query += `LEFT JOIN FPC_LOT_TRANSFER T4 ON T3.LTR_FROM_LOT = T4.LTR_LOT `;
      query += `LEFT JOIN FPC_LOT_TRANSFER T5 ON T4.LTR_FROM_LOT = T5.LTR_LOT `;
      query += `WHERE L.LOT = '${txt_lotno}' `;
      query += `GROUP BY NVL(L.LOT_PRD_NAME, ' '), `;
      query += `NVL(L.LOT_ROLL_NO, ' '), `;
      query += `DECODE(L.LOT_PRIORITY, 'FINAL_GATE_LOT_PRIORITY_SKIP', 'Y', 'N') `;
  
      console.log('query1:', query);
  
      const result = await connect.execute(query);
      DisconnectOracleDB(connect);
      res.json(result.rows);
    } catch (error) {
      console.error("ข้อผิดพลาดในการค้นหาข้อมูล:", error.message);
      res.status(500).send("ข้อผิดพลาดในการค้นหาข้อมูล");
    }
  };
  

  module.exports.getProduct = async function (req, res) {
    try {
      const client = await ConnectPG_DB();
      let query = "";
      query += `SELECT "Traceability".trc_001_getproductrollleafdata()`;
      const result = await client.query(query);
      console.log(result)
      await DisconnectPG_DB(client);
      res.json(result.rows);
    } catch (error) {
      console.error("ข้อผิดพลาดในการค้นหาข้อมูล:", error.message);
      res.status(500).send("ข้อผิดพลาดในการค้นหาข้อมูล");
    }
  };



  module.exports.GetSerialProductByProduct = async function (req, res) {
    try {
      console.log('เข้า2')
      const { strPrdName } = req.body;
      const connect = await ConnectOracleDB("SMT"); //sn_length serial  //shm_end_code trc_cheet_eng_mst
      let query = `   
      SELECT PRD.PRM_PRODUCT_NAME  AS SLM_PRD_NAME 
      ,'' AS SLM_CUST_PART_NAME 
      ,NVL(PRD.PRM_SERIAL_LENGTH ,0) AS SLM_SERIAL_LENGTH 
      ,'Y' AS SLM_FIX_FLAG 
      ,NVL(PRD.PRM_ENG_CODE ||PRM_REV,' ') AS SLM_FIX_DIGIT  
      ,NVL(PRD.PRM_START_DIGIT ,0) AS SLM_FIX_START_DIGIT  
      ,NVL(PRD.PRM_END_DIGIT  ,0) AS SLM_FIX_END_DIGIT 
      ,'N' AS SLM_TRAY_FLAG 
      ,0 AS SLM_TRAY_LENGTH 
      ,'Y' AS SLM_TEST_RESULT_FLAG 
      ,NVL(PRD.PRM_PCS_SCAN ,0) AS SLM_SERIAL_COUNT 
      ,'Y' AS SLM_AUTO_SCAN 
      ,PRD.PRM_LAMINATION_SIDE  AS SLM_BARCODE_SIDE 
      ,NVL(PRD.PRM_PCS_SHT ,0) AS SLM_SERIAL_SHT 
      ,NVL(PRD.PRM_SHEET_SCAN ,1) AS SLM_SHT_SCAN 
      ,NVL(PRD.PRM_BARCODE_REQ_CONFIG ,'N') AS PRM_BARCODE_REQ_CONFIG 
      ,NVL(PRD.PRM_CONFIG_CODE ,' ') AS PRM_CONFIG_CODE 
      ,NVL(PRD.PRM_START_CONFIG ,0) AS PRM_START_CONFIG 
      ,NVL(PRD.PRM_END_CONFIG ,0) AS PRM_END_CONFIG 
      ,NVL(PRD.PRM_RUNNING_REQ_CONFIG ,'N') AS PRM_RUNNING_REQ_CONFIG 
      ,NVL(PRD.PRM_DUPLICATE_START ,0) AS PRM_DUPLICATE_START 
      ,NVL(PRD.PRM_DUPLICATE_END ,0) AS PRM_DUPLICATE_END 
      ,NVL(PRD.PRM_REQ_CHECK_PRD_SHT ,'N') AS PRM_REQ_CHECK_PRD_SHT 
      ,NVL(PRD.PRM_CHECK_PRD_SHT_START ,0) AS PRM_CHECK_PRD_SHT_START 
      ,NVL(PRD.PRM_CHECK_PRD_SHT_END ,0) AS PRM_CHECK_PRD_SHT_END
      ,NVL(PRD.PRM_ABBR ,' ') AS PRM_ABBR 
      ,NVL(PRD.PRM_REQ_CHECK_LOT_SHT ,'N') AS PRM_REQ_CHECK_LOT_SHT 
      ,NVL(PRD.PRM_CHECK_LOT_SHT_START ,0) AS PRM_CHECK_LOT_SHT_START 
      ,NVL(PRD.PRM_CHECK_LOT_SHT_END ,0) AS PRM_CHECK_LOT_SHT_END
      ,NVL(PRD.PRM_CHECK_CHIP_ID_FLG ,'N') AS PRM_CHECK_CHIP_ID_FLG
      ,NVL(PRD.PRM_PLASMA_TIME_FLG,'N') AS PRM_PLASMA_TIME_FLG
      ,NVL(PRD.PRM_PLASMA_TIME,0) AS PRM_PLASMA_TIME 
      ,NVL(PRM_REQ_START_SEQ_FLG ,'N') AS PRM_REQ_START_SEQ_FLG 
      ,NVL(PRM_START_SEQ_CODE ,' ') AS PRM_START_SEQ_CODE 
      ,NVL(PRM_START_SEQ_START ,0) AS PRM_START_SEQ_START 
      ,NVL(PRM_START_SEQ_END ,0) AS PRM_START_SEQ_END 
      ,NVL(PRM_SHEET_ELT_FLG ,'N') AS PRM_SHEET_ELT_FLG 
      ,NVL(PRM_FINAL_AOI_SPI_FLG ,'N') AS PRM_FINAL_AOI_SPI_FLG 
      ,NVL(PRM_CONN_ROLL_SHT_FLG ,'N') AS PRM_CONN_ROLL_SHT_FLG 
      ,NVL(PRM_CONN_ROLL_SHT_LENGTH ,0) AS PRM_CONN_ROLL_SHT_LENGTH 
      ,NVL(PRM_CONN_ROLL_LEAF_FLG ,'N') AS PRM_CONN_ROLL_LEAF_FLG 
      ,NVL(PRM_CONN_ROLL_LENGTH,0) AS PRM_CONN_ROLL_LENGTH 
      ,NVL(PRM_CONN_LEAF_LENGTH ,0) AS PRM_CONN_LEAF_LENGTH 
      ,NVL(PRM_DATE_INPROC_FLG,'N') AS PRM_DATE_INPROC_FLG 
      ,NVL(PRM_DATE_INPROC,' ') AS PRM_DATE_INPROC 
      ,NVL(PRM_DATE_TYPE ,' ') AS PRM_DATE_TYPE 
      ,NVL(PRM_CHECK_WEEKCODE_FLG ,'N') AS PRM_CHECK_WEEKCODE_FLG  
      ,NVL(PRM_CHECK_WEEKCODE_START ,0) AS PRM_CHECK_WEEKCODE_START  
      ,NVL(PRM_CHECK_WEEKCODE_END ,0) AS PRM_CHECK_WEEKCODE_END 
      ,NVL(PRM_SHT_PRE_AOI_F ,'N') AS PRM_SHT_PRE_AOI_F 
      ,NVL(PRM_SHT_PRE_AOI_B ,'N') AS PRM_SHT_PRE_AOI_B 
      ,NVL(PRM_SHT_AOI_F,'N') AS PRM_SHT_AOI_F 
      ,NVL(PRM_SHT_AOI_B,'N') AS PRM_SHT_AOI_B 
      ,NVL(PRM_SHT_AOI_COAT_F ,'N') AS PRM_SHT_AOI_COAT_F 
      ,NVL(PRM_SHT_AOI_COAT_B ,'N') AS PRM_SHT_AOI_COAT_B 
      ,NVL(PRM_SHT_SPI_F ,'N') AS PRM_SHT_SPI_F 
      ,NVL(PRM_SHT_SPI_B ,'N') AS PRM_SHT_SPI_B
      ,NVL(PRM_CONN_ROLL_LEAF_SCAN ,0) AS PRM_CONN_ROLL_LEAF_SCAN 
      ,NVL(PRM_CONN_ROLL_SERIAL_FLG ,'N') AS PRM_CONN_ROLL_SERIAL_FLG  
      ,NVL(PRM_CONN_ROLL_PRD_FLG ,'N') AS PRM_CONN_ROLL_PRD_FLG 
      ,NVL(PRM_CONN_ROLL_PRD_START,0) AS PRM_CONN_ROLL_PRD_START 
      ,NVL(PRM_CONN_ROLL_PRD_END,0) AS PRM_CONN_ROLL_PRD_END 
      ,NVL(PRM_CONN_ROLL_REQ_PRD_SHT ,'N') AS PRM_CONN_ROLL_REQ_PRD_SHT 
      ,NVL(PRM_CONN_ROLL_PRD_SHT_START ,0) AS PRM_CONN_ROLL_PRD_SHT_START 
      ,NVL(PRM_CONN_ROLL_PRD_SHT_END ,0) AS PRM_CONN_ROLL_PRD_SHT_END 
      ,NVL(PRM_CONN_ROLL_REQ_LOT_SHT ,'N') AS PRM_CONN_ROLL_REQ_LOT_SHT 
      ,NVL(PRM_CONN_ROLL_LOT_SHT_START ,0) AS PRM_CONN_ROLL_LOT_SHT_START   
      ,NVL(PRM_CONN_ROLL_LOT_SHT_END ,0) AS PRM_CONN_ROLL_LOT_SHT_END 
      ,NVL(PRM_CONN_ROLL_PRD_FIX ,' ') AS PRM_CONN_ROLL_PRD_FIX 
      ,NVL(PRM_SHT_MACHINE_FLG ,'N') AS PRM_SHT_MACHINE_FLG 
      ,NVL(PRM_PROC_CONTROL_TIME_FLG  ,'N') AS PRM_PROC_CONTROL_TIME_FLG 
      ,NVL(PRM_PROC_CONTROL_TIME,0) AS PRM_PROC_CONTROL_TIME 
      ,NVL(PRM_CONN_SHT_CONTROL_TIME_FLG ,'N') AS PRM_CONN_SHT_CONTROL_TIME_FLG 
      ,NVL(PRM_FINAL_PACKING_GROUP_FLG ,'N') AS PRM_FINAL_PACKING_GROUP_FLG 
      ,NVL(PRM_BARCODE_GRADE ,' ') AS PRM_BARCODE_GRADE 
      ,NVL(PRM_SERIAL_START_CODE ,' ') AS PRM_SERIAL_START_CODE 
      ,NVL(PRM_SHT_PLASMA_TIME_FLG ,'N') AS PRM_SHT_PLASMA_TIME_FLG 
      ,NVL(PRM_SHT_PLASMA_TIME ,0) AS PRM_SHT_PLASMA_TIME 
      ,NVL(PRM_SHEET_TYPE  ,'D') AS PRM_SHEET_TYPE
      ,NVL(PRM_PLASMA_TIME_SKIP_ELT  ,'N') AS PRM_PLASMA_TIME_SKIP_ELT 
      ,NVL(PRM_PLASMA_TIME_HIDE_TIME ,'N') AS PRM_PLASMA_TIME_HIDE_TIME 
      ,NVL(PRM_PCS_TRAY ,0) AS PRM_PCS_TRAY 
      ,NVL(PRM_CHECK_EFPC_AOM_FLG ,'N') AS PRM_CHECK_EFPC_AOM_FLG 
      ,NVL(PRM_CHECK_EFPC_AOI_FLG ,'N') AS PRM_CHECK_EFPC_AOI_FLG 
      ,NVL(PRM_CHECK_EFPC_OST_FLG ,'N') AS PRM_CHECK_EFPC_OST_FLG 
      ,NVL(PRM_CHECK_EFPC_AVI_FLG ,'N') AS PRM_CHECK_EFPC_AVI_FLG 
      ,NVL(PRM_CHECK_EFPC_AVI_FLG ,'N') AS PRM_CHECK_EFPC_AVI_FLG 
      ,NVL(PRM_ADDITIONAL_INFO ,' ') AS PRM_ADDITIONAL_INFO 
      ,NVL(PRM_SHT_XRAY_F ,'N') AS PRM_SHT_XRAY_F 
      ,NVL(PRM_SHT_XRAY_B ,'N') AS PRM_SHT_XRAY_B 
      ,NVL(PRM_SHT_XRAY_1_TIME_FLG ,'N') AS PRM_SHT_XRAY_1_TIME_FLG 
      ,NVL(PRM_FIN_GATE_INSPECT_FLG ,'N') AS PRM_FIN_GATE_INSPECT_FLG 
      ,NVL(PRM_FIN_GATE_INSPECT_PROC ,' ') AS PRM_FIN_GATE_INSPECT_PROC 
      FROM SMT_PRODUCT_MST PRD 
      WHERE PRD.PRM_PRODUCT_NAME = '${strPrdName}'
          AND PRD.PRM_PLANT_CODE = 'THA'`;
      console.log('query3:', query);
  
      const result = await connect.execute(query);
      DisconnectOracleDB(connect);

      // เพิ่มชื่อคอลัมน์ลงใน JSON ที่ส่งกลับ
      const columnNames = result.metaData.map(column => column.name);
      const rows = result.rows.map(row => {
          let rowData = {};
          columnNames.forEach((columnName, index) => {
              rowData[columnName] = row[index];
          });
          return rowData;
      });
      
      res.json(rows);
    } catch (error) {
      console.error("ข้อผิดพลาดในการค้นหาข้อมูล:", error.message);
      res.status(500).send("ข้อผิดพลาดในการค้นหาข้อมูล");
    }
};

module.exports.GetRollLeafTotalByLot = async function (req, res) {
  try {
    console.log('เข้า2')
    const { LotNo } = req.body;
    const client = await ConnectPG_DB();
    let query = `   
    SELECT COUNT(L.SHR_ROLL_LEAF ) AS ROLL_LEAF
    FROM "Traceability".trc_SHEET_ROLL_NO L  
         WHERE L.SHR_PLANT_CODE = 'THA' 
         AND L.SHR_LOT_NO = '${LotNo}'`;
    console.log('query4:', query);

    const result = await client.query(query);
      console.log(result)
      await DisconnectPG_DB(client);
      res.json(result.rows);

    // const columnNames = result.metaData.map(column => column.name);
    // const rows = result.rows.map(row => {
    //     let rowData = {};
    //     columnNames.forEach((columnName, index) => {
    //         rowData[columnName] = row[index];
    //     });
    //     return rowData;
    // });
    // res.json(rows);
  } catch (error) {
    console.error("ข้อผิดพลาดในการค้นหาข้อมูล:", error.message);
    res.status(500).send("ข้อผิดพลาดในการค้นหาข้อมูล");
  }
};


module.exports.GetRollLeafDuplicate = async function (req, res) {
  console.log("เข้า");
  var query = "";
  try {
    const connect = await ConnectOracleDB("FPC");
    const { ROLL_LEAF, PLANT_CODE } = req.body;
    query += `         SELECT L.SHR_LOT_NO AS LOT_NO 
                            , L.SHR_ROLL_NO AS ROLL_NO 
                            , L.SHR_ROLL_LEAF AS ROLL_LEAF 
                            , L.SHR_SHEET_SEQ AS SHEET_SEQ 
                            , L.SHR_SHEET_NO AS SHEET_NO  
                            ,SHR_PLANT_CODE as Plant
                      FROM "Traceability".trc_SHEET_ROLL_NO L   
                      WHERE L.SHR_PLANT_CODE = '${PLANT_CODE}'
                           AND L.SHR_ROLL_LEAF = '${ROLL_LEAF}'
                      ORDER BY L.SHR_SHEET_SEQ `;
    const result = await connect.execute(query);
    await DisconnectOracleDB(connect);
    res.status(200).json(result.rows);
  } catch (error) {
    writeLogError(error.message, query);
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};


// GetWeekCodebyLot
