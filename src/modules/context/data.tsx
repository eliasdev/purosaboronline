
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
import ImgComboYankee from '../../assets/menu/combo_yankee.png';
import ImgChickenWings8 from '../../assets/menu/chickenwings8.png';
import ImgChickenWings16 from '../../assets/menu/chickenwings16.png';

const extraIngredients = [{name:"doble queso", price: 200, selected: false}, {name:"doble torta", price: 1000, selected: false}, {name:"tocineta", price: 500, selected: false}, {name:"extra pepinillos", price: 300, selected: false}];
const chickenWingsExtras = [{name:"salsa buffalo", price: 0}, {name:"salsa BBQ", price: 0}, {name:"salsa mostaza miel", price: 0}];
export const burgerData: CartItem[] = [
    { name: 'Special Taste', description: "Torta angus 1/4 de libra, tomate, cebolla morada, queso mozzarella, guacamole especial, papas gajo, aderezo chipotle.", basePrice: 5800, price: 5800, img: ImgSpecial, quantity: 1, available: true, category: 'dish', ingreds: ["tomate","cebolla","queso","guacamole"], extras: extraIngredients },
    { name: 'Chicago', description: "Pechuga de pollo, queso mozarella, tomate, lechuga, pepinillos, cebolla caramelizada, salsa ranch, papas gajo, aderezo chipotle.", basePrice: 5800, price: 5800, img: ImgChicago, quantity: 1, available: true, category: 'dish', ingreds: ["queso", "tomate", "pepinillos", "cebolla"], extras: extraIngredients },
    { name: 'Pulled Pork', description: "Carne mechada de cerdo en salsa barbacoa, tomate, queso mozarella, cebolla caramelizada, salsa ranch, papas gajo, aderezo chipotle.", basePrice: 5800, price: 5800, img: ImgPulledPork, quantity: 1, available: true, category: "dish", ingreds: ["queso", "tomate", "cebolla"], extras: extraIngredients },
    { name: 'Big One', description: "Torta angus 1/4 de libra, queso amarillo, tomate, cebolla morada, papas gajo.", basePrice: 5800, price: 5800, img: ImgBigOne, quantity: 1, available: true, category: "dish", ingreds: ["queso", "tomate", "cebolla"], extras: extraIngredients },
    { name: 'New York', description: "Torta de carne, queso mozarella, tomate, lechuga, pepinillo, cebolla caramelizada, salsa ranch, papas gajo, aderezo chipotle.", basePrice: 5000, price: 5000, img: ImgNewYork, quantity: 1, available: true, category: "dish", ingreds: ["queso", "tomate", "lechuga", "pepinillo", "cebolla"], extras: extraIngredients },
    { name: 'Italiana', description: "Pechuga de pollo, queso mozarella, tomate hojas de albahaca, salsa prego, pesto, salsa ranch, papas gajo, aderezo chipotle.", basePrice: 5800, price: 5800, img: ImgItaliana, quantity: 1, available: true, category: "dish", ingreds: ["queso", "tomate", "albahaca", "pesto"], extras: extraIngredients },
    { name: 'Mexicana', description: "Torta de res, cebolla caramelizada, queso mozarella, tomate, lechuga, chile jalapeño, papas gajo, aderezo chipotle.", basePrice: 5800, price: 5800, img: ImgMexicana, quantity: 1, available: true, category: "dish", ingreds: ["cebolla", "queso", "tomate", "lechuga", "chile"], extras: extraIngredients },
    { name: 'Sweet Explosion', description: "Torta angus 1/4 de libra, cebolla caramelizada, tomate, queso mozzarella, salsa BBQ, papas gajo, aderezo chipotle.", basePrice: 5800, price: 5800, img: ImgSweet, quantity: 1, available: true, category: "dish", ingreds: ["cebolla", "tomate", "queso"], extras: extraIngredients },
    { name: 'Papas regulares', description: null, basePrice: 1800, price: 1800, img: ImgFriesRectangle, quantity: 1, available: true, category: "sides", ingreds: [], extras:[] },
    { name: 'Papas gajo', description: null, basePrice: 1800, price: 1800, img: ImgFriesWedges, quantity: 1, available: true, category: "sides", ingreds: [], extras:[] },
    { name: 'Veggie', description: "Pan twings, torta de falafel, hongos, tomate, zucchini, aguacate, cebolla morada, salsa mostaza miel, papas gajo, aderezo chipotle.", basePrice: 6500, price: 6500, img: ImgVeggie, quantity: 1, available: true, category: "dish", ingreds: ["hongos", "tomate", "zucchini", "aguacate", "cebolla"], extras: extraIngredients },
    { name: 'Coca Cola Regular 600ml', description: null , basePrice: 1000, price: 1000, img: ImgCoca, quantity: 1, available: true, category: "beverage", ingreds: [], extras:[] },
    { name: 'Coca Cola (sin azúcar) 600ml', description: null, basePrice: 1000, price: 1000, img: ImgCocaSinAzucar, quantity: 1, available: true, category: "beverage", ingreds: [], extras:[] },
    { name: 'Tropical Melocotón 600ml', description: null, basePrice: 1000, price: 1000, img: ImgTropical, quantity: 1, available: true, category: "beverage", ingreds: [], extras:[] },
    { name: 'H2O 600ml', description: null, basePrice: 1000, price: 1000, img: ImgHtwoO, quantity: 1, available: true, category: 'beverage', ingreds: [], extras:[] },
    { name: 'Combo 4 Jinetes', description: "Elige una hamburguesa entre la New York, Chicago, Italiana o Mexicana + papas gajo y un refresco Tropical de 600ml.", basePrice: 5990, price: 5990, img: ImgComboFour, quantity: 1, available: true, category: 'combo', ingreds: [], extras: [] },
    { name: 'Combo Yankee Pack', description: "1 Chicago + 1 New York + 1 orden de Alitas de Pollo con 16 unidades y un refresco Tropical de 2.5l.", basePrice: 19900, price: 19900, img: ImgComboYankee, quantity: 1, available: true, category: 'combo', ingreds: [], extras: [] },
    { name: 'Alitas de Pollo (8uds)', description: "8 Alitas de Pollo con 3 opciones de salsas exquisitas: la picante Buffalo, la dulce y ahumada Barbacoa, y la suave y deliciosa Mostaza Miel acompañadas de 250g de crujientes papas fritas.", basePrice: 5900, price: 5900, img: ImgChickenWings8, quantity: 1, available: true, category: "dish", ingreds: [], extras: chickenWingsExtras },
    { name: 'Alitas de Pollo (16uds)', description: "16 Alitas de Pollo con 3 opciones de salsas exquisitas: la picante Buffalo, la dulce y ahumada Barbacoa, y la suave y deliciosa Mostaza Miel acompañadas de 400g de crujientes papas fritas.", basePrice: 9900, price: 9900, img: ImgChickenWings16, quantity: 1, available: true, category: "dish", ingreds: [], extras: chickenWingsExtras },
  ];