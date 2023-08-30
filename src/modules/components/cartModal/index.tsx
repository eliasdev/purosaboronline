import React, { useState, useEffect } from 'react';
import { Modal, Button, List, ListItem, ListItemText, Typography, Box } from '@mui/material';

interface CartItem {
  name: string;
  price: number;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, cartItems }) => {
  const [cartTotal, setCartTotal] = useState(0);

  // Calculate the total price
  useEffect(() => {
    let total = 0;
    cartItems.forEach(item => {
      total += item.price;
    });
    setCartTotal(total);
  }, [cartItems]);

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          background: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white background
        }}
      >
        <div className="modal-content">
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
          <Button
            variant="contained"
            color="primary"
            onClick={onClose}
            style={{ marginTop: '10px' }}
          >
            Close
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default CartModal;
