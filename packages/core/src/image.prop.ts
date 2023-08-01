import type { PropType, CSSProperties, Component, ExtractPropTypes } from 'vue'
import type { Retry } from '~/composition/useImageLoad'

export enum DirectionEnum {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal'
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
    type: String
  },
  placeholder: {
    type: String
  },
  widthPlaceholder: {
    type: Boolean,
    default: false
  },
  caption: {
    type: String as PropType<string>
  },
  footerPosition: {
    type: String as PropType<'inner' | 'outer'>,
    default: 'inner'
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
    type: String as PropType<string | undefined>
  },
  fallbackSrc: {
    type: String
  },
  skeleton: {
    type: Boolean,
    default: false
  },
  lazy: {
    type: Boolean
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
  debounce: {
    type: Number,
    default: 300
  },
  observerOptions: {
    type: Object as PropType<Partial<IntersectionObserverInit>>,
    default: () => ({
      root: document.documentElement,
      rootMargin: '50px',
      threshold: 0.01
    })
  },
  retry: {
    type: Object as PropType<Partial<Retry>>,
    default: () => ({
      count: 1,
      delay: 2,
      acc: false
    })
  }
}

export const imagePlaceholderProps = {
  placeholderText: {
    type: String
  },
  placeholderNode: {
    type: Object as PropType<Component>
  },
  skeleton: {
    type: Boolean,
    default: false
  }
}

export const imageCaptionProps = {
  position: {
    type: String as PropType<'inner' | 'outer'>,
    default: 'inner'
  },
  captionText: {
    type: String
  },
  captionNode: {
    type: Object as PropType<Component>
  }
}

export const imagePreviewProps = {
  src: {
    type: String
  }
}

export const imageViewerProps = {
  visible: {
    type: Boolean,
    default: false
  },
  src: {
    type: String,
    default: ''
  },
  zoomDelta: {
    type: Number,
    default: 0.15
  },
  rotateDelta: {
    type: Number,
    default: 15
  }
}

export type ImageProps = ExtractPropTypes<typeof imageProps>
export type ImagePlaceholderProps = ExtractPropTypes<
  typeof imagePlaceholderProps
>
export type ImageCaptionProps = ExtractPropTypes<typeof imageCaptionProps>
export type ImagePreviewProps = ExtractPropTypes<typeof imagePreviewProps>
export type ImageViewerProps = ExtractPropTypes<typeof imageViewerProps>
export type ImageInstance = InstanceType<typeof Image>
