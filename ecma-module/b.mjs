function test() {
    console.log('Module B test() exec')
}

test()

import * as moduleA from './a.mjs'

console.log('moduleA.a: ', moduleA) // moduleA.a:  [Module: null prototype] { a: <uninitialized> }, 我们看到并不会报错

export default { b: 22 }
