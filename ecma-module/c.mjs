let a = 1

const moduleVal = {
    a,
    type: 'ecma',
}

setTimeout(() => {
    a = 555
    moduleVal.a = 777
}, 1500)

console.log('执行module C')

export default moduleVal
