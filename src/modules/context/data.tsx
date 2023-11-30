
import { CartItem } from '../../types/index'; // Import the CartItem type

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
import ImgComboFour from '../../assets/menu/combo_four.png';
import ImgComboDuo from '../../assets/menu/combo_duo.png';
import ImgComboYankee from '../../assets/menu/combo_yankee.png';
import ImgChickenWings8 from '../../assets/menu/chickenwings8.png';
import ImgChickenWings16 from '../../assets/menu/chickenwings16.png';
import ImgBurrito from '../../assets/menu/burrito.png';
import ImgChickenFajitas from '../../assets/menu/chicken_fajitas.png';

const extraIngredients = [{name:"doble queso", price: 200, selected: false}, {name:"doble torta", price: 1000, selected: false}, {name:"extra tocineta", price: 500, selected: false}, {name:"extra pepinillos", price: 300, selected: false}, {name:"extra hongos", price: 300, selected: false}, {name:"sin cebolla", price: 0}, {name:"sin pepinillo", price: 0}, {name:"sin queso", price: 0}];
const chickenWingsExtras = [{name:"salsa buffalo", price: 0}, {name:"salsa BBQ", price: 0}, {name:"salsa mostaza miel", price: 0}];
const comboBurgerExtras = [{name:"New York", price: 0}, {name:"Chicago", price: 0}, {name:"Italiana", price: 0}, {name:"Mexicana", price: 0}];
const burritoExtras = [{name:"de pollo", price: 0}, {name:"de carne", price: 0}];
const meatTerm = [{name:"Sellada", selected: false}, {name:"Rojo", selected: false}, {name:"Medio", selected: false}, {name:"Tres Cuartos", selected: false}, {name:"Bien Cocida", selected: true}]

