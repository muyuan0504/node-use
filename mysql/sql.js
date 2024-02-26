/** 创建数据表 */
const SQL_CREATE_TABLE = `
CREATE TABLE IF NOT EXISTS love_record (
    id INT AUTO_INCREMENT PRIMARY KEY,
    record VARCHAR(1000) NOT NULL,
    keyword VARCHAR(100) NOT NULL
)
`

const SQL_INSERT = 'INSERT INTO love_record SET ?'

module.exports = {
    SQL_CREATE_TABLE,
    SQL_INSERT,
}
