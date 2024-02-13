// exports.a = {
//     a: 1,
// }

let a = 1
setTimeout(() => {
    // 由于变量 a 是基本类型，所以当require之后再动态改变a的值，此时a的值不变
    a = 666
    console.log('change a from 1 to 666')
}, 1000)
module.exports = {
    a,
    type: 'CommonJS',
}

/** 引用类型由于是值的引用，所以require之后动态改变exports的值，通过指针访问的真实数据已经改变，所以会保持同步变更。 */
// const exportsVal = {
//     a: 1,
//     type: 'CommonJS',
// }

// setTimeout(() => {
//     exportsVal.a = 666
//     console.log('change a from 1 to 666')
// }, 1000)

// module.exports = exportsVal
