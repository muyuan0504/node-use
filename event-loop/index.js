/**
 * 要理解Node.js的任务队列（或事件循环），首先需要理解Node.js是如何处理异步操作的
 *
 * Node.js 是基于单线程的 JavaScript 运行环境，尽管它是单线程的，但它能够处理大量的并发请求，这主要归功于它的事件驱动架构和异步 I/O 操作
 *
 * 事件循环主要分为以下几个阶段：
 * 1. Timers 阶段: 处理 setTimeout 和 setInterval 的回调函数
 * 2. Pending Callbacks 阶段: 处理一些延迟执行的 I/O 回调函数
 * 3. Idle, Prepare 阶段: 准备阶段，几乎不会用到，供内部使用
 * 4. Poll 阶段: 这一阶段负责处理 I/O 回调，大多数的异步操作的回调都在这个阶段被执行。如果事件队列为空，事件循环在这里会阻塞等待新的 I/O 事件
 * 5. Check 阶段: 处理 setImmediate 的回调函数
 * 6. Close Callbacks 阶段: 处理一些关闭的回调函数，如 socket.on('close')
 *
 * 任务队列（Task Queue）
 * Node.js 中的任务队列包括了宏任务（macrotask）和微任务（microtask）两种：
 * 宏任务（Macrotask）: 例如 setTimeout、setInterval、setImmediate、I/O 事件等。这些任务会进入事件循环的各个阶段执行
 * 微任务（Microtask）: 例如 process.nextTick 和 Promise.then。微任务会在当前阶段执行完毕后立即执行，在进入下一个事件循环阶段之前优先执行
 *
 * 执行顺序
 * 1. 执行全局脚本（即主线程任务）
 * 2. 清空微任务队列
 * 3. 进入事件循环各个阶段，依次处理对应阶段的回调
 * 4. 每个阶段执行完毕后，再次清空微任务队列
 * 6. 如此循环，直到事件队列为空，程序结束
 *
 */

const fs = require('fs')

function test() {
    /** 依次输出： nextTick promise timeout immediate */
    setTimeout(() => {
        console.log('timeout')
    }, 0)

    setTimeout(() => {
        console.log('timeout 10')
    }, 10)

    setTimeout(() => {
        console.log('timeout 100')
    }, 100)

    setImmediate(() => {
        console.log('immediate')
    })

    Promise.resolve().then(() => {
        console.log('promise')
    })

    process.nextTick(() => {
        console.log('nextTick')
    })
}
// test()

/** 当timer */
function useIO() {
    /**
     * 解析：
     * 1. 全局执行阶段 在事件循环开始之前，Node.js 首先会执行全局的同步代码。即立即执行的代码，包括：
     * · 输出 Start
     * · 注册 setTimeout(0)，setTimeout(100)，setImmediate，fs.readFile 的回调
     * · 注册 process.nextTick 的回调
     * · 输出 End
     *
     * 2. 处理微任务队列
     * · 在全局代码执行完之后，事件循环会先清空微任务队列中的任务
     * · process.nextTick 是一个微任务，会在本次循环中的所有阶段之前优先执行
     * · 输出 process.nextTick 1
     *
     * 3. Timers 阶段
     * · 事件循环开始处理 setTimeout 的回调
     * · 因为 setTimeout(0) 的时间到了，所以执行 setTimeout 1 的回调
     * · 输出 setTimeout 1
     *
     * 4. I/O 回调阶段：这个阶段处理一些未决的 I/O 事件的回调。这部分代码会在注册的 I/O 事件完成时被调用
     * · fs.readFile 是一个异步 I/O 操作，当文件读取完成后，I/O 回调阶段会处理它的回调
     * · 文件读取完成，执行 fs.readFile 的回调
     * · 输出 File read completed
     * · 在 fs.readFile 的回调中，又注册了一个 setTimeout(0) 和 setImmediate，这些回调将在后续的相应阶段执行。
     *
     * 5. Check 阶段
     * · 这个阶段执行 setImmediate 的回调。因为 setImmediate 会在 I/O 回调阶段 后的 Check 阶段 执行
     *   `Timers 阶段优先于 Check 阶段：在没有 I/O 任务的情况下，setTimeout 回调会优先于 setImmediate 回调执行(指的是 setTimeout(0) 与 setImmediate )
     *   因为 0 毫秒的延迟实际上是告诉 Node.js 在当前循环的 Timers 阶段执行`
     * · 执行 setImmediate 1 的回调
     * · 输出 setImmediate 1
     * · 由于在 fs.readFile 的回调中也注册了一个 setImmediate，这个回调也会在 Check 阶段执行
     * · 输出 setImmediate inside readFile
     *
     * 6. Timers 阶段（第二轮的事件循环开始）
     * · 在 fs.readFile 的回调中注册了一个 setTimeout(0)，这个回调会在下一轮的 Timers 阶段执行
     * · 输出 setTimeout inside readFile
     * · 执行 setTimeout(100) 的回调
     * · 输出 setTimeout 2
     *
     *
     * 依次输出
     * Start
     * End
     * process.nextTick 1
     * setTimeout 1
     * setImmediate 1
     * File read completed
     * setImmediate inside readFile
     * setTimeout inside readFile
     * setTimeout 2
     */
    console.log('Start')

    setTimeout(() => {
        console.log('setTimeout 1')
    }, 0)

    setTimeout(() => {
        console.log('setTimeout 2')
    }, 100)

    setImmediate(() => {
        console.log('setImmediate 1')
    })

    fs.readFile(__filename, () => {
        console.log('File read completed')

        setTimeout(() => {
            console.log('setTimeout inside readFile')
        }, 0)

        setImmediate(() => {
            console.log('setImmediate inside readFile')
        })
    })

    process.nextTick(() => {
        console.log('process.nextTick 1')
    })

    console.log('End')
}
useIO()
