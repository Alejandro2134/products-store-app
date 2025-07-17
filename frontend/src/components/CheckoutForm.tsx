import { useNavigate } from "react-router-dom";
import "../styles/CheckoutForm.css";
import type { FormEvent } from "react";

const CheckoutForm = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const res = await fetch(
      "https://api-sandbox.co.uat.wompi.dev/v1/tokens/cards",
      {
        headers: {
          Authorization: "Bearer pub_stagtest_g2u0HQd3ZMh05hsSgTS2lUV8t3s4mOt7",
        },
        body: JSON.stringify({
          number: "4242424242424242",
          cvc: "789",
          exp_month: "12",
          exp_year: "29",
          card_holder: "Pedro Pérez",
        }),
        method: "POST",
      }
    );

    const data = await res.json();
    console.log(data);
  };

  return (
    <div>
      <div className="wrapper">
        <div>
          <h1 className="page-title">Checkout</h1>
          <div className="form-container">
            <h2 className="form-title">Información del comprador</h2>
            <form onSubmit={handleSubmit} className="checkout-form">
              <label>
                Nombre completo
                <input type="text" placeholder="Juan Pérez" />
              </label>
              <label>
                Correo electrónico
                <input type="email" placeholder="juan@email.com" />
              </label>
              <label>
                Dirección
                <input type="text" placeholder="Calle 123 #45-67" />
              </label>
              <label>
                Ciudad
                <input type="text" placeholder="Bogotá" />
              </label>
              <label>
                Teléfono
                <input type="tel" placeholder="+57 300 123 4567" />
              </label>

              <h2 className="form-title">Información de pago</h2>

              <label>
                Número de tarjeta
                <input type="text" placeholder="4242 4242 4242 4242" />
              </label>
              <div className="card-row">
                <label>
                  Expira
                  <input type="text" placeholder="MM/YY" />
                </label>
                <label>
                  CVC
                  <input type="text" placeholder="123" />
                </label>
              </div>

              <button type="submit" className="buy-button">
                Pagar ahora
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
