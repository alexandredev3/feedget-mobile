import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://10.0.1.7:3333'
})