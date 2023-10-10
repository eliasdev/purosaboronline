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

import { isMobile } from 'react-device-detect';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Divider, Modal, Checkbox, Backdrop, List,  ListItem,  ListItemText,  Paper, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { burgerData } from '../../modules/context/data';


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();


export default function Menu() {

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartTotalCost, setCartTotalCost] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const findMenuItemPrice = (itemName: string): number => {
    const menuItem = burgerData.find(item => item.name === itemName);
    return menuItem ? menuItem.basePrice : 0;
  };

  const handleExtraChange = (pItemIndex: number, pExtraIndex: number) => {
    const updatedCartItems = JSON.parse(JSON.stringify(cartItems)); // Create a deep copy of cartItems
  
    updatedCartItems[pItemIndex] = {
      ...updatedCartItems[pItemIndex],
      extras: [...updatedCartItems[pItemIndex].extras] // Create a new array for extras
    };
    console.log("THIS SHIT",updatedCartItems[pItemIndex]);
    //console.log("updatedCartItems[pItemIndex].price",updatedCartItems[pItemIndex].price);
    //console.log("burgerData[pItemIndex].basePrice",burgerData[pItemIndex].basePrice);

    console.log(pItemIndex);
    //alert(burgerData[pItemIndex].basePrice);
    //alert(findMenuItemPrice(updatedCartItems[pItemIndex].name));
    updatedCartItems[pItemIndex].price = findMenuItemPrice(updatedCartItems[pItemIndex].name);
    //console.log("updatedCartItems",updatedCartItems[pItemIndex]);
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
            itemPrice = ( element.price + extra.price );
            element.price = itemPrice;
          }
        });
      }
      total += element.price;
    });
    //console.log( cartItems );
  
    // Update cartTotalCost state
    setCartTotalCost(total);
  }, [cartItems, refreshData]);
  
  


  const shuffleArray = (array: any[]) => {
    // Group items by category
    const groupedByCategory: { [key: string]: any[] } = {};
    array.forEach((item) => {
      const category = item.category || 'Uncategorized';
      if (!groupedByCategory[category]) {
        groupedByCategory[category] = [];
      }
      groupedByCategory[category].push(item);
    });
  
    // Separate items with category "combo" from other categories
    const comboItems = groupedByCategory['combo'] || [];
    delete groupedByCategory['combo'];
  
    // Shuffle other categories individually
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
  
    // Shuffle items with category "combo"
    for (let i = comboItems.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [comboItems[i], comboItems[j]] = [comboItems[j], comboItems[i]];
    }
  
    // Add items with category "combo" to the beginning of the shuffled array
    shuffledArray.unshift(...comboItems);
  
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
    setCartItems((prevCartItems) => [...prevCartItems, item]);
    setRefreshData(!refreshData);
    setShowConfirmation(false);
    handleCartToggle();
  };

  const removeFromCart = (pIndex: number) => {
    // Decrease quantity down to one
    cartItems.splice(pIndex,1);
    setRefreshData(!refreshData);
};


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
  };

  const sendMessage = () => {
    if (customerName && phoneNumber) {
        const formattedOrderText = `Cliente: ${customerName} %0aNúmero de teléfono: ${phoneNumber}%0a%0aConfirmación de la orden:%0a%0a${cartItems
            .map((item) => {
                const selectedExtras = item.extras
                    .filter((extra:any) => extra.selected) // Filter selected extras
                    .map((extra:any) => `${extra.name} ₡${extra.price} = ₡${item.price}`)
                    .join(', ');
                return `${item.name} x${item.quantity} - ₡${item.basePrice}${selectedExtras ? ' (Extras: ' + selectedExtras + ')' : ''}`;
            })
            .join('%0a')}%0a%0aTotal: ₡${cartTotalCost.toFixed(0)} colones%0a%0a*NO OLVIDES ENVIAR ESTE MENSAJE*`;

        window.open('https://wa.me/50685194028?text=' + formattedOrderText, '_blank');
    } else {
        toast.error('Ingresa tu información personal para completar tu orden.', {
            position: toast.POSITION.TOP_CENTER,
        });
    }
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
              {showConfirmation ? (
              
              <div>
                <Typography
                  sx={{ fontSize: { xs: '1em', lg: '2em' } }}
                  variant="h5"
                  gutterBottom
                >
                  Confirma tu orden en Puro Sabor ✅
                </Typography>
                <Paper style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  <List>
                    {cartItems.map((item, index) => (
                      <ListItem style={{ height: 'auto' }} key={index}>
                        <ListItemText
                          disableTypography
                          primary={
                            <div style={{ fontSize: 15 }}>
                              <span>{`${item.name} x${item.quantity} = ₡${item.basePrice}`} ( <b>Extras</b>:  {item.extras
                                      .filter((extra: any ) => extra.selected)
                                      .map((extra:any) => `${extra.name} ₡${extra.price}`)
                                      .join(', ')} ) {item.category === 'dish' ? '🍔' : item.category === 'beverage' ? '🥤' : ''}  | ₡{item.price}</span>
                              
                              
                            </div>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>

                <Typography
                  fontSize="1.5em"
                  variant="subtitle1"
                  gutterBottom
                  paddingTop={2}
                  fontWeight="bold"
                >
                  Total: ₡{cartTotalCost.toFixed(0)} colones
                </Typography>
                <TextField
                  label="Ingresa tu nombre completo"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Ingresa acá tu número de teléfono"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  fullWidth
                  margin="normal"
                  sx={{ pb: 2 }}
                />
                <div className="button-group">
                  <Button
                    sx={{ mr: '10px', width: { lg: '37%', xs: '33%' } }}
                    variant="contained"
                    color="primary"
                    onClick={handleCartToggle}
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleConfirmOrder}
                    sx={{ width: { lg: '59%', xs: '62%' } }}
                  >
                    Ordenar ahora! 🍔
                  </Button>
                </div>
              </div>
              
              ) : (

                <Box>

                  <Typography
                    variant="h4"
                    gutterBottom
                    paddingTop={2}
                    paddingBottom={2}
                    fontWeight="bold"
                  >
                    Carrito de Compras 🛒
                  </Typography>
                  


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
                                  <Grid item xs={12} lg={extraIngred.name.length / item.extras.length*0.9} key={extra_index}>
                                    <Checkbox
                                      value={extraIngred.name}
                                      disabled={false}
                                      checked={extraIngred.selected}
                                      onChange={() => {
                                        handleExtraChange(index, extra_index);
                                      }}
                                    />
                                    <span>₡{extraIngred.price} | {extraIngred.name}</span>
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


                  <Typography
                    variant="h5"
                    gutterBottom
                    paddingTop={2}
                    paddingBottom={2}
                    fontWeight="bold"
                  >
                    Total: ₡{cartTotalCost.toFixed(0)} colones
                  </Typography>
                  <div className="button-group">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleCartToggle}
                      sx={{ mr: '10px', width: '43%' }}
                    >
                      Volver al Menú
                    </Button>
                    <Button
                      sx={{ width: '52%' }}
                      variant="contained"
                      color="primary"
                      onClick={handleConfirmCheckout}
                    >
                      Completar Orden ✅
                    </Button>
                  </div>


                  
                </Box>
                
              ) }
              
              
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
            sx={{ fontSize: { lg: '1.3em', xs: '0.8em' }, paddingLeft: 6, paddingRight: 6, pt: {lg:4, xs:2}, pb: {lg:0, xs:3} }}>
            Elige tus hamburguesas favoritas, selecciona la cantidad y haz clic en el botón 'Agregar al carrito' para realizar tu pedido en línea.<br/> Todas las hamburguesas incluyen una orden de papas gajo 🍟 
          </Typography>
          {/*isMobile ? (
            <Typography align="center" color="text.secondary" paragraph
            sx={{ fontSize: { lg: '1.3em', xs: '0.8em' }, fontWeight: "bold", paddingLeft: 6, paddingRight: 6, pt: {lg:1, xs:2}, pb: {lg:0, xs:3} }}>
              * Mantén presionada las imágenes para ver los ingredientes de cada platillo.
            </Typography>
          ) : "" */}
        </Container>

        <Container sx={{ py: 2 }} maxWidth="lg">
          <Grid sx={{margin: '0 auto'}} container spacing={4}>
            {randomBurgerData.map((burger, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', width:'85%', display: 'flex', flexDirection: 'column' }}
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
