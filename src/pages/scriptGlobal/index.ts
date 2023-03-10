// content-script 与devtool通信
// const injectDevtoolsFunc = () => {
//   var s = document.createElement('script')
//   s.type = 'text/javascript'
//   s.innerText = `window.devtoolsSendContentScript = (data) => {
//       console.log(data)
//     }`
//   document.body.appendChild(s)
//   window['devtoolsSendContentScript'] = (data) => {
//     console.log(data)
//   }
//   console.log(window.devtoolsSendContentScript)
// }
// injectDevtoolsFunc()
window.devtoolsSendContentScript = (data) => {
  console.log(data)
}
