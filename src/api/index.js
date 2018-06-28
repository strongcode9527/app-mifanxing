import {topicsResource} from './resource'

export const fetchTopics = (page, size) => {
  const params = {
    'agg[size]': -1,
    'page[size]': size,
    'page[number]': page,
  }
  return topicsResource('get', 'search', {params})
}

export const fetchTopicDetail = (id) => {
  return topicsResource('get', id)
}





