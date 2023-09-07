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
import Footer from '../../modules/sections/footer';
import Header from '../../modules/sections/header';
import CartModal from '../../modules/components/cartModal';
import { CartItem } from '../../types/index'; // Import the CartItem type
import TextField from '@mui/material/TextField';
import './index.css';
import { isMobile } from 'react-device-detect';
import { Divider } from '@mui/material';
import { burgerData } from './data';

const defaultTheme = createTheme();

export default function Menu() {
  const shuffleArray = (array: any[]) => {
    // Group items by category
    const groupedByCategory: { [key: string]: any[] } = {};
    array.forEach((item) => {
      const category = item.category || 'Uncategorized'; // Use 'Uncategorized' as the default category if none is provided
      if (!groupedByCategory[category]) {
        groupedByCategory[category] = [];
      }
      groupedByCategory[category].push(item);
    });

    // Shuffle each category individually
    const shuffledArray: any[] = [];
    Object.values(groupedByCategory).forEach((categoryItems) => {
      for (let i = categoryItems.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [categoryItems[i], categoryItems[j]] = [
          categoryItems[j],
          categoryItems[i],
        ];
      }
      shuffledArray.push(...categoryItems);
    });

    return shuffledArray;
  };

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [randomBurgerData, setRandomBurgerData] = useState<CartItem[]>(
    shuffleArray(burgerData.map((item) => ({ ...item, quantity: 1 })))
  );

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  const addToCart = (item: CartItem, index: number) => {
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.name === item.name
    );
    //this needs to be uncommented at the end
    //if ( ( item.category != "dish" ) && existingItemIndex !== -1 ) {
    // Item already exists, increase its quantity
    //const updatedCartItems = [...cartItems];
    //updatedCartItems[existingItemIndex].quantity += 1;
    //setCartItems(updatedCartItems);
    //} else {
    // Item doesn't exist, add it to the cart
    setCartItems((prevCartItems) => [...prevCartItems, item]);
    //}
    handleCartToggle();
  };

  const handleEmptyCart = () => {
    setCartItems([]);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Header />
      <CartModal
        isOpen={isCartOpen}
        onEmptyCart={handleEmptyCart}
        onClose={handleCartToggle}
        cartItems={cartItems}
      />

      <main>
        <Container
          maxWidth="xl"
          sx={{
            bgcolor: 'background.paper',
            pt: 3,
            pb: { lg: 5, sm: 3 },
          }}
          disableGutters
        >
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
            sx={{ fontSize: { lg: '2.3em', xs: '1.5em' }, lineHeight: 1.5 }}
          >
            Ordena en Línea 📲{isMobile ? <br /> : ''} Puro Sabor 🍔 Grecia, CR
            📍
          </Typography>
          <Divider />
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
            sx={{
              fontSize: { lg: '1.3em', xs: '0.8em' },
              paddingLeft: 6,
              paddingRight: 6,
              pt: { lg: 4, xs: 2 },
              pb: { lg: 0, xs: 3 },
            }}
          >
            Elige tus hamburguesas favoritas, selecciona la cantidad y haz clic
            en el botón 'Agregar al carrito' para realizar tu pedido en línea.
            <br /> Todas las hamburguesas incluyen una orden de tus papas
            favoritas 🍟
          </Typography>
        </Container>

        <Container sx={{ py: 8 }} maxWidth="lg">
          <Grid sx={{ margin: '0 auto' }} container spacing={4}>
            {randomBurgerData.map((burger, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: '100%',
                    width: '85%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      pt: '95%',
                    }}
                    image={burger.img}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {burger.name}
                    </Typography>
                    <Typography>Precio: ₡{burger.price}</Typography>
                    <TextField
                      disabled={!burger.available}
                      label="Cantidad"
                      type="number"
                      inputProps={{ min: 1 }}
                      value={burger.quantity}
                      onChange={(e) => {
                        const newQuantity = parseInt(e.target.value);
                        const updatedBurgerData = [...randomBurgerData];
                        updatedBurgerData[index].quantity = newQuantity;
                        setRandomBurgerData(updatedBurgerData);
                      }}
                      fullWidth
                      margin="normal"
                    />
                  </CardContent>
                  <CardActions>
                    {burger.available ? (
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={() => addToCart(burger, index)}
                      >
                        Agregar al carrito
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        disabled
                        fullWidth
                        onClick={() => alert('Muy Pronto!')}
                      >
                        Muy Pronto!
                      </Button>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <button onClick={() => handleCartToggle()}>asdasd</button>
        </Container>
      </main>
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
