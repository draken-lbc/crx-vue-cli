import { request } from 'http'

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('backageground.js 接收', request)
  sendResponse('我收到了你的消息')
})
