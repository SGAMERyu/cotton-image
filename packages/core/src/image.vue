<template>
  <div class="cotton-image-root">
    <img 
      :src="src"
      :alt="alt"
      :srcset="srcSet"
      :sizes="sizes"
      class="cotton-image"
    >
  </div>
</template>

<script setup lang="ts">
import { imageProps } from './image.prop'

defineOptions({
  name: 'CottonImage'
})
defineProps({ ...imageProps })
</script>

<style lang="ts">
css({
  '.cotton-image-root': {
    position: 'relative',
    '& .cotton-image': {
      width: (props) => props.width,
      height: (props) => props.height,
      objectFit: (props) => props.fit
    }
  }
})
</style>
