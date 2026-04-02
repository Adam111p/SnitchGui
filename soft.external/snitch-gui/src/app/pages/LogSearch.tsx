import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Stack,
  TextField,
  MenuItem,
  Button,
  Typography,
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
  const [podName, setPodName] = useState('');
  const [dateFrom, setDateFrom] = useState<DateTime | null>(null);
  const [dateTo, setDateTo] = useState<DateTime | null>(null);

  // --- Stan Tabeli (Server-side) ---
  const [rows, setRows] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(false);
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
    { field: 'podName', headerName: 'Pod', width: 150 },
    { field: 'message', headerName: 'Wiadomość', flex: 1 },
  ];

  // --- Funkcja Pobierania Danych ---
  const fetchLogs = async () => {
    setLoading(true);
    try {
      // Tutaj wstawisz swój axios.get('/api/logs', { params: ... })
      console.log('Pobieram dane dla:', {
        level,
        podName,
        dateFrom: dateFrom?.toISO(),
        dateTo: dateTo?.toISO(),
        page: paginationModel.page,
        pageSize: paginationModel.pageSize,
        sort: sortModel[0],
      });

      // Symulacja API
      // const response = await api.getLogs({...});
      // setRows(response.data);
      // setTotalRows(response.total);
    } finally {
      setLoading(false);
    }
  };

  // Trigger przy zmianie strony lub sortowania
  useEffect(() => {
    fetchLogs();
  }, [paginationModel, sortModel]);
  const { showNotification } = useNotification();
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
              label="Pod Name"
              variant="outlined"
              size="small"
              value={podName}
              onChange={(e) => setPodName(e.target.value)}
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

            <Button
              variant="contained"
              onClick={() => {
                setPaginationModel((prev) => ({ ...prev, page: 0 })); // Reset do 1 strony przy nowym szukaniu
                fetchLogs();
                showNotification('Niec nie działa  koniec świata!', 'error');
              }}
            >
              Szukaj
            </Button>
          </Stack>
        </Paper>

        {/* Tabela MUI X */}
        <Paper sx={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            rowCount={totalRows}
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
