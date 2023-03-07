<script setup lang="ts">
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message)
  sendResponse({ info: '我是popup收到消息' })
})
const sendContent = () => {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    if (!tabs[0].id) return
    chrome.tabs.sendMessage(
      tabs[0].id,
      {
        type: 'popup',
        message: 'popup发送消息了',
      },
      (ress) => {
        console.log('popus', ress)
      },
    )
  })
  // chrome.tabs.getCurrent((tab) => {
  //   console.log(tab)
  //   chrome.tabs.sendMessage(
  //     tab?.id || 0,
  //     {
  //       type: 'getNode',
  //       message: '',
  //     },
  //     (ress) => {
  //       console.log('popus', ress)
  //     },
  //   )
  // })
}
const sendBackground = () => {
  chrome.runtime.sendMessage('popup发送消息')
}
</script>

<template>
  <div @click="sendContent">sendContent</div>
  <div @click="sendBackground">sendBackground</div>
</template>

<style scoped></style>
