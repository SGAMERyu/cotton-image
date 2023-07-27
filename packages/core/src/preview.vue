<template>
  <div
    class="cotton-image-preview"
    @mouseenter="toggleShowMask()"
    @mouseleave="toggleShowMask()"
  >
    <slot></slot>
    <div v-show="showMask" class="cotton-image-mask" @click="onPreview">
      <div class="cotton-image-mask-icon">
        <PreviewIcon />
      </div>
    </div>
  </div>
  <imageViewer v-model:visible="showViewer" :src="src" />
</template>

<script lang="ts" setup>
import PreviewIcon from './previewIcon.vue'
import imageViewer from './imageViewer.vue'
import { imagePreviewProps } from './image.prop'

defineProps({ ...imagePreviewProps })

defineOptions({
  name: 'CottonImagePreview'
})

const [showMask, toggleShowMask] = useToggle(false)
const [showViewer, toggleShowViewer] = useToggle(false)

function onPreview() {
  toggleShowViewer(true)
}
</script>

<style lang="ts">
css({
    '.cotton-image-preview': {
        position: 'relative',
        width: '100%',
        height: '100%',
        cursor: 'pointer',
        '.cotton-image-mask': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
        },
        '.cotton-image-mask-icon': {
            color: '#fff',
            fontSize: '24px',
        }
    }
})
</style>