export const burgerData: CartItem[] = [
    { name: 'Special Taste', description: "Torta angus 1/4 de libra, tomate, cebolla morada, queso mozzarella, guacamole especial, papas gajo, aderezo chipotle.", basePrice: 5800, price: 5800, img: ImgSpecial, quantity: 1, available: true, category: 'burger', ingreds: ["tomate","cebolla","queso","guacamole"], extras: extraIngredients, meat: meatTerm },
    { name: 'Chicago', description: "Pechuga de pollo, queso mozarella, tomate, lechuga, pepinillos, cebolla caramelizada, salsa ranch, papas gajo, aderezo chipotle.", basePrice: 5800, price: 5800, img: ImgChicago, quantity: 1, available: true, category: 'burger', ingreds: ["queso", "tomate", "pepinillos", "cebolla"], extras: extraIngredients, meat: [] },
    { name: 'Pulled Pork', description: "Carne mechada de cerdo en salsa barbacoa, tomate, queso mozarella, cebolla caramelizada, salsa ranch, papas gajo, aderezo chipotle.", basePrice: 5800, price: 5800, img: ImgPulledPork, quantity: 1, available: true, category: "burger", ingreds: ["queso", "tomate", "cebolla"], extras: extraIngredients, meat: [] },
    { name: 'Big One', description: "Torta angus 1/4 de libra, queso amarillo, tomate, cebolla morada, papas gajo.", basePrice: 5800, price: 5800, img: ImgBigOne, quantity: 1, available: true, category: "burger", ingreds: ["queso", "tomate", "cebolla"], extras: extraIngredients, meat: meatTerm  },
    { name: 'New York', description: "Torta de carne, queso mozarella, tomate, lechuga, pepinillo, cebolla caramelizada, salsa ranch, papas gajo, aderezo chipotle.", basePrice: 5000, price: 5000, img: ImgNewYork, quantity: 1, available: true, category: "burger", ingreds: ["queso", "tomate", "lechuga", "pepinillo", "cebolla"], extras: extraIngredients, meat: [] },
    { name: 'Italiana', description: "Pechuga de pollo, queso mozarella, tomate hojas de albahaca, salsa prego, pesto, salsa ranch, papas gajo, aderezo chipotle.", basePrice: 5800, price: 5800, img: ImgItaliana, quantity: 1, available: true, category: "burger", ingreds: ["queso", "tomate", "albahaca", "pesto"], extras: extraIngredients, meat: [] },
    { name: 'Mexicana', description: "Torta de res, cebolla caramelizada, queso mozarella, tomate, lechuga, chile jalapeño, papas gajo, aderezo chipotle.", basePrice: 5800, price: 5800, img: ImgMexicana, quantity: 1, available: true, category: "burger", ingreds: ["cebolla", "queso", "tomate", "lechuga", "chile"], extras: extraIngredients, meat: [] },
    { name: 'Sweet Explosion', description: "Torta angus 1/4 de libra, cebolla caramelizada, tomate, queso mozzarella, salsa BBQ, papas gajo, aderezo chipotle.", basePrice: 5800, price: 5800, img: ImgSweet, quantity: 1, available: true, category: "burger", ingreds: ["cebolla", "tomate", "queso"], extras: extraIngredients, meat: meatTerm  },
    { name: 'Papas regulares', description: null, basePrice: 1800, price: 1800, img: ImgFriesRectangle, quantity: 1, available: true, category: "sides", ingreds: [], extras:[], meat: [] },
    { name: 'Papas gajo', description: null, basePrice: 1800, price: 1800, img: ImgFriesWedges, quantity: 1, available: true, category: "sides", ingreds: [], extras:[], meat: [] },
    { name: 'Veggie', description: "Pan twings, torta de falafel, hongos, tomate, zucchini, aguacate, cebolla morada, salsa mostaza miel, papas gajo, aderezo chipotle.", basePrice: 6500, price: 6500, img: ImgVeggie, quantity: 1, available: true, category: "burger", ingreds: ["hongos", "tomate", "zucchini", "aguacate", "cebolla"], extras: extraIngredients, meat: [] },
    { name: 'Coca Cola Regular 600ml', description: null, basePrice: 1000, price: 1000, img: ImgCoca, quantity: 1, available: true, category: "beverage", ingreds: [], extras:[], meat: [] },
    { name: 'Coca Cola (sin azúcar) 600ml', description: null, basePrice: 1000, price: 1000, img: ImgCocaSinAzucar, quantity: 1, available: true, category: "beverage", ingreds: [], extras:[], meat: [] },
    { name: 'Tropical Melocotón 600ml', description: null, basePrice: 1000, price: 1000, img: ImgTropical, quantity: 1, available: true, category: "beverage", ingreds: [], extras:[], meat: [] },
    { name: 'H2O 600ml', description: null, basePrice: 1000, price: 1000, img: ImgHtwoO, quantity: 1, available: true, category: 'beverage', ingreds: [], extras:[], meat: [] },
    { name: 'Combo 4 Jinetes', description: "Elige una hamburguesa entre la New York, Chicago, Italiana o Mexicana + papas gajo y un refresco Tropical de 600ml.", basePrice: 5900, price: 5900, img: ImgComboFour, quantity: 1, available: true, category: 'combo', ingreds: [], extras: comboBurgerExtras, meat: [] },
    { name: 'Combo Yankee Pack', description: "1 Chicago + 1 New York + 1 orden de Alitas de Pollo con 16 unidades + 400g de papas fritas + un refresco Tropical de 2L.", basePrice: 19900, price: 19900, img: ImgComboYankee, quantity: 1, available: true, category: 'combo', ingreds: [], extras: [], meat: [] },
    { name: 'Combo Doble Sabor', description: "Elige una hamburguesa entre la New York, Chicago, Italiana o Mexicana acompañada de papas gajo + una orden de 8 alitas + un acompañamiento de 250g de papas fritas + dos refrescos Tropical de 600ml.", basePrice: 10900, price: 10900, img: ImgComboDuo, quantity: 1, available: true, category: 'combo', ingreds: [], extras: comboBurgerExtras, meat: [] },
    { name: 'Alitas de Pollo (8uds)', description: "8 Alitas de Pollo con 3 opciones de salsas exquisitas: la picante Buffalo, la dulce y ahumada Barbacoa, y la suave y deliciosa Mostaza Miel acompañadas de 250g de crujientes papas fritas.", basePrice: 5900, price: 5900, img: ImgChickenWings8, quantity: 1, available: true, category: "wings", ingreds: [], extras: chickenWingsExtras, meat: [] },
    { name: 'Alitas de Pollo (16uds)', description: "16 Alitas de Pollo con 3 opciones de salsas exquisitas: la picante Buffalo, la dulce y ahumada Barbacoa, y la suave y deliciosa Mostaza Miel acompañadas de 400g de crujientes papas fritas.", basePrice: 9900, price: 9900, img: ImgChickenWings16, quantity: 1, available: true, category: "wings", ingreds: [], extras: chickenWingsExtras, meat: [] },
    { name: 'Burrito Supremo', description: "Burrito relleno de suculento pollo a la parrilla o tierna carne de res sazonada, junto con una mezcla perfecta de frijoles refritos, queso derretido, aguacate cremoso y chimichurri, acompañado de 250gramos de papas a la francesa.", basePrice: 4000, price: 4000, img:  ImgBurrito, quantity: 1, available: true, category: "other", ingreds: [], extras: burritoExtras, meat: [] },
    { name: 'Fajitas de Pollo', description: "Jugosos trozos de pechuga de pollo empanizados y dorados a la perfección te esperan en cada bocado. Acompañadas de 250gramos de papas a la francesa, nuestras fajitas son tiernas por dentro y crujientes por fuera.", basePrice: 4000, price: 4000, img:  ImgChickenFajitas, quantity: 1, available: true, category: "other", ingreds: [], extras: [], meat: [] }
  ];

export const promoCodeList = [ { key:"elpurosabor", discount:10 } ];