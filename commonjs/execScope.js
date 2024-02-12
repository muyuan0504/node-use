/** 为什么构建 require 执行函数需要用 runInThisContext  */

const { runInThisContext } = require('vm')

let a = 1

global.b = 2

/** new Function 无法获取模块内的变量，只能拿到 global 全局模块变量 */
new Function('console.log(b)')()

/** eval 既能拿到模块内的变量，也能拿到 global 全局模块变量, 会破坏模块内部变量的独立性 */
eval('console.log(a, b)')

const module_define = {
    a: 11,
    b: 22,
}
const fun = runInThisContext("(function(){ console.log('模块内部变量') })")
fun()
