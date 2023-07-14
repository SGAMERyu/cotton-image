import { noop } from '@vueuse/core'
import type { MaybeRef } from 'vue'

export type UseObserverOptions = Partial<
  IntersectionObserverInit & { debounce: number; onInView: () => void }
>

export default function useObserver(
  target: MaybeRef<HTMLElement | null>,
  options: UseObserverOptions
) {
  const observerRef = ref<IntersectionObserver | null>(null)

  const { debounce = 300, root, rootMargin, threshold, onInView } = options
  const observerOptions = { root, rootMargin, threshold }

  const { start: startInViewTimeout, stop: stopInViewTimeout } = useTimeoutFn(
    () => {
      onInView && onInView()
    },
    debounce
  )

  let cleanup = noop

  function initObserve() {
    observerRef.value = new IntersectionObserver(
      ([{ isIntersecting, intersectionRatio }]) => {
        const inView =
          isIntersecting !== undefined ? isIntersecting : intersectionRatio > 0
        inView ? startInViewTimeout() : stopInViewTimeout()
      },
      observerOptions
    )

    observerRef.value.observe(unrefElement(target)! as HTMLElement)
  }

  function stop() {
    cleanup()
    stopInViewTimeout()
    stopWatch()
  }

  tryOnScopeDispose(stop)

  const stopWatch = watch(
    () => [unref(target)] as const,
    ([target]) => {
      if (!target) return
      cleanup()
      initObserve()
      cleanup = () => {
        observerRef.value?.disconnect()
        cleanup = noop
      }
    }
  )

  return {
    stop
  }
}
