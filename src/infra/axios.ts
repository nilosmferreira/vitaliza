import axios from 'axios';
import { parseCookies } from 'nookies';

const { 'vitaliza.token': token } = parseCookies();
export const api = axios.create();
if (token) {
  api.defaults.headers['Authorization'] = `Bearer ${token}`;
}
