<template>
  <Story
    title="image-preview"
    :layout="{
      type: 'grid',
      width: '800px'
    }"
  >
    <Test :src="src" width="200px" height="120px" :preview-src="src"></Test>
  </Story>
</template>

<script lang="ts" setup>
import Test from '../src/index.vue'

const src =
  'https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80'

defineOptions({
  name: 'CottonPreviewStory'
})
</script>
