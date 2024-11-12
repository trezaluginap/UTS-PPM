// src/api/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://6721df3f98bbb4d93caa1210.mockapi.io/',
});

export default apiClient;
