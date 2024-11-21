import { rAF, cancelRAF } from '@/utils/raf'
import { ref, computed } from 'vue'

type CurrentTime = {
  days: number
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
  total: number
}

type UseCountDownOptions = {
  time: number
  millisecond?: boolean
  onChange?: (current: CurrentTime) => void
  onFinish?: () => void
}
const parseTime = (time: number): CurrentTime => {
  const days = Math.floor(time / 1000 / 60 / 60 / 24)
  const hours = Math.floor((time / 1000 / 60 / 60) % 24)
  const minutes = Math.floor((time / 1000 / 60) % 60)
  const seconds = Math.floor((time / 1000) % 60)
  const milliseconds = Math.floor(time % 1000)
  const total = time
  return {
    days,
    hours,
    minutes,
    seconds,
    milliseconds,
    total,
  }
}
const isSameSecond = (time1: number, time2: number) => {
  return Math.floor(time1 / 1000) === Math.floor(time2 / 1000)
}
export function useCountDown(options: UseCountDownOptions) {
  let rafId: number
  let endTime: number = 0
  const remainTime = ref(options.time)
  const current = computed(() => parseTime(remainTime.value))
  let counting: boolean = false
  const start = () => {
    if (!counting) {
      endTime = Date.now() + remainTime.value
      counting = true
      tick()
    }
  }
  const tick = () => {
    if (options.millisecond) {
      microTick()
    } else {
      macroTick()
    }
  }
  const getCurrentRemain = () => Math.max(endTime - Date.now(), 0)
  const setRemain = (value: number) => {
    remainTime.value = value
    options.onChange?.(current.value)

    if (value === 0) {
      pause()
      options.onFinish?.()
    }
  }

  const microTick = () => {
    rafId = rAF(() => {
      if (counting) {
        // 剩余时间
        const remainRemain = getCurrentRemain()
        setRemain(remainRemain)

        if (remainTime.value > 0) {
          microTick()
        }
      }
    })
  }

  const macroTick = () => {
    rafId = rAF(() => {
      if (counting) {
        const remainRemain = getCurrentRemain()
        if (
          !isSameSecond(remainRemain, remainTime.value) ||
          remainRemain === 0
        ) {
          setRemain(remainRemain)
        }
        if (remainTime.value > 0) {
          macroTick()
        }
      }
    })
  }
  const pause = () => {
    counting = false
    cancelRAF(rafId)
  }
  const reset = (totalTime = options.time) => {
    pause()
    remainTime.value = totalTime
  }
  return {
    start,
    pause,
    reset,
    current,
  }
}
