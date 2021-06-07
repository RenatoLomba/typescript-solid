import { Messaging } from '../services/Messaging';
import { Persistency } from '../services/Persistency';
import { CartStatus } from './protocols/CartStatus';
import { CustomerOrder } from './protocols/CustomerProtocol';
import { ShoppingCart } from './ShoppingCart';

export class Order {
  private _orderStatus: CartStatus = 'open';
  private readonly shoppingCart: ShoppingCart;
  private readonly messaging: Messaging;
  private readonly persist: Persistency;
  private readonly customer: CustomerOrder;

  constructor(
    cart: ShoppingCart,
    messaging: Messaging,
    persist: Persistency,
    customer: CustomerOrder,
  ) {
    this.shoppingCart = cart;
    this.messaging = messaging;
    this.persist = persist;
    this.customer = customer;
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
      `Your order totaling $${this.shoppingCart.totalWithDiscount()} was received.`,
    );

    this.persist.saveOrder();
    this.shoppingCart.clear();

    console.log(
      `Cliete: ${this.customer.getName()}; \nNº Identificação: ${this.customer.getIDN()}`,
    );
  }
}
