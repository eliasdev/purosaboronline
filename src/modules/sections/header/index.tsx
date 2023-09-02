import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { WindowOutlined } from '@mui/icons-material';
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
    const downloadMenu = () => {
      window.open('https://purosaborps.com/menups.pdf', '_blank');
      closeMenu();
    };
    const contactUs = () => {
      window.open('https://wa.me/50685194028', '_blank');
      closeMenu();
    };
  
    return (
      <AppBar position="static" sx={{ backgroundColor: '#FF0000' }}>
        <Toolbar>
          <Typography align='left' variant="h6" component="div" sx={{ flexGrow: 1 }}>
          🍔 Puro Sabor | Comida Artesanal
          </Typography>
          { isMobile ? (
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
                <MenuItem onClick={downloadMenu}>Descargar Menú 🍔</MenuItem>
                <MenuItem onClick={contactUs}>Contacto 📲</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <MenuItem onClick={downloadMenu}>Descargar Menú 🍔</MenuItem>
              <MenuItem onClick={contactUs}>Contacto 📲</MenuItem>
            </>
          )}
        </Toolbar>
      </AppBar>
    );
  }
  
  export default Header;
  