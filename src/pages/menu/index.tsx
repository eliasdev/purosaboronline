import React, { useEffect, useState } from 'react';
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
import { CartItem } from '../../types/index'; // Import the CartItem type
import "./index.css";
import "../../modules/components/cartModal/index.css";
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
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Divider, Modal, Checkbox, Backdrop, List,  ListItem,  ListItemText,  Paper, TextField } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';


// TODO remove, this demo shouldn't need to reset the theme.
const extraIngredients = [{name:"doble queso", price: 200}, {name:"doble torta", price: 1000}, {name:"tocineta", price: 500}, {name:"extra pepinillos", price: 300}];
const defaultTheme = createTheme();
const burgerData: CartItem[] = [
  { name: 'Special Taste', description: "Torta angus 1/4 de libra, tomate, cebolla morada, queso mozzarella, guacamole especial, papas gajo, aderezo chipotle.", basePrice: 5800, price: 5800, img: ImgSpecial, quantity: 1, available: true, category: 'dish', ingreds: ["tomate","cebolla","queso","guacamole"], extras: extraIngredients },
  { name: 'Chicago', description: "Pechuga de pollo, queso mozarella, tomate, lechuga, pepinillos, cebolla caramelizada, salsa ranch, papas gajo, aderezo chipotle.", basePrice: 5800, price: 5800, img: ImgChicago, quantity: 1, available: true, category: 'dish', ingreds: ["queso", "tomate", "pepinillos", "cebolla"], extras: extraIngredients },
  { name: 'Pulled Pork', description: "Carne mechada de cerdo en salsa barbacoa, tomate, queso mozarella, cebolla caramelizada, salsa ranch, papas gajo, aderezo chipotle.", basePrice: 5800, price: 5800, img: ImgPulledPork, quantity: 1, available: true, category: "dish", ingreds: ["queso", "tomate", "cebolla"], extras: extraIngredients },
  { name: 'Big One', description: "Torta angus 1/4 de libra, queso amarillo, tomate, cebolla morada, papas gajo.", basePrice: 5800, price: 5800, img: ImgBigOne, quantity: 1, available: true, category: "dish", ingreds: ["queso", "tomate", "cebolla"], extras: extraIngredients },
  { name: 'New York', description: "Torta de carne, queso mozarella, tomate, lechuga, pepinillo, cebolla caramelizada, salsa ranch, papas gajo, aderezo chipotle.", basePrice: 5000, price: 5000, img: ImgNewYork, quantity: 1, available: true, category: "dish", ingreds: ["queso", "tomate", "lechuga", "pepinillo", "cebolla"], extras: extraIngredients },
  { name: 'Italiana',  description: "Pechuga de pollo, queso mozarella, tomate hojas de albahaca, salsa prego, pesto, salsa ranch, papas gajo, aderezo chipotle.", basePrice: 5800, price: 5800, img: ImgItaliana, quantity: 1, available: true, category: "dish", ingreds: ["queso", "tomate", "albahaca", "pesto"], extras: extraIngredients },
  { name: 'Mexicana',  description: "Torta de res, cebolla caramelizada, queso mozarella, tomate, lechuga, chile jalapeño, papas gajo, aderezo chipotle.", basePrice: 5800, price: 5800, img: ImgMexicana, quantity: 1, available: true, category: "dish", ingreds: ["cebolla", "queso", "tomate", "lechuga", "chile"], extras: extraIngredients },
  { name: 'Sweet Explosion',  description: "Torta angus 1/4 de libra, cebolla caramelizada, tomate, queso mozzarella, salsa BBQ, papas gajo, aderezo chipotle.", basePrice: 5800, price: 5800, img: ImgSweet, quantity: 1, available: true, category: "dish", ingreds: ["cebolla", "tomate", "queso"], extras: extraIngredients },
  { name: 'Papas regulares 🍟', description: null, basePrice: 1800, price: 1800, img: ImgFriesRectangle, quantity: 1, available: true, category: "sides", ingreds: [], extras:[] },
  { name: 'Papas gajo 🍟', description: null, basePrice: 1800, price: 1800, img: ImgFriesWedges, quantity: 1, available: true, category: "sides", ingreds: [], extras:[] },
  { name: 'Veggie',  description: "Pan twings, torta de falafel, hongos, tomate, zucchini, aguacate, cebolla morada, salsa mostaza miel, papas gajo, aderezo chipotle.", basePrice: 6500, price: 6500, img: ImgVeggie, quantity: 1, available: true, category: "dish", ingreds: ["hongos", "tomate", "zucchini", "aguacate", "cebolla"], extras: extraIngredients },
  { name: 'Coca Cola Regular 600ml', description: null , basePrice: 1000, price: 1000, img: ImgCoca, quantity: 1, available: true, category: "beverage", ingreds: [], extras:[] },
  { name: 'Coca Cola (sin azúcar) 600ml', description: null, basePrice: 1000, price: 1000, img: ImgCocaSinAzucar, quantity: 1, available: true, category: "beverage", ingreds: [], extras:[] },
  { name: 'Tropical Melocotón 600ml', description: null, basePrice: 1000, price: 1000, img: ImgTropical, quantity: 1, available: true, category: "beverage", ingreds: [], extras:[] },
  { name: 'H2O 600ml', description: null, basePrice: 1000, price: 1000, img: ImgHtwoO, quantity: 1, available: true, category: 'beverage', ingreds: [], extras:[] },
];



