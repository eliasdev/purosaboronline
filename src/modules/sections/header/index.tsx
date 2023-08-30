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
      <AppBar position="static">
        <Toolbar>
          <Typography align='left' variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Your App Name
          </Typography>
          {isMobile ? (
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
                <MenuItem onClick={closeMenu}>Menu Item 1</MenuItem>
                <MenuItem onClick={closeMenu}>Menu Item 2</MenuItem>
                {/* Add more menu items */}
              </Menu>
            </>
          ) : (
            <>
              <MenuItem>Menu Item 1</MenuItem>
              <MenuItem>Menu Item 2</MenuItem>
              {/* Add more menu items */}
            </>
          )}
        </Toolbar>
      </AppBar>
    );
  }
  
  export default Header;
  