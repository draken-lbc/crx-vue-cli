const div = document.createElement('div')
div.setAttribute('id', 'crx-vue-cli')
div.setAttribute('class', 'crx-vue-cli-root')
document.body.before(div)
div.innerHTML = '发送sendMessage内容'
const injectGlobal = () => {
  var s = document.createElement('script')
  s.src = chrome.runtime.getURL('js/scriptGlobal.js')
  console.log(s.getAttribute('src'))
  document.body.appendChild(s)
  s.onload = function () {
    s.remove()
  }
}
injectGlobal()
div.addEventListener('click', (e) => {
  chrome.runtime.sendMessage({
    type: 'content',
    message: '我是contentJS',
  })
})
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('index.js 接收', request)
  sendResponse('我收到了你的消息')
})
