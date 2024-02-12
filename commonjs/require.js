/** commonJs 实现原理 */
// ;(function (exports, require, module, __filename, __dirname) {})(exports, require, module, __filename, __dirname)

const { resolve, extname } = require('path')
const { accessSync, readFileSync, constants } = require('fs')
const { runInThisContext } = require('vm')

function requireImplement(modulePath) {
    /** modulePath 可能是没有文件后缀名的，如果没有后缀名，文件无法读取。 */
    let absModulePath = resolve(__dirname, modulePath)
    const originModulePath = absModulePath
    absModulePath = handleExt(originModulePath) // 处理文件后缀名

    if (Module._cache[absModulePath]) {
        // 模块缓存处理
        return Module._cache[absModulePath].exports
    }

    // 构建新模块
    const module = new Module(absModulePath)
    Module._cache[absModulePath] = module

    // 加载模块 - 执行导出 module.export
    moduleLoad(module)

    return module.exports

    // console.log('absModulePath: ', absModulePath)
    // const res = await access(absModulePath, constants.R_OK).catch((err) => console.log(err))
    // if (res === undefined) {
    //     const fileStr = await readFile(absModulePath, 'utf-8')
    //     console.log(fileStr)
    // }
}

function Module(id) {
    this.id = id
    this.exports = {}
}

/** Module缓存对象：Module._cache[absModulePath] = module */
Module._cache = {}

Module._wrapper = ['(function(exports, module, require, __filename, __dirname){', '})']

/** Module 支持的加载文件扩展名 */
Module._extensions = {
    // '.js': function(module) {}
    '.js'(module) {
        const path = module.id
        try {
            const code = readFileSync(path, 'utf-8')
            const codeFun = Module._wrapper[0] + code + Module._wrapper[1]
            // vm.runInThisContext() 编译 code，在当前 global 的上下文中运行它并返回结果
            const func = runInThisContext(codeFun)
            // 将 this 调用指向 module.exports
            func.call(module.exports, module.exports, module, requireImplement, __filename, __dirname)
        } catch (error) {
            throw error
        }
    },
    // '.json'(module) {},
    // ...
}

/** 模块加载函数 */
function moduleLoad(module) {
    const path = module.id
    const ext = extname(path)
    Module._extensions[ext](module)
}

/** 遍历文件后缀名处理 - 递归感觉不如用遍历实现 */
function handleExt(path) {
    const supExt = Object.keys(Module._extensions)
    let index = 0
    function getExt(path) {
        if (index > supExt.length) {
            throw new Error('file not exist!')
        }
        try {
            accessSync(path, constants.R_OK)
            return path
        } catch (error) {
            const ext = supExt[index++]
            return getExt(path + ext)
        }
    }
    return getExt(path)
}

module.exports = requireImplement
