import './App.css'
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductDetails from "./components/ProductDetails";
import Aboutus from "./components/Aboutus";
import MasterLayout from "./components/MasterLayout";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MasterLayout/>} />
          <Route path="/home" index element={<Home />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/proddetails" element={<ProductDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
