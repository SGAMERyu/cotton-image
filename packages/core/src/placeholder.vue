<template>
  <div class="cotton-image-placeholder">
    <Component :is="placeholderNode" v-if="placeholderNode"></Component>
    <template v-else>
      <template v-if="!placeholderText">
        <PlaceholderIcon />
      </template>
      <template v-else>
        {{ placeholderText }}
      </template>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { imagePlaceholderProps } from './image.prop'
import PlaceholderIcon from './placeholderIcon.vue'

defineProps({ ...imagePlaceholderProps })
defineOptions({
  name: 'CottonImagePlaceholder'
})
</script>

<style>
@keyframes pulse {
  50% {
    opacity: 0.5;
  }
}
</style>

<style lang="ts" setup>
css({
    '.cotton-image-placeholder': {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e5e7eb',
        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
    }
})
</style>
