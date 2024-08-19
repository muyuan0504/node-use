const { MYSQL_INIT, MYSQL_CLOSE, sqlQuery, sqlInsert } = require('./use-mysql')

const { SQL_CREATE_TABLE, GENERATE_INSERT_SQL } = require('./sql')

MYSQL_INIT()

async function execSql() {
    await sqlQuery(SQL_CREATE_TABLE)
    const insertTable = {
        name: 'love_record',
        data: { id: 0, keyword: 'first', record: '今夕何夕，见此良人' },
    }
    const { sql, values } = GENERATE_INSERT_SQL(insertTable)
    await sqlInsert(sql, values)
    MYSQL_CLOSE()
}

// execSql()
