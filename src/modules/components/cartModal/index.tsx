import React, { useState, useEffect, useMemo } from 'react';
import { Modal, Button, List, ListItem, ListItemText, Typography, TextField, Paper, Backdrop } from '@mui/material';
import './index.css';
import { isMobile } from 'react-device-detect';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import Tag from "../tag";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';

interface CartItem {
  name: string;
  price: number;
  quantity: number; // Add the quantity attribute
  category: string;
  extras: any[];
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEmptyCart: () => void;
  cartItems: CartItem[];
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, onEmptyCart, cartItems }) => {

  const [customerName, setCustomerName] = useState('');
  const [currentOrder, setCurrentOrder] = useState(cartItems);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [renderToggle, setRenderToggle] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);
  useEffect(() => {
    if (!isOpen) {
      return;
    }
    let total = 0;
    cartItems.forEach(item => {
      total += item.price * item.quantity; // Calculate total price with quantity
    });
    setCartTotal(total);
    setShowConfirmation(false);
    setCurrentOrder(cartItems);
  }, [isOpen, currentOrder, renderToggle]);


  const handleTagClick = (label: string, price: number, enabled: boolean, pIndex: number) => {
    const _data = [...cartItems]; // Clone the cartItems array
    console.log("cart index:", pIndex );
    console.log("enabled: ", enabled );
    console.log( _data[pIndex]?.name );
    if (_data[pIndex]?.price) {
      if (!enabled) {
        // Create a new 'extras' array for the specific item at the given index
        _data[pIndex] = {
          ..._data[pIndex],
          extras: [...(_data[pIndex].extras || []), { label, price }],
          price: _data[pIndex].price + price,
        };
      } else {
        // Remove the extra with the given label from the 'extras' array
        _data[pIndex] = {
          ..._data[pIndex],
          extras: (_data[pIndex].extras || []).filter(extra => extra.label !== label),
          price: _data[pIndex].price - price,
        };
      }

      setCurrentOrder(_data);
      console.log( currentOrder );
    }

    setRenderToggle(!renderToggle);
  };

  const handleConfirmCheckout = () => {
    if (cartItems.length > 0) {
      setShowConfirmation(true);
    } else {
      toast.error('🍔🍔 Debes agregar productos a la orden, Patricio!', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const handleConfirmOrder = () => {
    sendMessage();
  };

  const removeFromCart = ( pIndex: number ) => {
    currentOrder.splice( pIndex, 1 );
    setRenderToggle(!renderToggle);
  }

  const sendMessage = () => {
    if (customerName && phoneNumber) {
      const formattedOrderText = `Cliente: ${customerName} %0aNúmero de teléfono: ${phoneNumber}%0a
    %0aConfirmación de la orden:%0a%0a${cartItems.map(item => `${item.name} x${item.quantity} - ₡${item.price}`).join('%0a')}%0a%0aTotal: ₡${123} colones%0a%0a*NO OLVIDES ENVIAR ESTE MENSAJE*`;
      window.open(('https://wa.me/50685194028?text=' + formattedOrderText), '_blank');
    } else {
      toast.error('Ingresa tu información personal para completar tu orden.', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div>
        <Backdrop open={isOpen} onClick={onClose} style={{ zIndex: 9999 }} />
        <div className="modal-overlay">
          <div className="modal-content" style={{ width: isMobile ? "90%" : "60%" }}>

            {showConfirmation ? (
              <div>
                <Typography sx={{ fontSize: { xs:"1em", lg: "2em" }}} variant="h5" gutterBottom>
                  Confirma tu orden en Puro Sabor ✅
                </Typography>
                <Paper style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  <List>
                    {cartItems.map((item, index) => (
                      <ListItem style={{ height: '50px' }} key={index}>
                        <ListItemText
                          disableTypography
                          sx={{ fontSize: { lg: "1.2em", xs: "1em" } }}
                          primary={`${item.name} x${item.quantity}${( ( item.category == "dish" )? '-🍔': ( item.category == "beverage"? '🥤' : '' ) ).repeat(item.quantity)}`}
                          secondary={` | ₡${item.price}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
                <Typography fontSize="1.5em" variant="subtitle1" gutterBottom paddingTop={2} fontWeight="bold">
                  Total: ₡{cartTotal.toFixed(0)} colones
                </Typography>
                <TextField
                  label="Ingresa tu nombre completo"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Ingresa acá tu número de teléfono"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  fullWidth
                  margin="normal"
                  sx={{ pb: 2 }}
                />
                <div className="button-group">
                  <Button
                    sx={{ mr: '10px', width: { lg: '37%', xs: '33%' } }}
                    variant="contained"
                    color="primary"
                    onClick={onClose}
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleConfirmOrder}
                    sx={{ width: { lg: '59%', xs: '62%' } }}
                  >
                    Ordenar ahora! 🍔
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <Typography sx={{ fontSize: { xs:"1em", lg: "2em" }}} variant="h5" gutterBottom>
                  Carrito de Compras 🛒
                </Typography>
                <Paper style={{ maxHeight: '200px', overflowY: 'auto' }}>
                  <List>
                    {currentOrder.map((item, index) => (
                      <ListItem key={index}>
                        <Grid container spacing={2} alignItems="center">
                          <Grid item xs={12} lg={(item.category == "dish")? 1.7 : 11 }>
                            <ListItemText
                              primary={`${item.name} x${item.quantity}`}
                              secondary={`₡${item.price}`}
                            />
                          </Grid>
                          <Grid sx={{display:(item.category == "dish")? "" : "none" }} item xs={12} lg={9}>
                            <Grid container spacing={1}>
                              <Grid item xs={12} lg={2.1}>
                                <Tag
                                  label="sin cebolla"
                                  price={0}
                                  action={(label, price, isEnabled) =>
                                    handleTagClick(label, price, isEnabled, index)
                                  }
                                  isEnabled={false}
                                />
                              </Grid>
                              <Grid item xs={12} lg={3.2}>
                                <Tag
                                  label="doble queso"
                                  price={300}
                                  action={(label, price, isEnabled) =>
                                    handleTagClick(label, price, isEnabled, index)
                                  }
                                  isEnabled={false}
                                />
                              </Grid>
                              <Grid item xs={12} lg={3.2}>
                                <Tag
                                  label="doble torta"
                                  price={1000}
                                  action={(label, price, isEnabled) =>
                                    handleTagClick(label, price, isEnabled, index)
                                  }
                                  isEnabled={false}
                                />
                              </Grid>
                              <Grid item xs={12} lg={3.5}>
                                <Tag
                                  label="pepinillos extra"
                                  price={300}
                                  action={(label, price, isEnabled) =>
                                    handleTagClick(label, price, isEnabled, index)
                                  }
                                  isEnabled={false}
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12} lg={1}>
                            <IconButton
                              color="secondary"
                              aria-label="Delete"
                              onClick={() => removeFromCart(index)}
                            >
                              {isMobile? "Eliminar" : ""} <DeleteIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </ListItem>
                    ))}
                  </List>
                </Paper>
                <Typography variant="subtitle1" gutterBottom paddingTop={2} paddingBottom={2} fontWeight="bold">
                  Total: ₡{cartTotal.toFixed(0)} colones
                </Typography>
                <div className="button-group">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={onClose}
                    sx={{ mr: '10px', width: '43%' }}
                  >
                    Volver al Menú
                  </Button>
                  <Button
                    sx={{ width: '52%' }}
                    variant="contained"
                    color="primary"
                    onClick={handleConfirmCheckout}
                  >
                    Completar Orden ✅
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CartModal;
