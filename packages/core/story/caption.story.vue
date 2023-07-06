<template>
  <Story
    title="image-caption"
    :layout="{
      type: 'grid',
      width: '800px',
      height: '200px'
    }"
  >
    <div class="demo-block">
      <Test
        :src="src"
        caption="this is caption"
        width="200px"
        height="120px"
      ></Test>
      <Test
        :src="src"
        caption="this is caption"
        width="200px"
        height="120px"
        footer-position="outer"
      ></Test>
    </div>
  </Story>
</template>

<script lang="ts" setup>
import Test from '../src/image.vue'

const src =
  'https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80'

defineOptions({
  name: 'CottonCaptionStory'
})
</script>

<style>
.demo-block {
  display: flex;
  gap: 8px;
}
</style>
