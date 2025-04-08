import { useState } from "react";
import "./App.css";
import CategoryPage from "./components/CategoryPage";
import ProductPage from "./components/ProductPage";

function App() {
  const [showCategoryPage, setShowCategoryPage] = useState(false);

  const toggleCategoryPage = () => {
    setShowCategoryPage(!showCategoryPage);
  };

  return (
    <div>
      <button onClick={toggleCategoryPage}>
        {showCategoryPage ? "Show Products" : "Add Category"}
      </button>
      {showCategoryPage ? <CategoryPage /> : <ProductPage />}
    </div>
  );
}

export default App;
