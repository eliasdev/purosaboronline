import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, useMediaQuery, useTheme, Modal, Backdrop } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { WindowOutlined } from '@mui/icons-material';
// ... (previous imports)

function Header() {
    const theme = useTheme();
    const [isScheduleOpen, setIsScheduleOpen] = useState(false);
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

    const openSchedule = () => {
      setIsScheduleOpen(!isScheduleOpen);
    }
  
    return (
      <AppBar position="static" sx={{ backgroundColor: '#FF0000' }}>
        <Modal open={isScheduleOpen} onClose={() => setIsScheduleOpen(!isScheduleOpen)}>
          <div>
            <Backdrop open={isScheduleOpen} onClick={() => setIsScheduleOpen(!isScheduleOpen)} style={{ zIndex: 9999 }} />
              <div className="modal-overlay">
                <div
                  className="modal-content"
                  style={{ width: isMobile ? '90%' : '60%' }}
                >
                    <div>
                      <Typography
                        sx={{ fontSize: { xs: '1em', lg: '2em' }, textAlign: 'center' }}
                        variant="h5"
                        gutterBottom
                      >
                        Nuestro horario de trabajo es de<br/>Jueves, Viernes y Sábado 5PM a 9PM ✅
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
        </Modal>
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
                <MenuItem onClick={openSchedule}>Horario ⏰</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <MenuItem onClick={downloadMenu}>Descargar Menú 🍔</MenuItem>
              <MenuItem onClick={contactUs}>Contacto 📲</MenuItem>
              <MenuItem onClick={openSchedule}>Horario ⏰</MenuItem>
            </>
          )}
        </Toolbar>
      </AppBar>
    );
  }
  
  export default Header;
  