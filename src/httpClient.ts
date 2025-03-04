import axios from 'axios';

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

const httpClient = axios.create({
  baseURL: 'https://mate.academy/students-api',
});

export const getPosts = (userId: number) => {
  return wait(2000).then(() => httpClient.get(`/posts?userId=${userId}`)).then(response => response.data);
}
