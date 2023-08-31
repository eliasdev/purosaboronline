import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from '../../modules/sections/footer'
import Header from '../../modules/sections/header';
import CartModal from '../../modules/components/cartModal';
import { CartItem } from '../../types/index'; // Import the CartItem type
import TextField from '@mui/material/TextField';


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const burgerData: CartItem[] = [
  { name: 'Classic Burger', price: 10, quantity:0 },
  { name: 'Cheeseburger Deluxe', price: 12, quantity:0 },
  { name: 'Bacon BBQ Burger', price: 14, quantity:0 },
  // Add more burgers...
];

export default function Menu() {

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [quantity, setQuantity] = useState(1); // Initialize with quantity 1
  
    const handleCartToggle = () => {
        setIsCartOpen(!isCartOpen);
    };

    const addToCart = (item: CartItem, quantity: number) => {
      const newItem = { ...item, quantity }; // Include the quantity in the item
      setCartItems(prevCartItems => [...prevCartItems, newItem]);
      handleCartToggle();
    };
    
    const handleEmptyCart = () => {
      setCartItems([]); // Clear the cart items
    };

  return (

    
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Header/>
      <CartModal isOpen={isCartOpen} onEmptyCart={handleEmptyCart} onClose={handleCartToggle} cartItems={cartItems} />

      <main>
        {/* Hero unit */}
        <Container
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Album layout
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Something short and leading about the collection below—its contents,
              the creator, etc. Make it short and sweet, but not too short so folks
              don&apos;t simply skip over it entirely.
            </Typography>
        </Container>

        <Container sx={{ py: 8 }} maxWidth="md">
          {/* Cards */}
          <Grid container spacing={4}>
            {burgerData.map((burger, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      pt: '56.25%',
                    }}
                    image="https://source.unsplash.com/random?wallpapers"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {burger.name}
                    </Typography>
                    <Typography>
                      Price: ${burger.price}
                    </Typography>
                    <TextField
                      label="Quantity"
                      type="number"
                      inputProps={{ min: 1 }} // Ensure minimum quantity is 1
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                      fullWidth
                      margin="normal"
                    />
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => addToCart(burger, quantity)}>Add to Cart</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>


      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Footer />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}