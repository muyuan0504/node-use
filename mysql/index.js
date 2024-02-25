const mysql = require('mysql')

const connection = mysql.createConnection({
    host: '',
    user: 'root',
    password: '',
    database: '',
    port: '3306',
})

connection.connect((err) => {
    console.log('连接异常：', err)
})

console.log('尝试连接')

const sql = 'SELECT * FROM LOVE_RECORD'

connection.query(sql, function (err, result) {
    if (err) {
        console.log('[SELECT ERROR] - ', err.message)
        return
    }
    console.log(result)
})

// connection.end()
