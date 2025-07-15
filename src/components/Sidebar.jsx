import { Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { NavLink } from 'react-router-dom';

const drawerWidth = 240;

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', marginTop: 8 },
      }}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton component={NavLink} to="/profile" activeclassname="Mui-selected">
            <ListItemText primary="Профиль" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={NavLink} to="/orders" activeclassname="Mui-selected">
            <ListItemText primary="Заказы" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
