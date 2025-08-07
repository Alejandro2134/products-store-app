export interface IProduct {
  id: number;
  stock: number;
  priceInCents: number;
  name: string;
  description: string;
  currency: string;
}

export interface IProductUpdate {
  stock?: number;
}

export class Product {
  private id: number;
  private stock: number;
  private priceInCents: number;
  private name: string;
  private description: string;
  private currency: string;

  constructor(item: IProduct) {
    this.id = item.id;
    this.stock = item.stock;
    this.priceInCents = item.priceInCents;
    this.name = item.name;
    this.description = item.description;
    this.currency = item.currency;
  }

  getId(): number {
    return this.id;
  }

  getStock(): number {
    return this.stock;
  }

  getPriceInCents(): number {
    return this.priceInCents;
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }

  getCurrency(): string {
    return this.currency;
  }

  reduceStock(
    quantity: number,
  ): { success: true } | { success: false; reason: string } {
    if (this.stock < quantity)
      return {
        success: false,
        reason: `Insufficient stock. Available: ${this.stock}`,
      };

    this.stock -= quantity;
    return { success: true };
  }

  addStock(
    quantity: number,
  ): { success: true } | { success: false; reason: string } {
    if (quantity < 0) {
      return {
        success: false,
        reason: 'Quantity to add must be a positive number',
      };
    }

    this.stock += quantity;
    return { success: true };
  }
}
