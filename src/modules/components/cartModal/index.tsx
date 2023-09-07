import React, { useState, useEffect, useMemo } from 'react';
import { Modal, Button, List, ListItem, ListItemText, Typography, TextField, Paper, Backdrop } from '@mui/material';
import './index.css';
import { isMobile } from 'react-device-detect';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import Tag from "../tag";

interface CartItem {
  name: string;
  price: number;
  quantity: number; // Add the quantity attribute
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEmptyCart: () => void;
  cartItems: CartItem[];
  index: number;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, onEmptyCart, cartItems, index }) => {

  const [customerName, setCustomerName] = useState('');
  const [currentInfo, setCurrentInfo] = useState(cartItems);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [renderToggle, setRenderToggle] = useState(false);
  console.log("index: " + index);
  useEffect(() => {
    if (!isOpen) {
      return;
    }
    setShowConfirmation(false);
    setCurrentInfo(cartItems);
  }, [isOpen, currentInfo, renderToggle]);


  const handleTagClick = (label: string, price: number, enabled: boolean, pIndex: number) => {
    const _data = cartItems;
    index = pIndex;
    console.log("the index:", index );
    console.log("new index:", pIndex );
    if (_data[index]?.price) {
      _data[index].price = ( !enabled? ( _data[index].price + price ) : ( _data[index].price - price ) );
      setCurrentInfo(_data);
      //console.log( currentInfo );
      
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
                <Typography variant="h5" gutterBottom>
                  Confirma tu orden en Puro Sabor ✅
                </Typography>
                <Paper style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  <List>
                    {cartItems.map((item, index) => (
                      <ListItem style={{ height: '50px' }} key={index}>
                        <ListItemText
                          disableTypography
                          sx={{ fontSize: { lg: "1.2em", xs: "1em" } }}
                          primary={`${item.name} x${item.quantity}${'-🍔'.repeat(item.quantity)}`}
                          secondary={` | ₡${item.price}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
                <Typography fontSize="1.5em" variant="subtitle1" gutterBottom paddingTop={2} fontWeight="bold">
                  Total: ₡{123} colones
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
                <Typography variant="h5" gutterBottom>
                  Carrito de Compras 🛒
                </Typography>
                <Paper style={{ maxHeight: '200px', overflowY: 'auto' }}>
                  <List>
                    {currentInfo.map((item, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={`${item.name} x${item.quantity}`}
                          secondary={`₡${item.price}`}
                        />
                        <Tag label="sin cebolla" price={0}  action={(label, price, isEnabled) => handleTagClick(label, price, isEnabled, index)} isEnabled={false} />
                        <Tag label="doble queso" price={300} action={(label, price, isEnabled) => handleTagClick(label, price, isEnabled, index)} isEnabled={false} />
                        <Tag label="doble torta" price={1000} action={(label, price, isEnabled) => handleTagClick(label, price, isEnabled, index)} isEnabled={false} />
                        <Tag label="peninillos extra" price={300} action={(label, price, isEnabled) => handleTagClick(label, price, isEnabled, index)} isEnabled={false} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
                <Typography variant="subtitle1" gutterBottom paddingTop={2} paddingBottom={2} fontWeight="bold">
                  Total: ₡{123} colones
                </Typography>
                <div className="button-group">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={onEmptyCart}
                    sx={{ mr: '10px', width: '43%' }}
                  >
                    Vaciar Carrito
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
