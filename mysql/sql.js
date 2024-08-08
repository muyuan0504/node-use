/** 创建数据表 */
const SQL_CREATE_TABLE = `
CREATE TABLE IF NOT EXISTS love_record (
    id INT AUTO_INCREMENT PRIMARY KEY,
    record VARCHAR(1000) NOT NULL,
    keyword VARCHAR(100) NOT NULL
)
`

/** 生成 insert 语句
 * const insertSQL = "INSERT INTO your_table (column1, column2, column3) VALUES (?, ?, ?)";
 * const values = ['value1', 'value2', 'value3']; // 替换为要插入的实际值
 * connection.query(insertSQL, values, (error, results, fields) => { }
 */
const GENERATE_INSERT_SQL = ({ name, data }) => {
    const useKeys = Object.keys(data)
    const columnKeys = useKeys.join(', ')
    const insertSQL = `INSERT INTO ${name} (${columnKeys}) VALUES (?, ?, ?)`
    const values = []
    useKeys.forEach((key) => {
        values.push(data[key])
    })

    return {
        sql: insertSQL,
        values,
    }
}

module.exports = {
    SQL_CREATE_TABLE,
    GENERATE_INSERT_SQL,
}
