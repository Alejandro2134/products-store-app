interface IProduct {
  id: number;
  stock: number;
  price: number;
  name: string;
  description: string;
}

export class Product {
  private id: number;
  private stock: number;
  private price: number;
  private name: string;
  private description: string;

  constructor(item: IProduct) {
    this.id = item.id;
    this.stock = item.stock;
    this.price = item.price;
    this.name = item.name;
    this.description = item.description;
  }

  getId(): number {
    return this.id;
  }

  getStock(): number {
    return this.stock;
  }

  getPrice(): number {
    return this.price;
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }
}
