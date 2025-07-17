import { Link } from "react-router-dom";
import "../styles/FinalStatus.css";

const FinalStatus = ({ success = true }) => {
  return (
    <div className="wrapper">
      <div className="status-container">
        {success ? (
          <>
            <div className="status-icon success">✅</div>
            <h1 className="status-title">¡Pago exitoso!</h1>
            <p className="status-message">
              Tu compra ha sido procesada correctamente. Recibirás un correo con
              la confirmación.
            </p>
            <Link to="/">
              <button className="buy-button">Volver a productos</button>
            </Link>
          </>
        ) : (
          <>
            <div className="status-icon error">❌</div>
            <h1 className="status-title">Pago fallido</h1>
            <p className="status-message">
              Hubo un problema procesando tu pago. Por favor, revisa tus datos e
              inténtalo de nuevo.
            </p>
            <Link to="/">
              <button className="buy-button error">Reintentar</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default FinalStatus;
