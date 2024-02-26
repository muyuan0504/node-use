const mysql = require('mysql')

const connection = mysql.createConnection({
    host: '',
    user: 'root',
    password: '',
    database: 'muyuan',
    port: '3306',
})

function MYSQL_INIT() {
    connection.connect((err) => {
        if (err) {
            console.log('mysql connection error: ', err)
        }
    })
}

function MYSQL_CLOSE() {
    connection.end()
}

function sqlQuery(sql) {
    return new Promise((resolve, reject) => {
        connection.query(sql, function (err, result) {
            if (err) {
                reject('[SELECT ERROR] - ', err.message)
                return
            }
            resolve(result)
        })
    }).catch((err) => console.error('sqlQuery: ', err))
}

function sqlInsert(sql, data) {
    return new Promise((resolve, reject) => {
        console.log(sql, data)
        connection.query(sql, data, function (err, result) {
            if (err) {
                reject('sqlInsert ERROR] - ', err)
                return
            }
            resolve(result)
        })
    }).catch((err) => console.error('sqlInsert: ', err))
}

module.exports = {
    MYSQL_INIT,
    MYSQL_CLOSE,
    sqlQuery,
    sqlInsert,
}
