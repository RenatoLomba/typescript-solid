type CartItem = { name: string; price: number };
type CartStatus = 'open' | 'closed';

export class ShoppingCartLegacy {
  private readonly _items: CartItem[] = [];
  private _orderStatus: CartStatus = 'open';

  addItem(item: CartItem): void {
    this._items.push(item);
  }

  removeItem(index: number): void {
    this._items.splice(index, 1);
  }

  get items(): Readonly<CartItem[]> {
    return this._items;
  }

  get orderStatus(): Readonly<CartStatus> {
    return this._orderStatus;
  }

  total(): number {
    const sum = this._items.reduce((sum, next) => sum + next.price, 0);
    return Number(sum.toFixed(2));
  }

  checkout(): void {
    if (this.isEmpty()) {
      console.log('Empty cart');
      return;
    }

    this._orderStatus = 'closed';
    this.sendMessage(`Your order totaling $${this.total()} was received.`);
    this.saveOrder();
    this.clear();
  }

  isEmpty(): boolean {
    return this._items.length === 0;
  }

  sendMessage(msg: string): void {
    console.log(msg);
  }

  saveOrder(): void {
    console.log('Order saved!!!');
  }

  clear(): void {
    this._items.length = 0;
  }
}

const shoppingCart = new ShoppingCartLegacy();
shoppingCart.addItem({ name: 'T-Shirt', price: 49.9 });
shoppingCart.addItem({ name: 'Pants', price: 89.5 });
shoppingCart.addItem({ name: 'Hat', price: 15.49 });

shoppingCart.checkout();
