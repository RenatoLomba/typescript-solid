import { Messaging } from '../services/Messaging';
import { Persistency } from '../services/Persistency';
import { CartStatus } from './protocols/CartStatus';
import { ShoppingCart } from './ShoppingCart';

export class Order {
  private _orderStatus: CartStatus = 'open';
  private readonly shoppingCart: ShoppingCart;
  private readonly messaging: Messaging;
  private readonly persist: Persistency;

  constructor(cart: ShoppingCart, messaging: Messaging, persist: Persistency) {
    this.shoppingCart = cart;
    this.messaging = messaging;
    this.persist = persist;
  }

  get orderStatus(): Readonly<CartStatus> {
    return this._orderStatus;
  }

  checkout(): void {
    if (this.shoppingCart.isEmpty()) {
      console.log('Empty cart');
      return;
    }

    this._orderStatus = 'closed';

    this.messaging.sendMessage(
      `Your order totaling $${this.shoppingCart.total()} was received.`,
    );

    this.persist.saveOrder();
    this.shoppingCart.clear();
  }
}
