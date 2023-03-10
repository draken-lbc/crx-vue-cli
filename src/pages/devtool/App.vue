<script setup lang="ts">
const sendBackground = () => {
  chrome.runtime.sendMessage('我是devtool')
}
let obj = { a: 123 }
const sendInjected = () => {
  console.log(obj)
  chrome.devtools.inspectedWindow.eval(
    `devtoolsSendContentScript && devtoolsSendContentScript(${JSON.stringify(obj)})`,
    (res) => {
      console.log(res)
    },
  )
}
</script>

<template>
  <!-- <div @click="sendContent" class="tipss">sendContent</div> -->
  <div @click="sendBackground" class="tipss">sendBackground</div>
  <div @click="sendInjected" class="tipss">sendinjected-script</div>
</template>

<style scoped lang="less">
@import url('../../assets/less/common.less');
</style>
