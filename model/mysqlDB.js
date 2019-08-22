const mysql = require('mysql');

function __connection() {
    var connection = mysql.createConnection({
        host: 'cdb-6blev1lu.bj.tencentcdb.com',
        user: 'root',
        password: 'aa987654321',
        database: 'vueadmin',
        port: '10053'
    });
    connection.connect();
    return connection;
}
exports.query = function (sql, parmas = null) {
    var connection = __connection();
    return new Promise((reject, resolve) => {
        connection.query(sql, parmas, function (error, results, fields) {
            if (error) resolve(error);
            reject(results);
        });
        connection.end();
    })
}