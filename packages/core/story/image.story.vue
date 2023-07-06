<template>
  <Story title="image" :layout="{ type: 'grid', width: '800px' }">
    <Variant title="basic">
      <Test :src="src" />
    </Variant>

    <Variant title="width & height">
      <Test :src="src" width="200px" height="80px" />
      <Test :src="src" width="200px" height="80px" fit="contain" />
      <Test :src="src" height="80px" />
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import Test from '../src/image.vue'

const src =
  'https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80'

defineOptions({
  name: 'CottonStory'
})
</script>
