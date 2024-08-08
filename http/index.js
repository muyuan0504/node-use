const http = require('http')

const server = http.createServer((req, res) => {
    console.error('---------- 服务器接收请求 --------------')
    // res.setHeader('Cach-Control', 'max-age=60')
    // res.setHeader('Content-Type', 'text/html')
    res.writeHead(200, {
        'Cache-Control': 'max-age=20',
        'Content-Type': 'text/html',
    })
    res.end('<div>hello world</div>')
})

server.listen(8000, () => {
    console.error('---------- 正在监听端口80000 --------------')
})
