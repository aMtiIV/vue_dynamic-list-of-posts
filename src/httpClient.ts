import axios from 'axios'
import type { Post, PostPostBody } from './types/types'

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

const httpClient = axios.create({
  baseURL: 'https://mate.academy/students-api',
});

export const getPosts = (userId: number): Promise<Post[]> => {
  return wait(2000)
    .then(() => httpClient.get(`/posts?userId=${userId}`))
    .then((response) => response.data)
}

export const postPost = (post: PostPostBody): Promise<Post> => {
  return wait(2000)
    .then(() => httpClient.post('/posts', post))
    .then((response) => response.data)
}
