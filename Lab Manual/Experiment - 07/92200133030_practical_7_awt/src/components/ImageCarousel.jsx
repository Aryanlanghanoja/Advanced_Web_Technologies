import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from '../assets/images/img1.jpg';
import img2 from '../assets/images/img2.jpg';
import img3 from '../assets/images/img3.jpg';

const ImageCarousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        appendDots: (dots) => (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    position: 'absolute',
                    bottom: '10px',
                    left: 0,
                    right: 0,
                }}
            >
                {dots}
            </div>
        ),
    };

    const images = [
        img1,
        img2,
        img3,
    ];

    return (
        <div>
            <h2>Image Carousel</h2>
            <div style={{ width: '500px', margin: 'auto' }}>
                <Slider {...settings}>
                    {images.map((image, index) => (
                        <div key={index} style={{ display: 'flex', justifyContent: 'center' }}>
                            <img src={image} alt={`Slide ${index}`} style={{ width: '500px', height: '300px' }} />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default ImageCarousel;