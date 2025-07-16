export interface IProductDTO {
  id?: number;
  stock: number;
  price_in_cents: number;
  name: string;
  description: string;
  currency: string;
}

export class ProductDTO {
  id?: number;
  stock: number;
  price_in_cents: number;
  name: string;
  description: string;
  currency: string;

  constructor(item: IProductDTO) {
    this.id = item.id;
    this.stock = item.stock;
    this.price_in_cents = item.price_in_cents;
    this.name = item.name;
    this.description = item.description;
    this.currency = item.currency;
  }
}
