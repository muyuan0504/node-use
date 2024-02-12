### ES6 module

import 语句只允许在 ES 模块中使用，但 CommonJS 支持动态 import() 表达式来加载 ES 模块。

-   import 操作符

与 CommonJS 不同，es6-module 的导入通过 import 操作符。

对于具名导出，如 export const xxx = xxx , 可通过解构导入：import { xxx } from './xxx'

-   import() 表达式

CommonJS 和 ES 模块都支持 动态 import(); import() 执行后返回的是一个 Promise,等待模块加载后 resolve

在 CommonJS 模块中它可以用来加载 ES 模块
