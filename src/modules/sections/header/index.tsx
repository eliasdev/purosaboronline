import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
// ... (previous imports)

function Header() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null); // Define the type for anchorEl
    const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const closeMenu = () => {
      setAnchorEl(null);
    };
  
    return (
      <AppBar position="static" sx={{ backgroundColor: '#FF0000' }}>
        <Toolbar>
          <Typography align='center' variant="h6" component="div" sx={{ flexGrow: 1 }}>
          🍔 Puro Sabor | Comida Artesanal
          </Typography>
          { /*isMobile ? (
            <>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={openMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={closeMenu}
              >
                <MenuItem onClick={closeMenu}>Menu</MenuItem>
                <MenuItem onClick={closeMenu}>Contacto</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <MenuItem>Menú</MenuItem>
              <MenuItem>Contacto</MenuItem>
            </>
          )*/}
        </Toolbar>
      </AppBar>
    );
  }
  
  export default Header;
  