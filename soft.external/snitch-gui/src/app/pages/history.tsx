import {
  Typography,
  Box,
  Paper,
  Card,
  CardContent,
  Stack,
  TextField,
  Alert,
  AlertTitle,
  Divider,
  Chip,
} from '@mui/material';
import { Memory, QuestionMark, Search, Event } from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function HistoryLog() {
  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto' }}>
      {/* Nagłówek z humorem */}
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
        <Memory sx={{ fontSize: 40, color: 'primary.main' }} />
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Historia (Której nie było?)
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            System Snitch próbuje odtworzyć Twoje kroki. Ty pewnie i tak nie
            pamiętasz.
          </Typography>
        </Box>
      </Stack>

      {/* Alert o amnezji */}
      <Alert severity="warning" variant="outlined" sx={{ mb: 4 }}>
        <AlertTitle>Wykryto lukę w pamięci operacyjnej</AlertTitle>
        Ostatnie 24 godziny są niejasne. Jeśli nie rozpoznajesz tych logów, to
        znaczy, że projekt idzie świetnie.
      </Alert>

      {/* Panel filtrów (Tu jest Twoje SD i Search) */}
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Filtr retrospekcji
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
            <DatePicker
              label="Wybierz datę (SD)"
              sx={{ flexGrow: 1 }}
              slotProps={{ textField: { fullWidth: true } }}
            />
            <TextField
              fullWidth
              label="Szukaj wspomnień..."
              InputProps={{
                startAdornment: (
                  <Search sx={{ mr: 1, color: 'action.active' }} />
                ),
              }}
            />
          </Stack>
        </Paper>
      </LocalizationProvider>

      {/* "Wspomnienia" (Logi) */}
      <Typography variant="overline" sx={{ display: 'block', mb: 2, ml: 1 }}>
        Znalezione fragmenty rzeczywistości:
      </Typography>

      <Stack spacing={2}>
        <MemoryLog
          time="12:45"
          title="Zjedzono obiad"
          desc="System odnotował spożycie pizzy. Nie pamiętasz tego, ale sos na klawiaturze sugeruje prawdę."
          tags={['Pizza', 'Evidence']}
        />
        <MemoryLog
          time="10:30"
          title="Commit: 'Fixing bugs'"
          desc="Napisałeś 200 linii kodu w Rust. Teraz patrzysz na nie i myślisz, że to elfickie runy."
          tags={['Code', 'Confusion']}
          color="secondary.main"
        />
        <MemoryLog
          time="09:15"
          title="Kolejna kawa"
          desc="To była trzecia kawa. Serce biło tak szybko, że logi zapisywały się dwa razy."
          tags={['Caffeine', 'Overclocking']}
        />
      </Stack>
    </Box>
  );
}

// Pomocniczy komponent do "logów"
function MemoryLog({ time, title, desc, tags, color = 'primary.main' }: any) {
  return (
    <Card
      variant="outlined"
      sx={{ borderLeft: `5px solid`, borderColor: color }}
    >
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Box>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {desc}
            </Typography>
          </Box>
          <Chip
            icon={<Event fontSize="small" />}
            label={time}
            size="small"
            variant="outlined"
          />
        </Stack>
        <Divider sx={{ my: 1.5 }} />
        <Stack direction="row" spacing={1}>
          {tags.map((tag: string) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              sx={{ fontSize: '0.7rem' }}
            />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
