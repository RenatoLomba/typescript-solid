import { CartItem } from './protocols/CartItem';

export class ShoppingCart {
  private readonly _items: CartItem[] = [];

  addItem(item: CartItem): void {
    this._items.push(item);
  }

  removeItem(index: number): void {
    this._items.splice(index, 1);
  }

  get items(): Readonly<CartItem[]> {
    return this._items;
  }

  total(): number {
    const sum = this._items.reduce((sum, next) => sum + next.price, 0);
    return Number(sum.toFixed(2));
  }

  clear(): void {
    this._items.length = 0;
  }

  isEmpty(): boolean {
    return this._items.length === 0;
  }
}
