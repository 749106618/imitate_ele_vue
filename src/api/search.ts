import { http } from './base.ts'
import type { ISearchResultList } from '@/types/home.d.ts'
export function fetchSearchData(key = '') {
  return http.get<ISearchResultList>(`home_search`, {
    params: { _label_like: key },
  })
}
