<template>
  <div class="cotton-image-root">
    <img
      v-if="src"
      :src="src"
      :alt="alt"
      :srcset="srcSet"
      :sizes="sizes"
      class="cotton-image"
    />
    <Placeholder
      v-if="showPlaceholder"
      :placeholder-text="placeholder"
      :placeholder-node="$slots.placeholder"
      :skeleton="skeleton"
    >
    </Placeholder>
  </div>
</template>

<script setup lang="ts">
import { imageProps } from './image.prop'
import Placeholder from './placeholder.vue'

defineOptions({
  name: 'CottonImage'
})
const props = defineProps({ ...imageProps })

const showPlaceholder = computed(() => {
  const { src, widthPlaceholder } = props
  return !src || widthPlaceholder
})
</script>

<style lang="ts">
css({
  '.cotton-image-root': {
    position: 'relative',
    width: (props) => props.width,
    height: (props) => props.height,
    '& .cotton-image': {
      width: '100%',
      height: '100%',
      objectFit: (props) => props.fit
    }
  }
})
</style>
