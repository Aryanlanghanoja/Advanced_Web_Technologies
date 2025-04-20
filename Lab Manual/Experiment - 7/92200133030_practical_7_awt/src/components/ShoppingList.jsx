import React, { useEffect, useState } from 'react';
import '../assets/css/ShoppingList.css';
import productimg from "../assets/product.jpg"

const ShoppingList = () => {
    const [products, setProducts] = useState([
        { id: 1, name: 'iPhone 12', price: 74999, category: 'Smartphones' },
        { id: 2, name: 'Samsung Galaxy S21', price: 59999, category: 'Smartphones' },
        { id: 3, name: 'MacBook Pro 16-inch', price: 179999, category: 'Laptops' },
        { id: 4, name: 'Dell XPS 15', price: 134999, category: 'Laptops' },
        { id: 5, name: 'Canon EOS 5D Mark IV', price: 187499, category: 'Cameras' },
        { id: 6, name: 'Sony PlayStation 5', price: 39999, category: 'Gaming Consoles' },
        { id: 7, name: 'Nintendo Switch', price: 23999, category: 'Gaming Consoles' },
        { id: 8, name: 'Samsung QLED 4K TV', price: 112499, category: 'Televisions' },
        { id: 9, name: 'Bose Noise Cancelling Headphones 700', price: 28499, category: 'Headphones' },
        { id: 10, name: 'Fitbit Charge 4', price: 11249, category: 'Wearable Technology' }
    ]);

    const categories = [...(new Set(products.map(product => product.category))).values()];

    const priceRanges = [
        { min: 0, max: 1000 },
        { min: 1001, max: 20000 },
        { min: 20001, max: 30000 },
        { min: 30001, max: 40000 },
        { min: 40001, max: 50000 },
    ];

    useEffect(() => {
        const updatedProducts = products.map((product) => {
            const priceIndex = priceRanges.findIndex(priceRange => product.price >= priceRange.min && product.price <= priceRange.max);
            return { ...product, 'index': priceIndex };
        }, []);

        setProducts(updatedProducts);
    }, [])

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedPriceRange, setSelectedPriceRange] = useState([]);

    const filteredProducts = products.filter((product) =>
        (selectedCategories.length === 0 && selectedPriceRange.length === 0) ||
        (selectedCategories.length !== 0 && selectedPriceRange.length === 0 && selectedCategories.includes(product.category)) ||
        (selectedCategories.length === 0 && selectedPriceRange.length !== 0 && selectedPriceRange.includes(product.index)) ||
        (selectedCategories.length !== 0 && selectedPriceRange.length !== 0 && selectedCategories.includes(product.category) && selectedPriceRange.includes(product.index))
    );

    const handleCategoryChange = (event) => {
        const category = event.target.value;
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter((c) => c !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const handlePriceRangeChange = (event) => {
        const index = parseInt(event.target.value);
        if (selectedPriceRange.includes(index)) {
            setSelectedPriceRange(selectedPriceRange.filter((c) => c !== index));
        } else {
            setSelectedPriceRange([...selectedPriceRange, index]);
        }
    };

    return (
        <div>
            <h2>Shopping item list with filters</h2>
            <div className="shopping-list">
                <div className="filters">
                    <div className="categories">
                        <h3>Categories:</h3>
                        {categories.map((category) => (
                            <div key={category}>
                                <label htmlFor={`category-${category.replace(/\s+/g, '-')}`}>
                                    <input
                                        type="checkbox"
                                        value={category}
                                        id={`category-${category.replace(/\s+/g, '-')}`}
                                        checked={selectedCategories.includes(category)}
                                        onChange={handleCategoryChange}
                                    />
                                    {category}
                                </label>
                            </div>
                        ))}
                    </div>
                    <div className="price-range">
                        <h3>Price Range:</h3>
                        {priceRanges.map((priceRange, index) => (
                            <div key={`$${priceRange.min}-$${priceRange.max}`}>
                                <label htmlFor={`price-range-${priceRange.min}-$${priceRange.max}`}>
                                    <input
                                        type="checkbox"
                                        value={index.toString()}
                                        id={`price-range-$${priceRange.min}-$${priceRange.max}`}
                                        checked={selectedPriceRange.includes(index)}
                                        onChange={handlePriceRangeChange}
                                    />
                                    {`Rs.${priceRange.min}-Rs.${priceRange.max}`}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="product-cards">
                    {filteredProducts.map((product) => (
                        <div className="product-card" key={product.id}>
                            <img src={productimg} alt={"Product Image"} />
                            <div className="product-details">
                                <h3>{product.name}</h3>
                                <div className="row">
                                    <p>{product.category}</p>
                                </div>
                                <p>{`Rs.${product.price.toLocaleString()}`}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShoppingList;