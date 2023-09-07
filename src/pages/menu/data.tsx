import ImgBigOne from "../../assets/menu/bigone.png";
import ImgChicago from "../../assets/menu/chicago.png";
import ImgPulledPork from "../../assets/menu/pulled.png";
import ImgMexicana from "../../assets/menu/mexicana.png";
import ImgItaliana from "../../assets/menu/italiana.png";
import ImgSpecial from "../../assets/menu/special.png";
import ImgSweet from "../../assets/menu/sweet.png";
import ImgNewYork from "../../assets/menu/newyork.png";
import ImgVeggie from "../../assets/menu/veggie.png";
import ImgCoca from "../../assets/menu/coca.png";
import ImgCocaSinAzucar from "../../assets/menu/cocazucar.png";
import ImgTropical from "../../assets/menu/tropical.png";
import ImgHtwoO from "../../assets/menu/h2o.png";
import ImgFriesRectangle from "../../assets/menu/papas_rectangulo.png";
import ImgFriesWedges from "../../assets/menu/papas_gajo.png";
import { CartItem } from '../../types/index';

export const burgerData: CartItem[] = [
    { name: 'Special Taste', price: 5800, img: ImgSpecial, quantity: 1, available: true, category: "dish", extras:[] },
    { name: 'Chicago', price: 5800, img: ImgChicago, quantity: 1, available: true, category: "dish", extras:[] },
    /*{ name: 'Pulled Pork', price: 5800, img: ImgPulledPork, quantity: 1, available: true, category: "dish" },
    { name: 'Big One', price: 5800, img: ImgBigOne, quantity: 1, available: true, category: "dish" },
    { name: 'New York', price: 5000, img: ImgNewYork, quantity: 1, available: true, category: "dish" },
    { name: 'Italiana', price: 5800, img: ImgItaliana, quantity: 1, available: true, category: "dish" },
    { name: 'Mexicana', price: 5800, img: ImgMexicana, quantity: 1, available: true, category: "dish" },
    { name: 'Sweet Explosion', price: 5800, img: ImgSweet, quantity: 1, available: true, category: "dish" },
    { name: 'Orden de papas regulares 🍟', price: 1800, img: ImgFriesRectangle, quantity: 1, available: true, category: "sides" },
    { name: 'Orden de papas gajo 🍟', price: 1800, img: ImgFriesWedges, quantity: 1, available: true, category: "sides" },
    { name: 'Veggie', price: 6500, img: ImgVeggie, quantity: 1, available: false, category: "dish" },
    { name: 'Coca Cola Regular 600ml', price: 1000, img: ImgCoca, quantity: 1, available: true, category: "beverage" },
    { name: 'Coca Cola (sin azúcar) 600ml', price: 1000, img: ImgCocaSinAzucar, quantity: 1, available: true, category: "beverage" },
    { name: 'Tropical Melocotón 600ml', price: 1000, img: ImgTropical, quantity: 1, available: true, category: "beverage" },*/
    { name: 'H2O 600ml', price: 1000, img: ImgHtwoO, quantity: 1, available: true, category: "beverage", extras:[] }
  ];