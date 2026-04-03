import axios from 'axios';
import { LogQueryParams } from '../types/logQueryParams';



export const logEventApi = {
  findAll: async (params: LogQueryParams) => {
    const { data } = await axios.get('/api/logs', { params });
    return data;
  },
  
  groupByLevel: async () => {
    const { data } = await axios.get('/api/logs/count-level');
    return data;
  }
};