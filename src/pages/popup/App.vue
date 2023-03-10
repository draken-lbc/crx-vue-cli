<script setup lang="ts">
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message)
  sendResponse({ info: '我是popup,收到消息' })
})
const sendContent = () => {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    console.log(tabs)
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
  chrome.runtime.sendMessage({
    type: 'notifications',
    msg: 'popup发送消息',
  })
}
const jumpOptions = () => {
  chrome.runtime.openOptionsPage()
}
const jumpHtml = () => {
  chrome.tabs.create({
    url: chrome.runtime.getURL('src/pages/options/index.html'),
  })
}
</script>

<template>
  <div @click="sendContent" class="tipss">sendContent</div>
  <div @click="sendBackground" class="tipss">sendBackground</div>
  <div @click="jumpOptions" class="tipss">jumpOptions</div>
  <div @click="jumpHtml" class="tipss">打开页面</div>
  <div @click="sendBackground" class="tipss">sendBackground弹出通知</div>
</template>

<style scoped>
@import url('../../assets/less/common.less');
</style>
