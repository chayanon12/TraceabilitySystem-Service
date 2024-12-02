const {
    ConnectPG_DB,
    DisconnectPG_DB,
    ConnectOracleDB,
    DisconnectOracleDB,
} = require("../Conncetion/DBConn.cjs");
const { writeLogError } = require("../Common/LogFuction.cjs");
const { el } = require("date-fns/locale");

module.exports.GetSerialNo = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_035_traceviewpiece_getserialno('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getdataproduct = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_035_traceviewpiece_getdataproduct('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getproductname = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_035_traceviewpiece_getproductname('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getproductmst = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_035_traceviewpiece_getproductmst('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getlotsheetserial = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_035_traceviewpiece_getlotsheetserial('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getspifront = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_035_traceviewpiece_getspifront('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getspiresult = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_035_traceviewpiece_getspiresult('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getresult = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_035_traceviewpiece_getresult('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getspiback = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_035_traceviewpiece_getspiback('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getspi = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_035_traceviewpiece_getspiresult2('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getpreaoifront = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_035_traceviewpiece_getpreaoifront('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getpreaoifrontelse = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_035_traceviewpiece_getpreaoifrontelse('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getaoi = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_035_traceviewpiece_getaoi('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getaoi2 = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_035_traceviewpiece_getaoi2('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getaoi3 = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_035_traceviewpiece_getaoi3('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getaoicoating = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_035_traceviewpiece_getaoicoating('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getaoicoating2 = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_035_traceviewpiece_getaoicoating2('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getaoicoating3 = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_035_traceviewpiece_getaoicoating3('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getinspectionresult = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_035_traceviewpiece_getinspectionresult('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getreject = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_035_traceviewpiece_getreject('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.gettouchup = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_035_traceviewpiece_gettouchup('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getfinalinspection = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_035_traceviewpiece_getfinalinspection('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getbending = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_035_traceviewpiece_getbending('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getelt = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_035_traceviewpiece_getelt('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getkeytype = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_035_traceviewpiece_getkeytype('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getxrayresult = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_035_traceviewpiece_getxrayresult('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getbarcodegrade = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_035_traceviewpiece_getbarcodegrade('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.GetPlasmaDataResultBySerial = async function (req, res) {
    var query1 = "";
    var query2 = "";
    var _strResult = "";
    var _strReturn = "";
    try {
        const p_data = JSON.stringify(req.body);
        query1 = `SELECT * FROM "Traceability".trc_035_traceviewpiece_getsmtplasmadata('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result1 = await client.query(query1);

        if (result1.rows.length > 0) {
            const {
                strSerial,
                strLot,
            } = req.body;
            const Conn = await ConnectOracleDB("PCTTTEST");
            query2 = `SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_GetPlasmaBySerial('${strSerial}', '${strLot}') AS  FROM DUAL`;

            const result2 = await Conn.execute(query2);
            if (result2.rows.length > 0) {
                let data = [];

                for (let i = 0; i < result2.rows[0][0].length; i++) {
                    data.push({
                        PACK_DATE: result2.rows[0][0][i][0],
                        MC_NO: result2.rows[0][0][i][1],
                        PACK_FLG: result2.rows[0][0][i][2],
                        PACK_CONFIRM: result2.rows[0][0][i][3],
                        PLASMA_FLG: result2.rows[0][0][i][4],
                    });
                }

                if (result1.rows[0].plasma_flg === "N") {
                    if (data[0].PACK_FLG === "Y") {
                        _strResult = "OK";

                        if (data[0].MC_NO !== "") {
                            _strReturn = _strReturn + ";M/C NO.: " + data[0].MC_NO;
                        }
                    }
                } else {
                    if (data[0].PLASMA_FLG === "Y") {
                        if (result1.rows[0]?.plasma_date !== null && result1.rows[0]?.plasma_date !== undefined) {
                            let datePack = data[0].PACK_DATE;
                            let datePlasma = result1.rows[0].plasma_date;
                            const diffMinutes = (datePack - datePlasma) / (1000 * 60);
                            const dblPlasma = Math.round((diffMinutes / 60) * 100) / 100;

                            if (dblPlasma >= 0 && result1.rows[0].plasma_time >= dblPlasma) {

                                if (data[0].PACK_CONFIRM === "Y") {
                                    _strResult = "OK";
                                    _strReturn = datePack && ";Keep plasma time";
                                } else {
                                    _strResult = "";
                                    _strReturn = ";Keep plasma time";
                                }

                                if (data[0].MC_NO !== "") {
                                    _strReturn = _strReturn + " M/C NO.: " + data[0].MC_NO;
                                }
                            } else {
                                if (data[0].PACK_CONFIRM === "Y") {
                                    _strResult = "NG"
                                    _strReturn = datePack && ";Over plasma time";
                                } else {
                                    _strResult = "";
                                    _strReturn = ";Over plasma time";
                                }
                            }
                        } else {
                            if (result1.rows[0].plasma_count === 0) {
                                _strResult = "";
                                _strReturn = ";Not record plasma time";
                            } else {
                                _strResult = "";
                                _strReturn = ";Skip plasma";
                            }
                        }
                    }
                }
            }

            await DisconnectOracleDB(Conn);
        }

        res.status(200).json(_strReturn);
        await DisconnectPG_DB(client);
    } catch (err) {
        writeLogError(err.message, query1);
        writeLogError(err.message, query2);
        if (!res.headersSent) {
            res.status(500).json({ message: err.message });
        }
    }
};

module.exports.GetSerialAOMEFPCResult = async function (req, res) {
    {
        let query = "";
        try {
            const {
                _strPlantCode,
                _strSheetNo,
                _intPcsNo,
                _strPrdName,
                _strSMPJCavityFlg,
            } = req.body;
           
            let roll_leaf = await GetRollLeafBySheetNo(
                _strPlantCode,
                _strSheetNo
            );
            const Conn = await ConnectOracleDB("PCTTTEST");
            query = `SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_GetSerialAOMEFPCRST('${_strPlantCode}', '${_strSheetNo}', ${_intPcsNo},'${_strPrdName}','${_strSMPJCavityFlg}','${roll_leaf}') AS  FROM DUAL`;
            const result = await Conn.execute(query);

            if (result.rows.length > 0) {
                let data = [];

                for (let i = 0; i < result.rows[0][0].length; i++) {
                    data.push({
                        ROLL_LEAF: result.rows[0][0][i][0],
                        LEAF_NO: result.rows[0][0][i][1],
                        PCS_NO: result.rows[0][0][i][2],
                        AOM_RESULT: result.rows[0][0][i][3],
                        AOM_DATE: result.rows[0][0][i][4],
                        AOM_MACHINE: result.rows[0][0][i][5],
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

module.exports.GetSerialAVIResult = async function (req, res) {
    {
        let query = "";
        try {
            const {
                strSheetNo,
                intPCSNo,
                strSMPJCavityFlg,
            } = req.body;
            const Conn = await ConnectOracleDB("PCTTTEST");

            query = `SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_GetSerialAVIResult('${strSheetNo}', ${intPCSNo}, '${strSMPJCavityFlg}') AS DATA1 FROM DUAL`;

            const result = await Conn.execute(query);

            if (result.rows.length > 0) {
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
                res.status(200).json(data);
                await DisconnectOracleDB(Conn);
            }

        } catch (error) {
            writeLogError(error.message, query);
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports.GetSerialAVIBadmarkResult = async function (req, res) {
    var query = "";
    try {
        const { strSheetNo, intPCSNo, strSMPJCavityFlg } = req.body;
        console.log(strSheetNo, intPCSNo, strSMPJCavityFlg ,"เข้า")
        let _strShippingNo = await GetSMTConnectShtPcsShippingNO(strSheetNo);
        if (_strShippingNo === "") {
            _strShippingNo = strSheetNo;
        }
        console.log(strSheetNo,"strSheetNo")
        const client = await ConnectOracleDB("PCTTTEST");
        query = ` SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_GetSerialAVIBadmark( ${intPCSNo},'${strSMPJCavityFlg}','${_strShippingNo}') AS DATA1 FROM DUAL`;
        const result = await client.execute(query);
        console.log(result.rows,"ROW")
        if (result.rows.length > 0) {
            
            let data = [];
            console.log("data",data)
            for (let i = 0; i < result.rows[0][0].length; i++) {
                data.push({
                    PCS_NO: result.rows[0][0][i][0],
                    AVI_DATE: result.rows[0][0][i][1],
                    AVI_RESULT: result.rows[0][0][i][2],
                    AVI_MACHINE: result.rows[0][0][i][3],
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


module.exports.GetMCNO = async function (req, res) {
    {
        let query = "";
        try {
            const {
                p_IPAddress,
            } = req.body;
            const Conn = await ConnectOracleDB("PCTTTEST");

            query = `SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_GetMCNO('${p_IPAddress}') AS DATA1 FROM DUAL`;

            const result = await Conn.execute(query);

            if (result.rows.length > 0) {
                let data = [];

                for (let i = 0; i < result.rows[0][0].length; i++) {
                    data.push({
                        MC_NO: result.rows[0][0][i][0],
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
    console.log(strPlantCode, strSheetNo,"MAILLL")
    try {
        const client = await ConnectPG_DB();
        query = `SELECT * FROM "Traceability".GetRollLeafBySheetNo('[{"strPlantCode": "${strPlantCode}", "strSheetNo": "${strSheetNo}"}]')`;
console.log(query,"query123")
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

module.exports.getfinalgatehistory = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_035_traceviewpiece_getfinalgatehistory('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getaoiresult = async function (req, res) {
    var query = "";

    try {
        const p_data = JSON.stringify(req.body);
        console.log(p_data,"p_data")
        query = `SELECT * FROM "Traceability".trc_043_aoiresult_getaoiresult('${p_data}'); `;
        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.GetOSTResultPiece = async function (req, res) {
    {
        let query = "";
        try {
            const {
                strSheetNo, intPCSNo
            } = req.body;
            const Conn = await ConnectOracleDB("PCTTTEST");

            query = `SELECT FPC.TRC_COMMON_TRACEABILITY.TRC_COMMON_GetOSTRSTPiece('${strSheetNo}', ${intPCSNo}) AS DATA1 FROM DUAL`;

            const result = await Conn.execute(query);

            if (result.rows.length > 0) {
                let data = [];

                for (let i = 0; i < result.rows[0][0].length; i++) {
                    data.push({
                        SHEET_NO: result.rows[0][0][i][0],
                        PRODUCT_NAME: result.rows[0][0][i][1],
                        LOT_NO: result.rows[0][0][i][2],
                        ROLL_LEAF_NO: result.rows[0][0][i][3],
                        LEAF_SEQ: result.rows[0][0][i][4],
                        MACHINE_NO: result.rows[0][0][i][5],
                        MODEL_NO: result.rows[0][0][i][6],
                        TESTER_NO: result.rows[0][0][i][7],
                        FIXTURE_NO: result.rows[0][0][i][8],
                        PCS_NO: result.rows[0][0][i][9],
                        OST_RESULT: result.rows[0][0][i][10],
                        OST_DATE: result.rows[0][0][i][11],
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

module.exports.getposition = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_035_traceviewpiece_getposition('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getpreresult = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_035_traceviewpiece_getpreresult('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getpreresult2 = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_035_traceviewpiece_getpreresult2('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getpreresult3 = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_035_traceviewpiece_getpreresult3('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getrejectresult = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_047_reject_result_getdata('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getTouchupresult = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_048_touchupresult_getdata('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getCheckerresult = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_049_checkerresult_getdata('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getCheckerresult = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_049_checkerresult_getdata('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getCheckerresultdata2 = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_049_checkerresult_getdata2('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getCheckerresultdata3 = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_049_checkerresult_getdata3('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

module.exports.getaoicoaresult = async function (req, res) {
    var query = "";
    try {
        const p_data = JSON.stringify(req.body);
        query = `SELECT * FROM "Traceability".trc_051_aoicoaresult_getdata('${p_data}'); `;

        const client = await ConnectPG_DB();
        const result = await client.query(query);
        await DisconnectPG_DB(client);
        res.status(200).json(result.rows);
    } catch (err) {
        writeLogError(err.message, query);
        res.status(500).json({ message: err.message });
    }
};