export default function Menu() {

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartTotalCost, setCartTotalCost] = useState(0);

  const [refreshData, setRefreshData] = useState(false);


  const handleExtraChange = (pItemIndex: number, pExtraIndex: number) => {
    const updatedCartItems = JSON.parse(JSON.stringify(cartItems)); // Create a deep copy of cartItems
  
    updatedCartItems[pItemIndex] = {
      ...updatedCartItems[pItemIndex],
      extras: [...updatedCartItems[pItemIndex].extras] // Create a new array for extras
    };
  
    updatedCartItems[pItemIndex].price = burgerData[pItemIndex].basePrice;
    updatedCartItems[pItemIndex].extras[pExtraIndex] = {
      ...updatedCartItems[pItemIndex].extras[pExtraIndex],
      selected: !updatedCartItems[pItemIndex].extras[pExtraIndex].selected
    };
  
    setCartItems(updatedCartItems);
    setRefreshData(!refreshData);
  };
  
  
  useEffect(() => {
    let total = 0;
  
    cartItems.forEach((element) => {
      let itemPrice = element.basePrice; // Initialize item price with base price without extras
      
      if (element.extras && element.extras.length > 0) {
        element.extras.forEach((extra:any, extraIndex: number) => {
          //console.log("extraIndex", extraIndex);
          if (extra?.selected !== undefined && extra?.selected !== null && ( extra.selected == true ) ) {
            // Add extra price to item price only if the checkbox is checked
            //console.log("add");
            itemPrice += extra.price;
            element.price = itemPrice;
          } else if( ( typeof extra?.selected == "boolean" ) && ( extra?.selected == false ) ){
            //console.log("substract");
            //itemPrice -= extra.price;
            //element.price = itemPrice;
          }
        });
      }
      total += element.price;
    });
    console.log( cartItems );
  
    // Update cartTotalCost state
    setCartTotalCost(total);
  }, [cartItems, refreshData]);
  
  


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



  const removeFromCart = (pIndex: number) => {
    cartItems.splice(pIndex, 1);
  };
  

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Header />
      
      
      <Modal
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <div>
          <Backdrop open={isCartOpen} onClick={() => setIsCartOpen(false)} style={{ zIndex: 9999 }} />
          <div className="modal-overlay">
            <div
              className="modal-content"
              style={{ width: isMobile ? '90%' : '60%' }}
            >
              
              <Box>

                <h2>Carrito de Compras</h2>
                


                <Paper style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  <List>
                    {cartItems.map((item: any, index) => (
                      <ListItem key={index}>
                        <Grid container spacing={2}>
                          <Grid
                            item
                            xs={12}
                            lg={item.category == 'dish' ? 1.7 : 11}
                          >
                            <ListItemText
                              primary={`${item.name} x${item.quantity}`}
                              secondary={`₡${item.price}`}
                            />
                          </Grid>
                          <Grid
                            sx={{
                              display: item.category == 'dish' ? '' : 'none',
                            }}
                            item
                            xs={12}
                            lg={9}
                          >
                            
                            
                            <Grid container spacing={1}>

                              {item.extras.map((extraIngred: any, extra_index: number) => (
                                <Grid item xs={12} lg={extraIngred.name.length / item.extras.length} key={extra_index}>
                                  <span>{extraIngred.name} | ₡{extraIngred.price}</span>
                                  <Checkbox
                                    value={extraIngred.name}
                                    disabled={false}
                                    onChange={() => {
                                      handleExtraChange(index, extra_index);
                                    }}
                                  />
                                </Grid>
                              ))}
                              
                              
                            </Grid>
                          </Grid>
                          <Grid item xs={12} lg={1}>
                            <IconButton
                              color="secondary"
                              aria-label="Delete"
                              onClick={() => removeFromCart(index)}
                            >
                              {isMobile ? 'Eliminar' : ''} <DeleteIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </ListItem>
                    ))}
                  </List>
                </Paper>


                <h2>Costo Total: ₡{cartTotalCost.toFixed(2)}</h2>


                
              </Box>
            </div>
          </div>
        </div>
      </Modal>


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
                    <Typography gutterBottom paragraph sx={{ fontSize:12 }}>
                      {burger.description}
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
