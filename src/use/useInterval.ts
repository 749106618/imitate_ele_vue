import { onUnmounted } from 'vue'

export function useInterval(callback: () => void, delay: number | undefined) {
  const interval = setInterval(callback, delay)
  onUnmounted(() => clearInterval(interval))
}
