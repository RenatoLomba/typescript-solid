import { Messaging } from './services/Messaging';
import { Order } from './models/Order';
import { Persistency } from './services/Persistency';
import { Product } from './models/Product';
import { ShoppingCart } from './models/ShoppingCart';
import {
  // FiftyPercentDiscount,
  NoDiscount,
  // TenPercentDiscount,
} from './models/Discount';

// const fiftyPercentDiscout = new FiftyPercentDiscount();
// const tenPercentDiscount = new TenPercentDiscount();
const noDiscount = new NoDiscount();

const shoppingCart = new ShoppingCart(noDiscount);

const messaging = new Messaging();
const persist = new Persistency();

const order = new Order(shoppingCart, messaging, persist);

shoppingCart.addItem(new Product('T-Shirt', 49.9));
shoppingCart.addItem(new Product('Pants', 89.5));
shoppingCart.addItem(new Product('Hat', 15.49));

console.log(shoppingCart.totalWithDiscount());

order.checkout();

console.log(`This order is ${order.orderStatus}.`);
