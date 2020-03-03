const mysql = require('mysql');
const logger = require('../model/logger')
function __connection() {
    var connection = mysql.createConnection({
        host: 'cdb-6blev1lu.bj.tencentcdb.com',
        user: 'root',
        password: 'aa987654321',
        database: 'vueadmin',
        port: '10053',
        multipleStatements: true

    });
    connection.connect();
    return connection;
}
exports.query = function (sql, parmas = null) {
    let connection = __connection();
    return new Promise((reject, resolve) => {
        connection.query(sql, parmas, function (error, results, fields) {
            if (error) {
              logger.error(error) 
              resolve(error);
              return
            }
            reject(results);
        });
        connection.end();
    })
}