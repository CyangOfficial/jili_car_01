const mysql = require('mysql');
function _connect(cb){
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'jili_changyangyang'
    });
    con.connect();
    cb && cb(con);
    con.end();
}
module.exports = function (query,params){
    return new Promise(function (resolve, reject){
        _connect(function (con){
            //query的第2个参数params []
            con.query(query,[params], function (err, res, fields){
                if(err){
                    reject(err);
                }else {
                    resolve(res);
                }
            });
        });
    });
}
