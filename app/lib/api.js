import axios from 'axios';
import config from '../../config';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const api = (method, route, data, additionalHeaders = {}) => (
  axios({
    method,
    headers: { ...headers, ...additionalHeaders },
    baseURL: config.host,
    url: route,
    data,
  })
);

export default api;
