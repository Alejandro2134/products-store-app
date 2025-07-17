import { useEffect, useState } from "react";
import "../styles/ProductPage.css";
import { Link } from "react-router-dom";

type Product = {
  id: number;
  stock: number;
  price_in_cents: number;
  name: string;
  description: string;
  currency: string;
};

type Props = {
  stock: number;
  price_in_cents: number;
  name: string;
  description: string;
  currency: string;
};

const ProductCard = ({
  stock,
  currency,
  description,
  name,
  price_in_cents,
}: Props) => {
  return (
    <div className="product-card">
      <div className="product-card-header">
        <h2 className="product-name">{name}</h2>
        <span className="product-price">
          ${price_in_cents / 100} {currency}
        </span>
      </div>

      <span className="product-stock">Stock disponible: {stock}</span>

      <p className="product-description">{description}</p>

      <Link to="/checkout">
        <button className="buy-button">Comprar</button>
      </Link>
    </div>
  );
};

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:3000/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1 className="page-title">Products</h1>

      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            currency={product.currency}
            description={product.description}
            name={product.name}
            price_in_cents={product.price_in_cents}
            stock={product.stock}
            key={product.id}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
