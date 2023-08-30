import React, { useState, useEffect } from 'react';
import { Modal, Button, List, ListItem, ListItemText, Typography, TextField } from '@mui/material';
import './index.css';

interface CartItem {
  name: string;
  price: number;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEmptyCart: () => void;
  cartItems: CartItem[];
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, onEmptyCart, cartItems }) => {
  const [cartTotal, setCartTotal] = useState(0);
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    let total = 0;
    cartItems.forEach(item => {
      total += item.price;
    });
    setCartTotal(total);
  }, [cartItems]);

  const handleConfirmCheckout = () => {
    setShowConfirmation(true);
  };

  const sendMessage = () => {
    const formattedOrderText = `
      Customer Name: ${customerName}
      Phone Number: ${phoneNumber}
      Email: ${email}
      
      Items in Cart:
      ${cartItems.map(item => `${item.name} - $${item.price}`).join('\n')}
      
      Total: $${cartTotal.toFixed(2)}
    `;
    alert(formattedOrderText); // Display the order details as an alert
  };
  

  return (
    <Modal open={isOpen} onClose={onClose}>
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
              <List>
                {cartItems.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={item.name} secondary={`$${item.price}`} />
                  </ListItem>
                ))}
              </List>
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
              <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                Confirm Now
              </Button>
            </div>
          ) : (
            <div>
              <Typography variant="h5" gutterBottom>
                Shopping Cart
              </Typography>
              <List>
                {cartItems.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={item.name} secondary={`$${item.price}`} />
                  </ListItem>
                ))}
              </List>
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
    </Modal>
  );
};

export default CartModal;
