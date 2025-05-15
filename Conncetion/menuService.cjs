const { writeLogError } = require("../Common/LogFuction.cjs");
const {
  ConnectPG_DB,
  DisconnectPG_DB,
  ConnectOracleDB,
  DisconnectOracleDB,
} = require("./DBConn.cjs");
module.exports.getCurrentDate = async function (req, res) {
  try {
    const connection = await ConnectOracleDB("FPC");
    const result = await connection.execute("SELECT SYSDATE FROM DUAL");
    const currentDate = result.rows[0][0];
    DisconnectPG_DB(connection);
    res.status(200).json({ date: currentDate });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

//Selct Menu Data/////////////////////////////////////////////////////////

module.exports.getFetch_menudata = async function (req, res) {
  try {
    const query = `select  tm.id as id
                    ,tmp.menu_name as parent_id
                  ,tm.menu_name as menu_name
                  ,tm.app_id as app_id
                  ,tm.url as url
                  ,tm.active_flag as active_flag
                  ,tm.visible_flag as visible_flag
                  ,tmp.seq , tm.seq
                  from traceability.trace_menu tm inner join traceability.trace_menu tmp on tmp.id =tm.parent_id  
                  where tm.parent_id is not null
                  order by tmp.seq , tm.seq`;
    const client = await ConnectPG_DB();
    const { rows } = await client.query(query);
    res.json(rows);
    await DisconnectPG_DB(client);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while querying the database." });
  }
};

////Search MenuName only////////////////////////

module.exports.postMenuname = async function (req, res) {
  const { System, ParentMenuName, MenuName } = req.body;
  const client = await ConnectPG_DB();
  if (MenuName != undefined) {
    const searchQuery = `
      SELECT *
      FROM traceability.trace_menu
      WHERE menu_name = $1
    `;

    try {
      const result = await client.query(searchQuery, [MenuName]);
      const foundDataArray = result.rows;
      res.json(foundDataArray);
      await DisconnectPG_DB(client);
    } catch (error) {
      res.status(500).json({ message: "An error occurred while searching data" });
    }
  }
};

module.exports.Menuname = async function (req, res) {
  try {
    const { login_id } = req.body;
    const connect = await ConnectOracleDB("FPC");
    const query = `
     SELECT A.*
    	,COUNT(DECODE(A.PARENT_ID, '0928', 1, NULL)) OVER () AS count_work
  		,COUNT(DECODE(A.PARENT_ID, '0929', 1, NULL)) OVER () AS count_maintain
  		,COUNT(DECODE(A.PARENT_ID, '0930', 1, NULL)) OVER () AS count_viewdata
  FROM
  (
	  SELECT
	     	NM.MENU_ID,
	     	NM.MENU_NAME ,
	     	NM.URL ,
	     	NM.SEQ ,
	     	NM.ACTIVE_FLAG ,
	     	NM.VISIBLE_FLAG ,
	     	NM.PARENT_ID,
	    	NM.PAGE_TITLE
	  FROM NAP_MAP_ROLE_USER NMRU 	INNER JOIN NAP_MAP_ROLE_MENU NMRM ON NMRM.ROLE_ID = NMRU.ROLE_ID
	  								INNER JOIN NAP_MENU NM ON NM.MENU_ID = NMRM.MENU_ID
	  WHERE NMRU.LOGIN_ID = '${login_id}'
	    	AND NM.APP_ID = '16'
			AND NM.PARENT_ID IS NOT NULL
			AND NM.ACTIVE_FLAG <> 'N'
	  UNION
	  SELECT
	     	NM.MENU_ID,
	     	NM.MENU_NAME ,
	     	NM.URL ,
	     	NM.SEQ ,
	     	NM.ACTIVE_FLAG ,
	     	NM.VISIBLE_FLAG ,
	     	NM.PARENT_ID,
	    	NM.PAGE_TITLE
	  FROM NAP_MAP_ROLE_MENU NMRM INNER JOIN NAP_MENU NM ON NM.MENU_ID = NMRM.MENU_ID
	  WHERE NM.APP_ID = '16'
			AND NM.ACTIVE_FLAG <> 'N'  
			AND NMRM.ROLE_ID = '0347'
  ) A
  ORDER BY A.SEQ`;
    const result = await connect.execute(query);
    DisconnectOracleDB(connect);
    //  res.json(result);
    const jsonResult = result.rows.map((row) => ({
      menu_id: row[0],
      menu_name: row[1],
      url: row[2],
      seq: row[3],
      active_flag: row[4],
      visible_flag: row[5],
      parent_id: row[6],
      count_work: row[8],
      count_maintain: row[9],
      count_viewdata: row[10],
      page_title: row[7],
    }));
    res.json(jsonResult);
  } catch (error) {
    writeLogError(error.message);
  }
};
module.exports.MenuTitle = async function (req, res) {
  try {
    const { login_id } = req.body;
    const connect = await ConnectOracleDB("FPC");
    const query = `
      SELECT
         NM.URL ,  
        NM.PAGE_TITLE
      FROM
         NAP_MAP_ROLE_USER NMRU
      INNER JOIN NAP_MAP_ROLE_MENU NMRM ON
         NMRM.ROLE_ID = NMRU.ROLE_ID
      INNER JOIN NAP_MENU NM ON
         NM.MENU_ID = NMRM.MENU_ID
      WHERE
         NMRU.LOGIN_ID = '${login_id}'
        AND NM.APP_ID = '16'
        AND NM.PARENT_ID IS NOT NULL
      ORDER BY NM.SEQ `;
    const result = await connect.execute(query);
    DisconnectOracleDB(connect);
    //  res.json(result);
    const jsonResult = result.rows.map((row) => ({
      url: row[0],
      page_title: row[1],
    }));
    res.json(jsonResult);
  } catch (error) {
    writeLogError(error.message);
  }
};

module.exports.MenuHome = async function (req, res) {
  try {
    const connect = await ConnectOracleDB("FPC");
    const query = `
  SELECT
	NM.PARENT_ID ,
	NM.MENU_NAME ,
	NM.URL,
	COUNT(DECODE(NM.PARENT_ID, '0928', 1, NULL)) OVER () AS count_work,
	COUNT(DECODE(NM.PARENT_ID, '0929', 1, NULL)) OVER () AS count_maintain,
	COUNT(DECODE(NM.PARENT_ID, '0930', 1, NULL)) OVER () AS count_viewdata,
  NM.PAGE_TITLE
  FROM
    NAP_MENU NM
  WHERE
    APP_ID = '16'
    AND VISIBLE_FLAG = 'N'
    AND ACTIVE_FLAG <> 'N'
    AND PARENT_ID IS NOT NULL
     ORDER BY NM.SEQ`;
    const result = await connect.execute(query);
    DisconnectOracleDB(connect);
    // res.json(result.rows);
    const jsonResult = result.rows.map((row) => ({
      parent_id: row[0],
      menu_name: row[1],
      url: row[2],
      count_work: row[3],
      count_maintain: row[4],
      count_viewdata: row[5],
      page_title: row[6],
    }));
    res.json(jsonResult);
  } catch (error) {
    writeLogError(error.message);
  }
};
