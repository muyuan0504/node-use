const { MYSQL_INIT, MYSQL_CLOSE, sqlQuery, sqlInsert } = require('./use-mysql')

const { SQL_CREATE_TABLE, SQL_INSERT } = require('./sql')

MYSQL_INIT()

async function execSql() {
    await sqlQuery(SQL_CREATE_TABLE)
    await sqlInsert(SQL_INSERT, { id: null, keyword: 'init', record: '今夕何夕，见此良人' })
    MYSQL_CLOSE()
}

execSql()
