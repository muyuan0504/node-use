### Node.js 模块

Node.js 有两个模块系统：CommonJS 模块和 ECMAScript 模块

调用 require() 始终使用 CommonJS 模块加载器； 调用 import 始终使用 ECMAScript 模块加载器。

### console.log(arguments)

为什么能直接在 js 文件中 console.log(arguments) ?

在 js 中能够形成的作用域包括：

1. 全局作用域；
2. 函数作用域；
3. 块作用域 - es6

Node.js 中的 JavaScript 运行时环境是基于 V8 引擎的，并且 arguments 是一个 JavaScript 的内置对象，它代表了当前函数调用的参数列表，在 CommonJS 模块系统中，每个文件都被视为一个单独的模块，Node.js

实际上会将该文件包装在一个函数内部执行（这种包装函数的作用是隔离模块内部的变量和函数，使其不会污染全局作用域，并且使得模块之间的依赖关系更加清晰和可维护），所以我们可以在 .js 文件中打印 arguments 参

数，获取模块加载函数的调用参数。

### commonJS

CommonJS 模块是为 Node.js 打包 JavaScript 代码的原始方式, 在 Node.js 中，每个文件都被视为一个单独的模块。每个模块内部都维护一个 Module 对象，当一个文件被 require 加载后，Module 对象的 loaded 属

性从 flase -> true。

-   运行条件

当文件扩展名为 .cjs ，或者 package.json 中 type 字段的值为 commonjs，或者命令行参数 --input-type=commonjs 或者 --experimental-default-type=commonjs，nodejs 将 javascript 解释为 CommonJs.

-   模块封装器

```javascript
/** 在执行模块代码之前，Node.js 将使用如下所示的函数封装器对其进行封装 */
;(function (exports, require, module, __filename, __dirname) {
    // 模块代码实际存在于此处
})
```

-   module 对象

在每个模块中，module 自由变量是对代表当前模块的对象的引用

1. module.id：模块的标识符，通常是完全解析的文件名

2. module.path：模块的目录名称

3. module.exports：模块导出的变量

4. module.filename：模块的完全解析文件名

5. module.loaded：模块是否已完成加载，或正在加载

6. module.children： 这个模块首次需要的对象

7. module.paths：模块的搜索路径
