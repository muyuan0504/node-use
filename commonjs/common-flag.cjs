/**
 * 以下情况nodejs 将 javascript 解释为 CommonJs.
 * 1. 文件扩展名为 .cjs
 * 2. package.json 中 type 字段的值为 commonjs，如不设置，默认值为 commonjs; 当 type 设置为 module 时，需要对应 commonjs 使用模块后缀名改为 .cjs
 * 3. 命令行参数 --input-type=commonjs 或者 --experimental-default-type=commonjs
 */

const moduleA = require('./a.cjs')
console.log('commonjs moduleA: ', moduleA)
