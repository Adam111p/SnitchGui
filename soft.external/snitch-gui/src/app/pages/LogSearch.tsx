import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Stack,
  TextField,
  MenuItem,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridSortModel,
  GridPaginationModel,
} from '@mui/x-data-grid';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { DateTime } from 'luxon';
import { useNotification } from '../context/NotificationContext';
import { useLogs } from '../lib/data-access/use-logs';

// Mapowanie z Twojego DTO / Enuma
enum LogLevel {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  DEBUG = 'DEBUG',
}

export default function LogSearch() {
  // --- Stan Filtrów ---
  const [level, setLevel] = useState<string>('');
  const [serviceName, setServiceName] = useState('');
  const [dateFrom, setDateFrom] = useState<DateTime | null>(null);
  const [dateTo, setDateTo] = useState<DateTime | null>(null);
  const { showNotification } = useNotification();
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  const [sortModel, setSortModel] = useState<GridSortModel>([
    { field: 'createdAt', sort: 'desc' },
  ]);

  // --- Definicja Kolumn ---
  const columns: GridColDef[] = [
    { field: 'createdAt', headerName: 'Data', width: 180 },
    { field: 'level', headerName: 'Level', width: 100 },
    { field: 'serviceName', headerName: 'Service', width: 150 },
    { field: 'podName', headerName: 'Pod', width: 150, sortable: false },
    { field: 'message', headerName: 'Wiadomość', flex: 1, sortable: false },
  ];
  const { data, isLoading, isError } = useLogs({
    page: paginationModel.page,
    pageSize: paginationModel.pageSize,
    sortBy: sortModel[0]?.field,
    level: level,
    serviceName: serviceName,
    dateFrom: dateFrom?.toISO() ?? undefined,
    dateTo: dateTo?.toISO() ?? undefined,

    sortOrder: sortModel[0]?.sort as 'asc' | 'desc',
  });
  useEffect(() => {
    if (isError) {
      showNotification('Błąd podczas ładowania logów', 'error');
    }
  }, [isError, showNotification]);
  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <Box sx={{ height: '100%', width: '100%' }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Wyszukiwarka Logów
        </Typography>

        {/* Sekcja Filtrów */}
        <Paper sx={{ p: 2, mb: 2 }}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={2}
            alignItems="center"
          >
            <TextField
              select
              label="Level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              sx={{ minWidth: 120 }}
              size="small"
            >
              <MenuItem value="">Wszystkie</MenuItem>
              {Object.values(LogLevel).map((l) => (
                <MenuItem key={l} value={l}>
                  {l}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Nazwa serwisu"
              variant="outlined"
              size="small"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
            />

            <DatePicker
              label="Od"
              value={dateFrom}
              onChange={(val) => setDateFrom(val)}
              slotProps={{ textField: { size: 'small' } }}
            />

            <DatePicker
              label="Do"
              value={dateTo}
              onChange={(val) => setDateTo(val)}
              slotProps={{ textField: { size: 'small' } }}
            />
          </Stack>
        </Paper>

        {/* Tabela MUI X */}
        <Paper sx={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={data?.items || []}
            columns={columns}
            loading={isLoading}
            rowCount={data?.total || 0}
            // Konfiguracja Server-side
            paginationMode="server"
            sortingMode="server"
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            sortModel={sortModel}
            onSortModelChange={setSortModel}
            pageSizeOptions={[10, 25, 50]}
            disableRowSelectionOnClick
            sx={{ border: 0 }}
          />
        </Paper>
      </Box>
    </LocalizationProvider>
  );
}
