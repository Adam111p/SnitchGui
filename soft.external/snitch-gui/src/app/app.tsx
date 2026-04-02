import {
  Toolbar,
  Typography,
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Search, History, Settings } from '@mui/icons-material';
import { Link, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { AppBar, DrawerHeader, drawerWidth, Main } from './customMain';

export function App() {
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* 1. BELKA GÓRNA - AppBar */}
      <AppBar
        position="fixed"
        sx={{
          // KLUCZ: zIndex musi być wyższy niż Drawer, aby belka była NAD nim
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Box sx={{ position: 'absolute', left: 16 }}>
            <Box>
              <IconButton
                color="inherit"
                onClick={open ? handleDrawerClose : handleDrawerOpen}
                sx={{
                  transition: (theme) =>
                    theme.transitions.create('transform', {
                      duration: theme.transitions.duration.shorter,
                    }),
                  transform: open ? 'rotate(-180deg)' : 'rotate(0deg)',
                }}
              >
                {open ? <ChevronRightIcon /> : <MenuIcon />}
              </IconButton>
            </Box>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
          >
            Snitch Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>

      {/* 2. MENU BOCZNE - Drawer */}
      <Drawer variant="persistent" anchor="left" open={open}>
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/logs" onClick={() => setOpen(false)}>
                <ListItemIcon>
                  <Search />
                </ListItemIcon>
                <ListItemText primary="Wyszukiwarka logów" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/history" onClick={() => setOpen(false)}>
                <ListItemIcon>
                  <History />
                </ListItemIcon>
                <ListItemText primary="Historia" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Main>

          {/* Odstęp pod treścią, żeby nie chowała się pod belką */}
          <Toolbar />

          <Outlet />
 
      </Main>
    </Box>
  );
}
