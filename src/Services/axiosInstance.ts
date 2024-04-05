import axios from 'axios';
import { BASE_URL } from '../core/constants';

export const UserInstance = axios.create({
  baseURL: `${BASE_URL}/users`,
});
export const BookInstance = axios.create({
    baseURL: `${BASE_URL}/books`
  });
