import React, { useState, useEffect } from 'react';
import { Modal, Button, List, ListItem, ListItemText, Typography, TextField, Paper, Backdrop } from '@mui/material';
import './index.css';

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
    setShowConfirmation(true);
  };

  const sendMessage = () => {
    const formattedOrderText = `Cliente: ${customerName} %0aNumero de telefono: ${phoneNumber}%0a
    %0aConfirmación de la orden:%0a%0a${cartItems.map(item => `${item.name} - $${item.price}`).join('%0a')}%0a%0aTotal: ₡${cartTotal.toFixed(0)} colones`;
    window.open(( 'https://wa.me/50685194028?text=' + formattedOrderText ),'_blank'); // Display the order details as an alert
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
  <div>
    <Backdrop open={isOpen} onClick={onClose} style={{ zIndex: 9999 }} />
    <div className="modal-overlay">
      <div className="modal-content">

          {showConfirmation ? (
            <div>
              <Typography variant="h6" gutterBottom>
                Confirm Checkout
              </Typography>
              <Typography variant="body1" gutterBottom>
                Items in Cart:
              </Typography>
              <Paper style={{ maxHeight: '300px', overflowY: 'auto' }}>
                <List>
                  {cartItems.map((item, index) => (
                    <ListItem style={{ height: '50px' }} key={index}>
                      <ListItemText
                        primary={`${item.name} x${item.quantity}`} // Display the quantity
                        secondary={`$${item.price}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
              <Typography variant="body1" gutterBottom>
                Total: ${cartTotal.toFixed(2)}
              </Typography>
              <TextField
                label="Customer Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                fullWidth
                margin="normal"
              />
              
              <Button
                variant="contained"
                color="primary"
                onClick={onClose}
              >
                Close
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={sendMessage}
              >
                Ordenar ahora! 🍔
              </Button>
            </div>
          ) : (
            <div>
              <Typography variant="h5" gutterBottom>
                Shopping Cart
              </Typography>
              <Paper style={{ maxHeight: '200px', overflowY: 'auto' }}>
                <List>
                  {cartItems.map((item, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={`${item.name} x${item.quantity}`} // Display the quantity
                        secondary={`$${item.price}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
              <Typography variant="subtitle1" gutterBottom>
                Total: ${cartTotal.toFixed(2)}
              </Typography>
              <div className="button-group">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={onEmptyCart}
                  style={{ marginRight: '10px' }}
                >
                  Empty Cart
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleConfirmCheckout}
                >
                  Confirm Order
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={onClose}
                >
                  Close
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
