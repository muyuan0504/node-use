// const moduleA = require('./a.js')

// console.log('moduleA: ', moduleA)

/** 加载模块接收arguments列表, arguments 是函数内置对象
 * 0. {} - 对 module.exports 的引用，其输入更短
 * 1. require()函数
 * 2. Module - 内置 Module 对象，对当前模块的引用
 * 3. filename - path
 * 4. dirname - path
 */

exports.b = 1
// console.log(arguments[0]) // { b: 1 }

const requireExec = arguments[1] // 手动取出 require 函数执行
const moduleA = requireExec('./a')
// console.log('requireExec load moduleA: ', moduleA)

/** 引入自己实现的require模块封装器 */
const requireImplement = require('./require')
const _moduleA = requireImplement('./a')
console.log('requireImplement load moduleA: ', _moduleA)
