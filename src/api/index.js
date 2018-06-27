import {topicsResouce} from './resource'

export const fetchTopics = (page, size) => {
  const params = {
    'agg[size]': -1,
    'page[size]': size,
    'page[number]': page,
  }
  return topicsResouce('get', undefined, {params})
}







