<template>
  <Story
    title="image-placeholder"
    :layout="{
      type: 'grid',
      width: '800px',
      height: '200pz'
    }"
  >
    <div class="demo-block">
      <Test
        placeholder="this is placeholder text"
        width="200px"
        height="120px"
      ></Test>
      <Test width="200px" height="120px">
        <template #placeholder>
          <span>this is placeholder node</span>
        </template>
      </Test>
      <Test width="200px" height="120px" skeleton> </Test>
    </div>
  </Story>
</template>

<script setup lang="ts">
import Test from '../src/index.vue'

defineOptions({
  name: 'CottonStory'
})
</script>

<style scoped>
.demo-block {
  display: flex;
  gap: 20px;
}
</style>
