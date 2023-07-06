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
    <Caption
      v-if="showCaption"
      :caption-text="caption"
      :caption-node="$slots.caption"
      :position="footerPosition"
    ></Caption>
  </div>
</template>

<script setup lang="ts">
import { imageProps } from './image.prop'
import Placeholder from './placeholder.vue'
import Caption from './caption.vue'

defineOptions({
  name: 'CottonImage'
})
const props = defineProps({ ...imageProps })
const slots = useSlots()

const showPlaceholder = computed(() => {
  const { src, widthPlaceholder } = props
  return !src || widthPlaceholder
})
const showCaption = computed(() => {
  const { caption } = props
  return (caption || slots.caption) && !showPlaceholder.value
})
</script>

<style lang="ts">
css({
  '.cotton-image-root': {
    position: 'relative',
    width: (props) => props.width,
    height: (props) => props.height,
    '& .cotton-image': {
      display: 'block',
      width: '100%',
      height: '100%',
      objectFit: (props) => props.fit
    }
  }
})
</style>
