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
import "./index.css";
import ImgBigOne from '../../assets/menu/bigone.png';
import ImgChicago from '../../assets/menu/chicago.png';
import ImgPulledPork from '../../assets/menu/pulled.png';
import ImgMexicana from '../../assets/menu/mexicana.png';
import ImgItaliana from '../../assets/menu/italiana.png';
import ImgSpecial from '../../assets/menu/special.png';
import ImgSweet from '../../assets/menu/sweet.png';
import ImgNewYork from '../../assets/menu/newyork.png';
import ImgVeggie from '../../assets/menu/veggie.png';
import ImgCoca from '../../assets/menu/coca.png';
import ImgCocaSinAzucar from '../../assets/menu/cocazucar.png';
import ImgTropical from '../../assets/menu/tropical.png';
import ImgHtwoO from '../../assets/menu/h2o.png';
import ImgFriesRectangle from '../../assets/menu/papas_rectangulo.png';
import ImgFriesWedges from '../../assets/menu/papas_gajo.png';
import { isMobile } from 'react-device-detect';
import { Divider } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
const burgerData: CartItem[] = [
  { name: 'Special Taste', description: "Torta angus 1/4 de libra, tomate, cebolla morada, queso mozzarella, guacamole especial, papas gajo, aderezo chipotle.", price: 5800, img: ImgSpecial, quantity: 1, available: true, category: 'dish' },
  { name: 'Chicago', description: "Pechuga de pollo, queso mozarella, tomate, lechuga, pepinillos, cebolla caramelizada, salsa ranch, papas gajo, aderezo chipotle.", price: 5800, img: ImgChicago, quantity: 1, available: true, category: 'dish' },
  { name: 'Pulled Pork', description: "Carne mechada de cerdo, en salsa barbacoa, queso mozarella, cebolla caramelizada, salsa ranch., papas gajo, aderezo chipotle.", price: 5800, img: ImgPulledPork, quantity: 1, available: true, category: "dish" },
  { name: 'Big One', description: "Torta angus 1/4 de libra, queso amarillo, tomate, cebolla morada, papas gajo.", price: 5800, img: ImgBigOne, quantity: 1, available: true, category: "dish" },
  { name: 'New York', description: "Torta de carne, queso mozarella, tomate, lechuga, pepinillo, cebolla caramelizada, salsa ranch, papas gajo, aderezo chipotle.", price: 5000, img: ImgNewYork, quantity: 1, available: true, category: "dish" },
  { name: 'Italiana',  description: "Pechuga de pollo, queso mozarella, tomate hojas de albahaca, salsa prego, pesto, salsa ranch, papas gajo, aderezo chipotle.", price: 5800, img: ImgItaliana, quantity: 1, available: true, category: "dish" },
  { name: 'Mexicana',  description: "Torta de res, cebolla, queso mozarella, tomate, lechuga,chile jalapeno, papas gajo, aderezo chipotle.", price: 5800, img: ImgMexicana, quantity: 1, available: true, category: "dish" },
  { name: 'Sweet Explosion',  description: "Torta angus 1/4 de libra, cebolla caramelizada, tomate, queso mozzarella, salsa BBQ, papas gajo, aderezo chipotle.", price: 5800, img: ImgSweet, quantity: 1, available: true, category: "dish" },
  { name: 'Papas regulares 🍟', description: null, price: 1800, img: ImgFriesRectangle, quantity: 1, available: true, category: "sides" },
  { name: 'Papas gajo 🍟', description: null, price: 1800, img: ImgFriesWedges, quantity: 1, available: true, category: "sides" },
  { name: 'Veggie',  description: "Pan twings, torta de falafel, hongos, tomate, zucchini, aguacate, cebolla morada, salsa mostaza miel, papas gajo, aderezo chipotle.", price: 6500, img: ImgVeggie, quantity: 1, available: true, category: "dish" },
  { name: 'Coca Cola Regular 600ml', description: null, price: 1000, img: ImgCoca, quantity: 1, available: true, category: "beverage" },
  { name: 'Coca Cola (sin azúcar) 600ml', description: null, price: 1000, img: ImgCocaSinAzucar, quantity: 1, available: true, category: "beverage" },
  { name: 'Tropical Melocotón 600ml', description: null, price: 1000, img: ImgTropical, quantity: 1, available: true, category: "beverage" },
  { name: 'H2O 600ml', description: null, price: 1000, img: ImgHtwoO, quantity: 1, available: true, category: 'beverage' },
];

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
  const [randomBurgerData, setRandomBurgerData] = useState<CartItem[]>(shuffleArray(
    burgerData.map(item => ({ ...item, quantity: 1 }))));

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  const addToCart = (item: CartItem) => {
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.name === item.name);
  
    if (existingItemIndex !== -1) {
      // Item already exists, increase its quantity
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += 1;
      setCartItems(updatedCartItems);
    } else {
      // Item doesn't exist, add it to the cart
      setCartItems((prevCartItems) => [...prevCartItems, item]);
    }
  
    handleCartToggle();
  };
  

  const handleEmptyCart = () => {
    setCartItems([]);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Header />
      <CartModal isOpen={isCartOpen} onClose={handleCartToggle} cartItems={cartItems} />

      <main>
      <Container
        maxWidth="xl"
        sx={{
          bgcolor: 'background.paper',
          pt: 3,
          pb: {lg:5,sm:3},
        }}
        disableGutters
        >
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
            sx={{ fontSize: { lg: '2.3em', xs: '1.5em' }, lineHeight:  1.5 }}
          >
            Ordena en Línea 📲{isMobile? <br /> : ""} Puro Sabor 🍔 Grecia, CR 📍
          </Typography>
          <Divider/>
          <Typography variant="h5" align="center" color="text.secondary" paragraph
            sx={{ fontSize: { lg: '1.3em', xs: '0.8em' }, paddingLeft: 6, paddingRight: 6, pt: {lg:4, xs:2}, pb: {lg:0, xs:0} }}>
            Elige tus hamburguesas favoritas, selecciona la cantidad y haz clic en el botón 'Agregar al carrito' para realizar tu pedido en línea.<br/> Todas las hamburguesas incluyen una orden de papas gajo 🍟 
          </Typography>
          {isMobile ? (
            <Typography align="center" color="text.secondary" paragraph
            sx={{ fontSize: { lg: '1.3em', xs: '0.8em' }, fontWeight: "bold", paddingLeft: 6, paddingRight: 6, pt: {lg:1, xs:2}, pb: {lg:0, xs:3} }}>
              * Mantén presionada las imágenes para ver los ingredientes de cada platillo.
            </Typography>
          ) : "" }
        </Container>

        <Container sx={{ py: 2 }} maxWidth="lg">
          <Grid sx={{margin: '0 auto'}} container spacing={4}>
            {randomBurgerData.map((burger, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', width:'85%', display: 'flex', flexDirection: 'column' }}
                >
                  <Tooltip title={burger.description} arrow placement="bottom">
                    <CardMedia
                      component="div"
                      sx={{
                        pt: '95%',
                      }}
                      image={burger.img}
                    />
                  </Tooltip>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {burger.name} | ₡{burger.price}
                    </Typography>
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
                      <Button variant="contained" fullWidth onClick={() => addToCart(burger)}>Agregar al carrito</Button>) : 
                      (<Button variant="contained" disabled fullWidth onClick={() => alert('Muy Pronto!')}>Muy Pronto!</Button> ) }

                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
