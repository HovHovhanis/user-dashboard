import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useAuth } from '../hooks/useAuth';

export default function Header() {
  const { logout } = useAuth();

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Личный кабинет
        </Typography>
        <Button color="inherit" onClick={logout}>
          Выйти
        </Button>
      </Toolbar>
    </AppBar>
  );
}
