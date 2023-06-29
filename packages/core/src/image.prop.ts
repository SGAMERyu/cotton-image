import type { PropType, CSSProperties, Component } from 'vue'

interface RetryOptions {
  count: number
  delay: number
  acc: string | boolean
}


export const imageProps = {
  width: {
    type: [Number, String] as PropType<number | string>,
    default: '100%'
  },
  height: {
    type: [Number, String] as PropType<number | string>,
    default: '100%'
  },
  srcSet: {
    type: String
  },
  sizes: {
    type: String,
  },
  placeholder: {
    type: String
  },
  caption: {
    type: String as PropType<string>
  },
  fit: {
    type: String as PropType<CSSProperties['object-fit']>,
    default: 'cover'
  },
  alt: {
    type: String,
    default: ''
  },
  src: {
    type: String,
    required: true
  },
  fallbackSrc: {
    type: String
  },
  sourceList: {
    type: Array as PropType<Source[]>,
    default: () => []
  },
  skeleton: {
    type: [Boolean, Object] as PropType<
      boolean | { animate: boolean; icon: Component; style: CSSProperties }
    >
  },
  lazy: {
    type: Boolean,
    default: true
  },
  preview: {
    type: Boolean,
    default: false
  },
  previewSrc: {
    type: String
  },
  decode: {
    type: Boolean,
    default: true
  },
  cache: {
    type: Boolean,
    default: true
  },
  debounce: {
    type: Number,
    default: 300
  },
  observerOptions: {
    type: Object as PropType<IntersectionObserverInit>,
    default: () => ({
      root: window,
      rootMargin: '50px',
      threshold: 0.01
    })
  },
  retry: {
    type: Object as PropType<RetryOptions>,
    default: () => ({
      count: 1,
      delay: 2,
      acc: false
    })
  }
}
