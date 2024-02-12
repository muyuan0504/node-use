/** ES6-module
 * 启用条件，需要满足以下条件之一
 * 1. .mjs 文件扩展名
 * 2. 值为 "module" 的 package.json "type" 字段
 * 3. 值为 "module" 的 --input-type 标志
 * 4. 值为 "module" 的 --experimental-default-type 标志
 */

import moduleA from './a.mjs'
console.log('module A: ', moduleA)

/** import() 动态加载模块 */
const moduleB = await import('./b.mjs')
const commonModuleA = await import('../commonjs/a.cjs')
console.log('moduleB: ', moduleB.default)
console.log('commonModuleA: ', commonModuleA.default)
