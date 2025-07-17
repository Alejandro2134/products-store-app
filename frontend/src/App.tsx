import "./App.css";
import FinalStatus from "./components/FinalStatus";
import { Routes, Route } from "react-router-dom";
import ProductPage from "./components/ProductPage";
import CheckoutForm from "./components/CheckoutForm";
import Summary from "./components/Summary";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProductPage />} />

      <Route path="/checkout" element={<CheckoutForm />} />

      <Route path="/summary" element={<Summary />} />

      <Route path="/status" element={<FinalStatus />} />
    </Routes>
  );
}

export default App;
