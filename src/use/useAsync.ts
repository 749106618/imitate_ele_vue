import { ref } from 'vue'

export function useAsync<T>(
  asyncFn: () => Promise<T>,
  initValue: T,
  immediate = true,
) {
  const pending = ref(false)
  const data = ref(initValue)
  const error = ref(null)
  const run = async () => {
    pending.value = true
    error.value = null
    try {
      data.value = await asyncFn()
    } catch (err: any) {
      error.value = err
    } finally {
      pending.value = false
    }
  }
  if (immediate) {
    run()
  }
  return {
    pending,
    data,
    error,
    run,
  }
}
