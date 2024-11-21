import type { IHomeInfo } from '@/types'
import { http } from './base'

export const fetchHomePageData = () => {
  return http.get<IHomeInfo>('home_page')
}
