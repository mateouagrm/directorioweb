import {combineReducers} from 'redux';
import Home from "./home";
import Product from "./product";
import Catalog from "./catalog";
import Auth from "./auth";
import Cart from "./carrito";
import Location from "./location";
import Payment from "./payment";
import User from "./user";
export default combineReducers({
    Home,
    Product,
    Catalog,
    Auth,
    User,
    Cart,
    Location,
    Payment
});