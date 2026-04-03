import { apiClient } from './api'; // ścieżka do Twojego klienta
import { LogQueryParams } from '../../types/logQueryParams';
import { useQuery } from '@tanstack/react-query';

// w teorii w przyszłości za pomocą nx przenieść do lib
export const useLogs = (params: LogQueryParams) => {
  return useQuery({
    queryKey: ['logs', params],
    queryFn: async () => {
      const { data } = await apiClient.get('/log-event/search', {
        params: {
          ...params,
          page: (params.page || 0) + 1,
        },
      });
      return data;
    },
    placeholderData: (previousData) => previousData,
  });
};
