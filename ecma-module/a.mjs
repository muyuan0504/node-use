import moduleB from './b.mjs'
console.log('a.js exec')

export let a = 1

setTimeout(() => {
    a = 999
}, 1000)
