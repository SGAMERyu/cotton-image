<template>
  <Teleport to="body">
    <div v-show="visible" class="cotton-image-preview-root" @click="onClose">
      <div class="cotton-image-preview-mask"></div>
      <div class="cotton-image-preview-warp">
        <img :src="src" :style="imageStyle" />
      </div>
      <div class="cotton-image-preview-tools">
        <ToolAction @click="onActionClick(ToolEnum.ZOOM_IN)">
          <ZoomInIcon />
        </ToolAction>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import ToolAction from './toolAction.vue'
import ZoomInIcon from './actionIcons/zoomInIcon.vue'
import { ToolEnum } from './image.prop'

defineOptions({
  name: 'CottonImageViewer'
})

defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  src: {
    type: String,
    default: ''
  }
})

const emits = defineEmits<{
  'update:visible': [boolean]
}>()
const refTransform = ref({
  scale: 1,
  rotate: 0,
  x: 0,
  y: 0
})

function onClose() {
  emits('update:visible', false)
}

function onActionClick(type: ToolEnum) {
  console.log(type)
}

const imageStyle = computed(() => {
  const { scale, rotate, x, y } = refTransform.value
  return {
    maxWidth: '100%',
    maxHeight: '100%',
    transform: `scale(${scale}) rotate(${rotate}deg) translate(${x}px, ${y}px)`
  }
})
</script>

<style lang="ts">
css({
    '.cotton-image-preview-root': {
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    '.cotton-image-preview-mask': {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
    },
    '.cotton-image-preview-warp': {
        position: 'static',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        userSelect: 'none',
    },
    '.cotton-image-preview-tools': {
        position: 'absolute',
        bottom: '0px',
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        gap: '8px'
    }
})
</style>
