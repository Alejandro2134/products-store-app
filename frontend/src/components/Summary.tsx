import { Link } from "react-router-dom";
import "../styles/Summary.css";

const Summary = () => {
  const product = {
    name: "Basic Tee",
    description: "Producto increíble",
    price: 40000,
    quantity: 2,
  };

  const baseFee = 2000;
  const deliveryFee = 5000;

  const subtotal = product.price * product.quantity;
  const total = subtotal + baseFee + deliveryFee;

  return (
    <div className="wrapper">
      <div className="summary-container">
        <h1 className="page-title">Resumen de la compra</h1>

        <div className="summary-card">
          <div className="summary-row">
            <span>
              {product.name} x {product.quantity}
            </span>
            <span>${subtotal.toLocaleString()} COP</span>
          </div>

          <div className="summary-row">
            <span>Base fee</span>
            <span>${baseFee.toLocaleString()} COP</span>
          </div>

          <div className="summary-row">
            <span>Delivery fee</span>
            <span>${deliveryFee.toLocaleString()} COP</span>
          </div>

          <hr />

          <div className="summary-row total">
            <span>Total</span>
            <span>${total.toLocaleString()} COP</span>
          </div>
        </div>

        <Link to="/status">
          <button className="buy-button">Confirmar pago</button>
        </Link>
      </div>
    </div>
  );
};

export default Summary;
