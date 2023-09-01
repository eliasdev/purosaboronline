import React, { useState, useEffect } from 'react';
import { Modal, Button, List, ListItem, ListItemText, Typography, TextField, Paper, Backdrop } from '@mui/material';
import './index.css';
import { isMobile } from 'react-device-detect';

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
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, onEmptyCart, cartItems }) => {

  const [backdropClicked, setBackdropClicked] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    let total = 0;
    cartItems.forEach(item => {
      total += item.price * item.quantity; // Calculate total price with quantity
    });
    setCartTotal(total);
    setShowConfirmation(false);
  }, [cartItems]);

  const handleConfirmCheckout = () => {
    sendMessage();
    setShowConfirmation(true);
  };

  const sendMessage = () => {
    const formattedOrderText = `Cliente: ${customerName} %0aNumero de telefono: ${phoneNumber}%0a
    %0aConfirmación de la orden:%0a%0a${cartItems.map(item => `${item.name} - ₡${item.price}`).join('%0a')}%0a%0aTotal: ₡${cartTotal.toFixed(0)} colones%0a%0a*NO OLVIDES ENVIAR ESTE MENSAJE*`;
    window.open(( 'https://wa.me/50685194028?text=' + formattedOrderText ),'_blank'); // Display the order details as an alert
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div>
        <Backdrop open={isOpen} onClick={onClose} style={{ zIndex: 9999 }} />
        <div className="modal-overlay">
          <div className="modal-content" style={{width:isMobile?"90%":"40%"}}>

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
                        primary={`${item.name} x${item.quantity} ${'🍔'.repeat(item.quantity)}`} // Display the quantity
                        secondary={`$${item.price}`}
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
                label="Ingresa acá tú número de teléfono"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                fullWidth
                margin="normal"
              />
              <div className="button-group">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleConfirmCheckout}
                  sx={{ mr: '10px', width: '59%' }}
                >
                  Ordenar ahora! 🍔
                </Button>
                <Button
                  sx={{ width: '37%' }}
                  variant="contained"
                  color="primary"
                  onClick={onClose}
                >
                  Cerrar
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
                  {cartItems.map((item, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={`${item.name} x${item.quantity}`} // Display the quantity
                        secondary={`₡${item.price}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
              <Typography fontSize={"1.5em"} variant="subtitle1" gutterBottom paddingTop={2} paddingBottom={2} fontWeight={"bold"}>
                Total: ₡{cartTotal.toFixed(0)} colones
              </Typography>
              <div className="button-group">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={onEmptyCart}
                  sx={{ mr: '10px', width:'43%' }}
                >
                  Vaciar Carrito
                </Button>
                <Button
                  sx={{width:'52%'}}
                  variant="contained"
                  color="primary"
                  onClick={handleConfirmCheckout}
                >
                  Confirmar Orden ✅
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
