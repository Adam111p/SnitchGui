export interface LogQueryParams {
  level?: string;
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  dateFrom?: string;
  serviceName?: string;
  dateTo?: string;
}