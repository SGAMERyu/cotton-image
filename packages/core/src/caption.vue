<template>
  <div class="cotton-image-caption">
    <Component :is="captionNode" v-if="captionNode"></Component>
    <template v-else>
      {{ captionText }}
    </template>
  </div>
</template>

<script setup lang="ts">
import { imageCaptionProps } from './image.prop'
defineOptions({
  name: 'CottonImageCaption'
})
defineProps({ ...imageCaptionProps, ...variants })
</script>

<style lang="ts" setup>
css({
    variants: {
        position: {
            inner: {
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                color: '#fff',
                backgroundColor: 'rgba(0, 0, 0, 0.65)',
                padding: '8px 16px',
            },
            outer: {
                color: '#000',
                marginTop: '4px'
            }
        }
    },
    '.cotton-image-caption': {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
    }
})
</style>
