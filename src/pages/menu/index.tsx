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
import ImgPromoGuy from '../../assets/promoguy1.webp';
import ImgPromoGuyTwo from '../../assets/promoguy2.webp';
import ImgFloatingCart from '../../assets/cart.png';
import ImgScrollDown from '../../assets/scroll.webp';
import { isMobile } from 'react-device-detect';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Divider, Modal, Checkbox, Backdrop, List,  ListItem,  ListItemText,  Paper, TextField, Radio } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { burgerData, promoCodeList } from '../../modules/context/data';
//import PromoModal from '../../modules/components/promoModal';
import FloatingWarning from '../../modules/components/warning';
import { SnackbarCloseReason } from '@mui/material';


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();


export default function Menu() {

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartTotalCost, setCartTotalCost] = useState(0);
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [promoCodeDiscount, setPromoCodeDiscount] = useState(0);
  const [showPromoCode, setShowPromoCode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('combo');
  const [isWarningOpen, setWarningOpen] = useState(true);

  const handleWarningClose = (event: React.SyntheticEvent<Element, Event>, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }
    setWarningOpen(false);
  };

  const findMenuItemPrice = (itemName: string): number => {
    const menuItem = burgerData.find(item => item.name === itemName);
    return menuItem ? menuItem.basePrice : 0;
  };

  const handleExtraChange = (pItemIndex: number, pExtraIndex: number) => {
    //check the index to be updated when selecting a no ingredient option with 0 colones as the extraPrice
    const updatedCartItems = JSON.parse(JSON.stringify(cartItems)); // Create a deep copy of cartItems
    updatedCartItems[pItemIndex] = {
      ...updatedCartItems[pItemIndex],
      extras: [...updatedCartItems[pItemIndex].extras] // Create a new array for extras
    };
    updatedCartItems[pItemIndex].price = findMenuItemPrice(updatedCartItems[pItemIndex].name);
    updatedCartItems[pItemIndex].extras[pExtraIndex] = {
      ...updatedCartItems[pItemIndex].extras[pExtraIndex],
      selected: !updatedCartItems[pItemIndex].extras[pExtraIndex].selected
    };
    setCartItems(updatedCartItems);
    setRefreshData(!refreshData);
  };


  const handleMeatTermChange = (pItemIndex: number, pTermIndex: number) => {
    const updatedCartItems = JSON.parse(JSON.stringify(cartItems)); // Create a deep copy of cartItems
    updatedCartItems[pItemIndex] = {
      ...updatedCartItems[pItemIndex],
      meat: updatedCartItems[pItemIndex].meat.map((term: any, index: number) => ({
        ...term,
        selected: index === pTermIndex, // Set the selected property based on the clicked term
      })),
    };
    setCartItems(updatedCartItems);
    setRefreshData(!refreshData);
  };
  
  
 
  useEffect(() => {
    let total = 0;
    let subtotal = 0;
    cartItems.forEach((element) => {
      element.price = element.basePrice;
    });
    cartItems.forEach((element) => {
      let itemPrice = element.basePrice; // Initialize item price with base price without extras
      if (element.extras && element.extras.length > 0) {
        element.extras.forEach((extra:any, extraIndex: number) => {
          if (extra?.selected !== undefined && extra?.selected !== null && ( extra.selected === true ) ) {
            itemPrice = ( element.price + extra.price );
            element.price = itemPrice;
          }
        });
      }
      total += element.price;
      subtotal += element.price;
    });
    if (promoCode) {
      setPromoCode(promoCode.toLowerCase());
      const promoCodeDiscount = promoCodeList.find((code) => code.key === promoCode);
      if (promoCodeDiscount) {
        total -= (total * promoCodeDiscount.discount) / 100;
      }
    }
    // Update cartTotalCost state
    setCartSubtotal(subtotal);
    setCartTotalCost(total);
  }, [cartItems, refreshData]);
  
  


  const shuffleArray = (array: any[], selectedCategory: string) => {
    // Separate items with the selected category from other categories
    const selectedCategoryItems = array.filter(item => item.category === selectedCategory);
    const otherCategoryItems = array.filter(item => item.category !== selectedCategory);
    // Shuffle items with the selected category
    for (let i = selectedCategoryItems.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [selectedCategoryItems[i], selectedCategoryItems[j]] = [selectedCategoryItems[j], selectedCategoryItems[i]];
    }
    // Combine shuffled items with the selected category and non-selected items
    const shuffledArray = [...selectedCategoryItems, ...otherCategoryItems];
    return shuffledArray;
  };
  
  
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => {
    setShowConfirmation(false);
    setIsCartOpen(!isCartOpen)
    handleCartToggle();
  };

  const [randomBurgerData, setRandomBurgerData] = useState<CartItem[]>(shuffleArray(
    burgerData.map(item => ({ ...item, quantity: 1 })), selectedCategory));

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  const addToCart = (item: CartItem) => {
    //const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.name === item.name);
    setCartItems((prevCartItems) => [...prevCartItems, item]);
    setShowConfirmation(false);
    setCartTotalCost(0);
    setCartSubtotal(0);
    handleCartToggle();
    setRefreshData(!refreshData);
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
      let promoCodeMessage = "";
      if ( promoCode ) {
        const promoCodeDiscount = promoCodeList.find((code) => code.key === promoCode);
        if ( promoCodeDiscount ) {
          promoCodeMessage = `Descuento aplicado: (${promoCodeDiscount.discount }%) ₡${cartSubtotal - cartTotalCost} %0aPromo code: ${promoCode}%0a`;
        }
    }
  
    const formattedOrderText = `Cliente: ${customerName} %0aNúmero de teléfono: ${phoneNumber}%0a%0aConfirmación de la orden:%0a%0a${cartItems
      .map((item) => {
        let selectedMeatTerm = item.meat.find((term: { selected: any; }) => term.selected);
    
        let selectedExtras = item.extras
          .filter((extra: any) => extra.selected)
          .map((extra: any) => `${extra.name} ${extra.price > 0 ? `₡${extra.price}` : ''}`)
          .join(', ');
        selectedExtras = selectedExtras ? `(${selectedExtras})` : '';
        const itemTotalPrice = item.price > item.basePrice ? `= ₡${item.price}` : '';
    
        return `${item.name}${selectedMeatTerm ? ` [${selectedMeatTerm.name}]` : ''} x${item.quantity} - ₡${item.basePrice} ${selectedExtras} ${itemTotalPrice}`;
      })
      .join('%0a')}"${ promoCode? "%0aSubtotal: ₡" + cartSubtotal.toFixed(0)+ " colones" : "" }%0a${promoCodeMessage}%0a%0aTotal: ₡${cartTotalCost.toFixed(0)} colones%0a%0a*NO OLVIDES ENVIAR ESTE MENSAJE*`;    
      window.open('https://wa.me/50685194028?text=' + formattedOrderText, '_blank');
    } else {
      toast.error('Ingresa tu información personal para completar la orden.', {
          position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const applyPromoCode = ( pPromoCode : string ) => {
    pPromoCode = pPromoCode.toLowerCase();
    const promoCodeItem = promoCodeList.find((item) => item.key === pPromoCode);
    // If promoCodeItem is found, return the discount value, otherwise return null
    if( promoCodeItem && ( promoCodeItem.discount > 0 ) ){
      setShowPromoCode(!showPromoCode);
      setPromoCode( pPromoCode );
      setPromoCodeDiscount( promoCodeItem.discount );
      setRefreshData(!refreshData);
      setIsShowingAnimatedScreen(true);
      setTimeout(() => {
        setIsShowingAnimatedScreen(false);
        toast.success( "Bien hecho" + ( customerName? ( " " + customerName ) : "" ) + "! un super descuento de " + promoCodeItem.discount + "% ha sido aplicado a tu compra!" );
      }, 5000);
    } else if( pPromoCode.length ){
      setShowPromoCode(false);
      setRefreshData(!refreshData);
      toast.error( "Lo siento! el código que ha ingresado no existe." );
    }
  }
 
  const updateSelectedCategory = ( pSelected: string) => {
    setSelectedCategory(pSelected);
    setRandomBurgerData( shuffleArray(
      burgerData.map(item => ({ ...item, quantity: 1 })), pSelected) );
  }

  const [isShowingAnimatedScreen, setIsShowingAnimatedScreen] = useState(false);

    return (
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Header openCartCallback={openCart}/>

        <div>
          
          <img style={{display: (isCartOpen)? "none" : "" }} alt="Abrir carrito de compras" onClick={() => openCart()} src={ImgFloatingCart} className="floating-cart" />
        </div>
        
        {/*<PromoModal />*/}
        <Modal
          open={isShowingAnimatedScreen}
          onClose={() => setIsShowingAnimatedScreen(false)}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <div className={`mascot ${isShowingAnimatedScreen ? 'fade-in' : 'fade-out'}`}>
            <div className="modal-overlay" style={{ backgroundColor: 'black' }}>
              <Paper className="mascot-modal-content" elevation={3}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <img src={ Math.random() < 0.5 ? ImgPromoGuy: ImgPromoGuyTwo } alt="Promo Code" style={{ width: '100%' }} />
                </Box>
              </Paper>
            </div>
          </div>
        </Modal>

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
                    sx={{ fontSize: { xs: '1.2em', lg: '2em' }, fontWeight: "bold" }}
                    variant="h5"
                    gutterBottom
                  >
                    Confirma tu orden en Puro Sabor ✅
                  </Typography>
                  <span>Hay ({cartItems.length}) productos en el carrito, haz scroll en la lista para verlos todos.</span>
                  <Paper style={{ maxHeight: isMobile? '170px' : '300px', overflowY: 'auto' }}>
                    <List>
                      {cartItems.map((item, index) => (
                        <ListItem className={index % 2 === 0 ? 'even-item' : 'odd-item'} style={{ height: 'auto' }} key={index}>
                          <ListItemText
                            disableTypography
                            primary={
                              <div style={{ fontSize: 15 }}>
                                
                                <span>
                                  { item.category === 'burger' ? '🍔' : item.category === 'beverage' ? '🥤' : item.category === 'wings' ? '🍗' : '' }
                                  
                                  { ` ${item.name} ` 
                                        + item.meat
                                        .filter( ( term: any ) => term.selected )
                                        .map( ( term:any ) => `[${ term.name }]` )
                                        .join(', ')
                                        + `  x${item.quantity} = ₡${item.basePrice}` }
                                  { ( item.price > item.basePrice? " + " : "" ) } 
                                  
                                  { item.extras
                                        .filter( ( extra: any ) => extra.selected )
                                        .map( ( extra:any ) => ` ${ extra.name } ${ ( extra.price > 0 )? ( "₡" + extra.price ) : "" }` )
                                        .join(', ') } 
                                        { ( item.price > item.basePrice? " = ₡" + item.price : "" ) }

                                  

                                </span>
                                
                              </div>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Paper>

                  {showPromoCode &&
                  <>
                    <Typography
                      fontSize="1.2em"
                      variant="subtitle1"
                      gutterBottom
                      paddingTop={2}
                      fontWeight="bold"
                    >
                      Subtotal: ₡{cartSubtotal.toFixed(0)} colones
                    </Typography>

                    <Typography
                      fontSize="1em"
                      variant="subtitle1"
                      gutterBottom
                      color={"green"}
                      paddingTop={2}
                      fontWeight="bold"
                      >
                      Descuent aplicado: ₡{cartSubtotal - cartTotalCost} colones
                    </Typography>
                  </>
                  }

                  <Typography
                    fontSize="1.5em"
                    variant="subtitle1"
                    gutterBottom
                    paddingTop={2}
                    fontWeight="bold"
                  >
                    Total: ₡{cartTotalCost.toFixed(0)} colones
                  </Typography>

                  {showPromoCode &&
                    <Typography
                      fontSize="1em"
                      variant="subtitle1"
                      gutterBottom
                      paddingTop={0}
                      fontWeight="bold"
                    >
                      Código de promoción: {promoCode} ❤️ ({promoCodeDiscount}%) 🆓
                    </Typography>
                  }
                  
                  <TextField
                    label="Ingresa tu nombre completo"
                    sx={{pt: 0, marginTop:0}}
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Ingresa acá tu número de teléfono"
                    
                    value={phoneNumber}
                    type="number"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    fullWidth
                    margin="normal"
                    sx={{ pb: 0, marginTop:0 }}
                  />
                  <TextField
                    label="¿Tienes un código de promoción? Ingrésalo acá!"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    onBlur={() => applyPromoCode(promoCode)}
                    fullWidth
                    margin="normal"
                    sx={{ pb: 0, marginTop:0 }}
                  />
                  <div className="button-group" style={{ paddingBottom: 8, paddingTop: 8 }}>
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
                      color="success"
                      onClick={handleConfirmOrder}
                      sx={{ width: { lg: '61%', xs: '63%' } }}
                    >
                      Ordenar ahora! 🍔
                    </Button>
                  </div>
                </div>
                
                ) : (

                  <Box>

                    <Typography
                      variant="h5"
                      gutterBottom
                      paddingTop={2}
                      paddingBottom={2}
                      fontWeight="bold"
                    >
                      ({cartItems.length}) Carrito de Compras 🛒
                    </Typography>

                    { isMobile &&
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "10vh" }}>
                        <span>* Haz scroll para ver los productos en el carrito.</span>
                        <img style={{ width: "50%" }} src={ImgScrollDown} alt="Scroll" />
                      </div>
                    }

                    <Paper className="scrollable-bar" style={{ maxHeight: '300px', overflowY: 'scroll' }}>
                      <List>
                        {cartItems.map((item: any, index) => (
                          <ListItem className={index % 2 === 0 ? 'even-item' : 'odd-item'} key={index}>
                            <Grid container spacing={2}>
                              <Grid item xs={12} lg={0.5}>
                                <IconButton
                                  color="secondary"
                                  aria-label="Delete"
                                  onClick={() => removeFromCart(index)}
                                >
                                  {isMobile ? 'Eliminar' : ''} <DeleteIcon />
                                </IconButton>
                              </Grid>
                              <Grid item xs={ 12 } lg={ ( ( item.category === 'burrito' ) ) ? 1.7 : 3.5 } >
                                <ListItemText sx={ { marginTop:1, paddingLeft: { xs:1.5, lg:0 } } }
                                  primary={ `${item.name} x${item.quantity}` }
                                  secondary={ `₡${item.price}` }
                                />
                              </Grid>
                              <Grid sx={{ marginTop:1, marginBottom:1,  display: ( ( item.name === 'Combo Doble Sabor' ) || ( item.name === 'Combo 4 Jinetes' ) || ( item.category === 'wings' ) || ( item.category === 'burger' ) || ( item.category === 'burrito' ) ) ? '' : 'none' }} xs={12} lg={ ( item.category === 'wings' )? 7 :  ( ( item.name === 'Combo Doble Sabor' ) || ( item.name === 'Combo 4 Jinetes' ) )? 7 : 8 } item>
                                
                                {item.meat.length > 0 &&
                                  <Grid container spacing={1}>
                                    
                                    <Grid xs={12} lg={12} item>
                                      <Typography
                                      gutterBottom
                                      paddingTop={2}
                                      fontWeight="bold"
                                      >
                                        Selecciona el término de la carne:
                                      </Typography>
                                    </Grid>
                                    {
                                      item.meat.map((term: any, termIndex: number) => (
                                        <Grid sx={{ marginTop: 1, marginLeft: 0, lineHeight: 0.5 }} item xs={12} lg={term.name.length / item.meat.length * 1.4} key={termIndex}>
                                          <Radio
                                            value={term.name}
                                            checked={term.selected}
                                            onChange={() => {
                                              handleMeatTermChange(index, termIndex);
                                            }}
                                            sx={{ paddingLeft: { xs: 4, lg: 0 } }}
                                          />

                                          {isMobile &&
                                            <span className='lhspan'> {term.name}</span>
                                          }
                                          {!isMobile &&
                                            <span className='lhspan'><br /> {term.name}</span>
                                          }
                                        </Grid>
                                      ))}
                                  </Grid>
                                }

                                <Grid container spacing={1}>

                                <Grid xs={12} lg={12} item>
                                      <Typography
                                      gutterBottom
                                      paddingTop={4}
                                      fontWeight="bold"
                                      >
                                        Selecciona los extras que deseas:
                                      </Typography>
                                    </Grid>

                                  {item.extras.map((extraIngred: any, extra_index: number) => (
                                    <Grid sx={{ marginTop:1, marginLeft: 1, lineHeight: 0.5}} item xs={12} lg={extraIngred.name.length / item.extras.length*1.7} key={extra_index}>
                                      <Checkbox
                                        value={extraIngred.name}
                                        disabled={false}
                                        checked={extraIngred.selected}
                                        onChange={() => {
                                          handleExtraChange(index, extra_index);
                                        }}
                                        sx={{ paddingLeft:{ xs: 4, lg: 0 } }}
                                      />
                                      {isMobile && 
                                        <span className='lhspan'>₡{extraIngred.price} | {extraIngred.name}</span>
                                      }
                                      {!isMobile && 
                                        <span className='lhspan'>₡{extraIngred.price} | <br /> {extraIngred.name}</span>
                                      }
                                    </Grid>
                                  ))}
                                  
                                </Grid>
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
                        sx={{ mr: '10px', width: {xs:'48%', lg: '39%'} }}
                      >
                        Volver al Menú
                      </Button>
                      <Button
                        sx={{ width: {xs:'48%', lg: '59%'}}}
                        variant="contained"
                        color="success"
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
          maxWidth={false}
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
              Elige tus platillos favoritas, selecciona la cantidad y haz clic en el botón 'Agregar al carrito' para realizar tu pedido en línea.{ isMobile? "" : <br /> } Todas las hamburguesas incluyen una orden de papas gajo 🍟 
            </Typography>

              
          </Container>

          <Container sx={{ py: ( isMobile? 2 : 4 ) }} maxWidth="lg">
            <Grid container textAlign={"center"}>
                <Grid sx={{py:( isMobile? 2 : 0 )}} item xs={6} sm={6} md={2.4} xl={2.4}>
                  <Button sx={{backgroundColor:( selectedCategory === "burger"? "red" : "white"), color:( selectedCategory === "burger"? "white" : "black"), width:"90%"}} variant="contained" size="large" onClick={() => updateSelectedCategory('burger')}>
                    Hamburguesas
                  </Button>
                </Grid>
                <Grid sx={{py:( isMobile? 2 : 0 )}} item xs={6} sm={6} md={2.4} xl={2.4}>
                  <Button sx={{backgroundColor:( selectedCategory === "wings"? "red" : "white"), color:( selectedCategory === "wings"? "white" : "black"), width:"90%"}} variant="contained" size="large" onClick={() => updateSelectedCategory('wings')}>
                    Alitas
                  </Button>
                </Grid>
                <Grid sx={{py:( isMobile? 2 : 0 )}} item xs={6} sm={6} md={2.4} xl={2.4}>
                  <Button sx={{backgroundColor:( selectedCategory === "combo"? "red" : "white"), color:( selectedCategory === "combo"? "white" : "black"), width:"90%"}} variant="contained" size="large" onClick={() => updateSelectedCategory('combo')}>
                    Combos
                  </Button>
                </Grid>
                <Grid sx={{py:( isMobile? 2 : 0 )}} item xs={6} sm={6} md={2.4} xl={2.4}>
                  <Button sx={{backgroundColor:( selectedCategory === "beverage"? "red" : "white"), color:( selectedCategory === "beverage"? "white" : "black"), width:"90%"}} variant="contained" size="large" onClick={() => updateSelectedCategory('beverage')}>
                    Bebidas
                  </Button>
                </Grid>
                <Grid sx={{py:( isMobile? 2 : 0 )}} item xs={6} sm={6} md={2.4} xl={2.4}>
                  <Button sx={{backgroundColor:( selectedCategory === "other"? "red" : "white"), color:( selectedCategory === "other"? "white" : "black"), width:"90%"}} variant="contained" size="large" onClick={() => updateSelectedCategory('other')}>
                    Otros
                  </Button>
                </Grid>
            </Grid>
          </Container>


          <Container maxWidth="lg">


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
        
        <FloatingWarning />


        <Box sx={{ bgcolor: 'background.paper', p: 6, my: 10, marginBottom: 0 }} component="footer">
          <Footer />
        </Box>
      </ThemeProvider>
    );
  }
