export interface Retry {
  count: number
  delay: number
  acc: '+' | '*' | boolean
}

export interface useImageLoadOptions {
  retryOptions: Partial<Retry>
  decode: boolean
  onLoaded?: (event: Event) => void
  onError?: (event: string | Event) => void
}

const DEFAULT_RETRY_OPTIONS: Retry = {
  count: 3,
  delay: 1,
  acc: '*'
}

export function useImageLoad(options: useImageLoadOptions) {
  const { decode, retryOptions, onError, onLoaded } = options
  let retries = 1
  let image: null | HTMLImageElement = null
  let timeout: any = null
  const { count, delay, acc } = Object.assign(
    DEFAULT_RETRY_OPTIONS,
    retryOptions
  ) as Retry

  function load(src: string) {
    image = new Image()
    image.src = src
    if (decode && image.decode) {
      try {
        image.decode()
      } catch (error) {}
    }

    image.onload = event => {
      onLoaded?.(event)
    }

    image.onerror = event => {
      if (!count || retries > count) {
        return onError?.(event)
      }
      let time = acc === '*' ? delay ** retries : delay * retries
      time = acc === false ? delay : time
      timeout = setTimeout(() => {
        image!.src = src
      }, time * 1000)
      retries++
    }
  }

  function clearImageSrc() {
    if (!image) return
    image.src = ''
  }

  function unload() {
    if (!image) return
    timeout && clearTimeout(timeout)
    timeout = null
    clearImageSrc()
    image!.onload = null
    image!.onerror = null
    image = null
  }

  onUnmounted(() => {
    unload()
  })

  return {
    load
  }
}
