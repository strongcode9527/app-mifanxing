import {topicsResource} from './resource'

export const fetchTopics = (page, size, forumId) => {
  const params = {
    'agg[size]': -1,
    'page[size]': size,
    'page[number]': page,
    'filter[forumId]': forumId,
  }
  return topicsResource('get', 'search', {params})
}

export const fetchTopicDetail = (id) => {
  return topicsResource('get', id)
}





