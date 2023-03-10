<script setup lang="ts">
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message)
  sendResponse({ info: '我是options,收到消息' })
})
const sendBackground = () => {
  chrome.runtime.sendMessage('options发送消息')
}
</script>

<template>
  <div @click="sendBackground" class="tipss">sendBackground</div>
</template>

<style scoped>
@import url('../../assets/less/common.less');
</style>
