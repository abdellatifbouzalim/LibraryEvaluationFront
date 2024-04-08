import axios from 'axios';
import { BASE_URL } from '../core/constants';

export const UserInstance = axios.create({
  baseURL: `${BASE_URL}/users`,
});
export const BookInstance = axios.create({
    baseURL: `${BASE_URL}/books`
});
export const LoanInstance = axios.create({
    baseURL: `${BASE_URL}/loans`
});
export const ReviewInstance = axios.create({
    baseURL: `${BASE_URL}/reviews`
});

