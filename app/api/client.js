import {create} from 'apisauce';

const apiClient = create({
  baseURL: 'http://192.168.1.5:8000',
});

export default apiClient;
