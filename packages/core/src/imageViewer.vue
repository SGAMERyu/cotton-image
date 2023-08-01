<template>
  <Teleport to="body">
    <div v-show="visible" class="cotton-image-preview-root" @click="onClose">
      <div class="cotton-image-preview-mask"></div>
      <div ref="refWarp" class="cotton-image-preview-warp">
        <img
          ref="refImage"
          class="cotton-image-preview-img"
          :src="src"
          :style="imageStyle"
        />
      </div>
      <div class="cotton-image-preview-tools">
        <template v-for="item in internalActions" :key="item">
          <ToolAction @click="item.process">
            <component :is="item.icon"></component>
          </ToolAction>
        </template>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import ToolAction from './toolAction.vue'
import ZoomInIcon from './actionIcons/zoomInIcon.vue'
import ZoomOutIcon from './actionIcons/zoomOutIcon.vue'
import RotateLeftIcon from './actionIcons/rotateLeftIcon.vue'
import RotateRightIcon from './actionIcons/rotateRightIcon.vue'
import ResetIcon from './actionIcons/resetIcon.vue'
import FullscreenIcon from './actionIcons/fullscreenIcon.vue'
import FlipVerticalIcon from './actionIcons/flipVerticalIcon.vue'
import FlipHorizontalIcon from './actionIcons/flipHorizontalIcon.vue'
import { DirectionEnum, imageViewerProps } from './image.prop'

defineOptions({
  name: 'CottonImageViewer'
})

const props = defineProps({ ...imageViewerProps })

const emits = defineEmits<{
  'update:visible': [boolean]
}>()

const imageTransform = ref({
  scaleX: 1,
  scaleY: 1,
  scaleZ: 1,
  rotate: 0,
  x: 0,
  y: 0
})
const refImage = ref<HTMLImageElement | null>(null)

const { toggle: handleFullscreen } = useFullscreen(refImage)

const internalActions = [
  {
    icon: ZoomInIcon,
    process: () => handleZoom(props.zoomDelta)
  },
  {
    icon: ZoomOutIcon,
    process: () => handleZoom(-1 * props.zoomDelta)
  },
  {
    icon: RotateLeftIcon,
    process: () => handleRotate(-1 * props.rotateDelta)
  },
  {
    icon: RotateRightIcon,
    process: () => handleRotate(props.rotateDelta)
  },
  {
    icon: ResetIcon,
    process: () => handleReset()
  },
  {
    icon: FullscreenIcon,
    process: () => handleFullscreen()
  },
  {
    icon: FlipVerticalIcon,
    process: () => handleFlip(DirectionEnum.VERTICAL)
  },
  {
    icon: FlipHorizontalIcon,
    process: () => handleFlip(DirectionEnum.HORIZONTAL)
  }
]

function onClose() {
  emits('update:visible', false)
}

function handleZoom(ratio: number) {
  imageTransform.value.scaleX += ratio
  imageTransform.value.scaleY += ratio
}

function handleRotate(ratio: number) {
  imageTransform.value.rotate += ratio
}

function handleReset() {
  imageTransform.value = {
    scaleX: 1,
    scaleY: 1,
    scaleZ: 1,
    rotate: 0,
    x: 0,
    y: 0
  }
}

function handleFlip(type: DirectionEnum) {
  if (type === DirectionEnum.HORIZONTAL) {
    imageTransform.value.scaleX *= -1
  } else {
    imageTransform.value.scaleY *= -1
  }
}

const imageStyle = computed(() => {
  const { rotate, x, y, scaleX, scaleY, scaleZ } = imageTransform.value
  return {
    transform: `scale3d(${scaleX}, ${scaleY}, ${scaleZ}) rotate(${rotate}deg) translate(${x}px, ${y}px)`
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
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    '.cotton-image-preview-img': {
      maxWidth: '100%',
      maxHeight: '70%',
      userSelect: 'none',
      transition: 'transform 0.3s cubic-bezier(0.215, 0.61, 0.355, 1) 0s'
    },
    '.cotton-image-preview-tools': {
        position: 'absolute',
        bottom: '24px',
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        gap: '8px'
    }
})
</style>
