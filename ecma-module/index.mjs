/** ES6-module
 * 启用条件，需要满足以下条件之一
 * 1. .mjs 文件扩展名
 * 2. 值为 "module" 的 package.json "type" 字段
 * 3. 值为 "module" 的 --input-type 标志
 * 4. 值为 "module" 的 --experimental-default-type 标志
 */

/** ecma的import是输出值的引用，哪怕是基本数据类型，同样会动态关联模块中的值的变动 */
import { a } from './a.mjs'
console.log('module A: ', a)
setTimeout(() => {
    console.log('module A changed: ', a)
}, 1500)

/** 由于es6静态编译的特性，所以 import 的模块会被提升并优先执行，所以 console.log('执行module C') 会最先被输出 */
import moduleC from './c.mjs'
console.log('module C: ', moduleC)
setTimeout(() => {
    console.log('module C changed: ', moduleC)
}, 1500)

/** import() 动态加载模块 */
const moduleB = await import('./b.mjs')
const commonModuleA = await import('../commonjs/a.js')
console.log('moduleB: ', moduleB.default)
console.log('commonModuleA: ', commonModuleA.default)
