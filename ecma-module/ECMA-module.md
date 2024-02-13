### ES6 module

import 语句只允许在 ES 模块中使用，但 CommonJS 支持动态 import() 表达式来加载 ES 模块。

-   import 操作符

与 CommonJS 不同，es6-module 的导入通过 import 操作符。

对于具名导出，如 export const xxx = xxx , 可通过解构导入：import { xxx } from './xxx'

-   import() 表达式

CommonJS 和 ES 模块都支持 动态 import(); import() 执行后返回的是一个 Promise,等待模块加载后 resolve

在 CommonJS 模块中它可以用来加载 ES 模块

#### 与 CommonJS 的区别

1. ES6 模块输出的是值的引用，输出接口动态绑定，而 CommonJS 输出的是值的拷贝

根据 CommonJS 的实现机制，module.exports 会在加载模块之后缓存输出的值，当再次 require 模块时，

2. ES6 模块编译时执行，而 CommonJS 模块总是在运行时加载

-   import 命令会被 JavaScript 引擎静态分析，优先于模块内的其他内容执行

由于 import 的文件被 JS 引擎通过静态分析，会提到模块执行的最前面，优于模块中的其他部分的执行

```javascript
// a.js
console.log('a.js')
import { b } from './b' // import 内容会被优先执行

// b.js
export let b = 1
console.log('b.js')

// 执行结果:
// b.js
// a.js
```

-   export 命令会有变量声明提前的效果
