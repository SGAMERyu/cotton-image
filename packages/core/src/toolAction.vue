<template>
  <div class="cotton-image-action-btn" @click.stop="onClick">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'CottonToolAction'
})

const emits = defineEmits<{
  click: []
}>()

function onClick() {
  emits('click')
}
</script>

<style lang="ts">
css({
    '.cotton-image-action-btn': {
        width: '24px',
        height: '24px',
        cursor: 'pointer',
        borderRadius: '50%',
        backgroundColor: '#000',
        color: '#fff',
        fontSize: '18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        'svg': {
            width: '1em',
            height: '1em',
            fill: 'currentColor'
        }
    }
})
</style>
