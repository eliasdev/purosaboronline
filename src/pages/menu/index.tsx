import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from '../../modules/sections/footer'
import Header from '../../modules/sections/header';
import CartModal from '../../modules/components/cartModal';
import { CartItem } from '../../types/index'; // Import the CartItem type
import TextField from '@mui/material/TextField';
import "./index.css";
import ImgBigOne from "../../assets/menu/bigone.png";
import ImgChicago from "../../assets/menu/chicago.png";
import ImgPulledPork from "../../assets/menu/pulled.png";
import ImgMexicana from "../../assets/menu/mexicana.png";
import ImgItaliana from "../../assets/menu/italiana.png";
import ImgSpecial from "../../assets/menu/special.png";
import ImgSweet from "../../assets/menu/sweet.png";
import ImgNewYork from "../../assets/menu/newyork.png";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const burgerData: CartItem[] = [
  { name: 'Special Taste', price: 5500, quantity:1, img: ImgSpecial },
  { name: 'Chicago', price: 5000, quantity:1, img: ImgChicago },
  { name: 'Pulled Pork', price: 5500, quantity:1, img: ImgPulledPork },
  { name: 'Big One', price: 5500, quantity:1, img: ImgBigOne },
  { name: 'New York', price: 5500, quantity:1, img: ImgNewYork },
  { name: 'Italiana', price: 5500, quantity:1, img: ImgItaliana },
  { name: 'Mexicana', price: 5500, quantity:1, img: ImgMexicana },
  { name: 'Sweet Explosion', price: 5500, quantity:1, img: ImgSweet }
  // Add more burgers...
];

export default function Menu() {

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [quantity, setQuantity] = useState(1); // Initialize with quantity 1
  
    const shuffleArray = (array: any[]) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };
    const randomBurgerData = shuffleArray([...burgerData]);
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
          maxWidth="xl"
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
              sx={{fontSize:{lg: '2.5em', xs: '0.8em'}}}
            >
              Ordena en Línea 📲 Puro Sabor 🍔 Grecia, CR 📍
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
            Elige tus hamburguesas favoritas, selecciona la cantidad y haz clic en el botón 'Agregar al carrito' para realizar tu pedido en línea.
            </Typography>
        </Container>

        <Container sx={{ py: 8 }} maxWidth="md">
          {/* Cards */}
          <Grid container spacing={4}>
            {randomBurgerData.map((burger, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      pt: '90%',
                    }}
                    image={burger.img}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {burger.name}
                    </Typography>
                    <Typography>
                      Precio: ${burger.price}
                    </Typography>
                    <TextField
                      label="Cantidad"
                      type="number"
                      inputProps={{ min: 1 }} // Ensure minimum quantity is 1
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                      fullWidth
                      margin="normal"
                    />
                  </CardContent>
                  <CardActions>
                    <Button variant="contained" fullWidth onClick={() => addToCart(burger, quantity)}>Agrear al carrito</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>


      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Footer />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}