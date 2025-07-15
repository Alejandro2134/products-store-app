interface IProductDTO {
  id: number;
  stock: number;
  price: number;
  name: string;
  description: string;
}

export class ProductDTO {
  id: number;
  stock: number;
  price: number;
  name: string;
  description: string;

  constructor(item: IProductDTO) {
    this.id = item.id;
    this.stock = item.stock;
    this.price = item.price;
    this.name = item.name;
    this.description = item.description;
  }
}
