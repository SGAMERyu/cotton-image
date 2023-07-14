export interface Retry {
  count?: number
  delay?: number
  acc: '+' | '*' | boolean
}

export interface useImageLoadOptions {
  src: string
  retryOptions: Retry
  decode: boolean
  onRetry?: () => void
  onLoaded?: (event: Event) => void
  onError?: () => void
}

export function useImageLoad(options: useImageLoadOptions) {
  const { src, decode, retryOptions } = options
  const { count = 3, delay = 2, acc = '*' } = retryOptions
  let image: null | HTMLImageElement = new Image()
  let retries = 1
  image.src = src
  const time = ref(0)

  if (decode && image.decode) {
    try {
      image.decode()
    } catch (error) {}
  }

  const { start: starTimeout, stop: stopTimeout } = useTimeoutFn(() => {
    clearImageSrc()
    image!.src = src
  }, time)

  image.onerror = () => {
    if (!count || retries > count) return
    let time = acc === '*' ? delay ** retries : delay * retries
    time = acc === false ? delay : time
    starTimeout()
    options.onRetry?.()
    options.onError?.()
    retries += 1
  }

  image.onload = (event: Event) => {
    options.onLoaded?.(event)
  }

  function clearImageSrc() {
    try {
      image!.src = ''
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      delete image.src
    } catch (error) {}
  }

  function unload() {
    image!.onload = null
    image!.onerror = null
    clearImageSrc()
    image = null
    stopTimeout()
    retries = 1
  }

  return {
    unload
  }
}
