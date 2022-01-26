const http = require('http')
const fs = require('fs')
const fetch = require('fetch')

http.createServer(function (request, response) {
    console.log(request.url)

    if (!request.url.startsWith('/departures')) {
        response.writeHead(404, { 'Content-Type': 'text/plain' })
        response.end('404 Not Found')
        return
    }

    const stop = request.url.split('/')[2]

    console.log(stop)

    const key = fs.readFileSync('key.txt', 'utf8')
    fetch.fetchUrl(`http://gtfsr.vbn.de/api/routers/connect/index/stops/${stop}/stoptimes`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': key,
            'Accept': 'application/json',
            'Host': 'gtfsr.vbn.de'
        }
    }, (_error, _meta, body) => {
        response.writeHead(200, { 'Content-Type': 'application/json' })
        response.end(body)
    })
}).listen(80)

console.log('started on port 80')