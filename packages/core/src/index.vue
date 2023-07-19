<template>
  <div ref="imageWrapper" class="cotton-image-root">
    <img
      v-if="shouldLoad"
      :src="loadSrc"
      :alt="alt"
      :srcset="srcSet"
      :sizes="sizes"
      class="cotton-image"
      @error="handleError"
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
import useObserver from '~/composition/useObserver'
import { noop } from '@vueuse/core'
import { useImageLoad } from '~/composition/useImageLoad'

defineOptions({
  name: 'CottonImage'
})
const props = defineProps({ ...imageProps })
const emits = defineEmits<{
  error: [event: Event | string]
}>()
const slots = useSlots()

const imageWrapper = ref<null | HTMLElement>(null)
const [loadFail, setLoadFail] = useToggle(false)
const [shouldLoad, setShouldLoad] = useToggle(!props.lazy)
const { load } = useImageLoad({
  decode: props.decode,
  retryOptions: props.retry,
  onLoaded: () => setShouldLoad(true),
  onError: handleError
})

const showPlaceholder = computed(() => {
  const { src, widthPlaceholder } = props
  return !src || widthPlaceholder || !shouldLoad.value
})

const showCaption = computed(() => {
  const { caption } = props
  return (caption || slots.caption) && !showPlaceholder.value
})

const loadSrc = computed(() => {
  if (loadFail.value && props.fallbackSrc) {
    return props.fallbackSrc
  }
  return props.src
})

function handleError(event: Event | string) {
  setShouldLoad(true)
  setLoadFail(true)
  emits('error', event)
}

if (props.src) {
  let stopObserver = noop
  watchEffect(() => {
    stopObserver()
    if (props.lazy) {
      const { stop } = useObserver(imageWrapper, {
        ...props.observerOptions,
        debounce: props.debounce,
        onInView: () => {
          load(props.src!)
        }
      })
      stopObserver = stop
    }
  })
}
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
