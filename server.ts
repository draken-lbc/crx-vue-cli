import http from 'http'
const server = http.createServer()
let clients: any = null
/**
 * request：请求对象
 * response: 响应对象
 */
server.on('request', (request, response) => {
  response.writeHead(200, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
  })
  switch (request.url) {
    case '/emit':
      clients &&
        clients.write(
          'data:' +
            JSON.stringify({
              type: 'reload',
              message: new Date().getTime(),
            }) +
            '\r\n\r\n',
        )
      response.write(JSON.stringify({ status: 200 }))
      response.end()
      break
    case '/reloadpage':
      response.writeHead(200, { 'Content-Type': 'text/event-stream' })
      clients = response
      console.log('热更新服务已连接')
      response.write(
        'data:' +
          JSON.stringify({
            type: 'heart',
            message: '',
          }) +
          '\r\n\r\n',
      )
      setInterval(() => {
        response.write(
          'data:' +
            JSON.stringify({
              type: 'heart',
              message: '',
            }) +
            '\r\n\r\n',
        )
      }, 10000)
      request.on('end', function () {
        response.end()
      })
      break
    default:
      response.write('404 Not Found')
      response.end()
      break
  }
})
