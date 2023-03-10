chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request?.type) {
    case 'notifications':
      desktop_notification()
      break

    default:
      break
  }
  sendResponse('我收到了你的消息')
})
function desktop_notification() {
  chrome.notifications.create(
    'asdasd',
    {
      iconUrl: '../../../assets/images/reptile.png',
      message: 'string',
      type: 'basic',
      title: 'string',
    },
    (id) => {
      setTimeout(() => {
        chrome.notifications.clear(id)
      }, 2000)
    },
  )
}

// chrome.webRequest.onCompleted.addListener(
//   (res) => {
//     console.log(res)
//   },
//   { urls: ['<all_urls>'] },
//   ['extraHeaders', 'responseHeaders'],
// )
if (ISDEV) {
  // 进行热更新
  var chat = new EventSource('http://localhost:8100/reloadpage')
  chat.addEventListener('message', (event) => {
    const message = JSON.parse(event.data)
    switch (message.type) {
      case 'reload':
        chrome.runtime.reload()
        break
      default:
        break
    }
  })
  chat.addEventListener('error', (err) => {
    console.log(err)
  })
}
