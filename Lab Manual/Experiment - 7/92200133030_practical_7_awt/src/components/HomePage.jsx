import React, { useState } from 'react';
import ImageCarousel from './ImageCarousel';
import FaqAccordion from './FaqAccordion';
import ShoppingList from './ShoppingList';
import "../assets/css/HomePage.css";

const HomePage = () => {
    const [selectedComponent, setSelectedComponent] = useState('ImageCarousel');

    const renderComponent = () => {
        switch (selectedComponent) {
            case 'ImageCarousel':
                return <ImageCarousel />;
            case 'FaqAccordion':
                return <FaqAccordion />;
            case 'ShoppingList':
                return <ShoppingList />;
            default:
                return <ImageCarousel />;
        }
    };

    return (
        <div className="homepage-container">
            <div className="navigation-tabs">
                <button
                    className={`tab-button ${selectedComponent === 'ImageCarousel' ? 'active' : ''}`}
                    onClick={() => setSelectedComponent('ImageCarousel')}
                >
                    Image Carousel
                </button>
                <button
                    className={`tab-button ${selectedComponent === 'FaqAccordion' ? 'active' : ''}`}
                    onClick={() => setSelectedComponent('FaqAccordion')}
                >
                    FAQ / Accordion
                </button>
                <button
                    className={`tab-button ${selectedComponent === 'ShoppingList' ? 'active' : ''}`}
                    onClick={() => setSelectedComponent('ShoppingList')}
                >
                    Product List + Filters
                </button>
            </div>
            <div className="component-display">
                {renderComponent()}
            </div>
        </div>
    );
};

export default HomePage;
