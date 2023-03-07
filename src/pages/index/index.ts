chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('index.js 接收', request)
  sendResponse('我收到了你的消息')
})
// chrome.runtime.sendMessage()
