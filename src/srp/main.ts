import { Messaging } from './services/Messaging';
import { Order } from './entities/Order';
import { Persistency } from './services/Persistency';
import { Product } from './entities/Product';
import { ShoppingCart } from './entities/ShoppingCart';

const shoppingCart = new ShoppingCart();
const messaging = new Messaging();
const persist = new Persistency();
const order = new Order(shoppingCart, messaging, persist);

shoppingCart.addItem(new Product('T-Shirt', 49.9));
shoppingCart.addItem(new Product('Pants', 89.5));
shoppingCart.addItem(new Product('Hat', 15.49));

order.checkout();

console.log(`This order is ${order.orderStatus}.`);
