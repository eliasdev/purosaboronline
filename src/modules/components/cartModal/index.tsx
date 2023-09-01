import React, { useState, useEffect } from 'react';
import { Modal, Button, List, ListItem, ListItemText, Typography, TextField, Paper, Backdrop } from '@mui/material';
import './index.css';
import { isMobile } from 'react-device-detect';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

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
  }

  const sendMessage = () => {
    if(customerName && phoneNumber){
      const formattedOrderText = `Cliente: ${customerName} %0aNúmero de teléfono: ${phoneNumber}%0a
    %0aConfirmación de la orden:%0a%0a${cartItems.map(item => `${item.name} x${item.quantity} - ₡${item.price}`).join('%0a')}%0a%0aTotal: ₡${cartTotal.toFixed(0)} colones%0a%0a*NO OLVIDES ENVIAR ESTE MENSAJE*`;
    window.open(( 'https://wa.me/50685194028?text=' + formattedOrderText ),'_blank'); // Display the order details as an alert
    } else{
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
          <div className="modal-content" style={{width:!isMobile?"50%":"90%"}}>

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
                        sx={{fontSize:{lg:"1.2em",xs:"1em"}}}
                        primary={`${item.name} x${item.quantity}${'-🍔'.repeat(item.quantity)}`} // Display the quantity
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
                label="Ingresa acá tú número de teléfono"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                fullWidth
                margin="normal"
                sx={{pb:2}}
              />
              <div className="button-group">
                <Button
                  sx={{ mr: '10px', width: {lg:'37%',xs:'33%'} }}
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
                  sx={{ width: {lg:'59%',xs:'62%'} }}
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
