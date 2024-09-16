/* eslint-disable no-unused-vars */
// components/SliderSection.jsx
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next'; // Import useTranslation from i18n
import '../assets/styles/Slider.css'; // Import custom CSS for slider
import Slider1 from '../assets/pikaso1.jpeg';
import Slider2 from '../assets/pikaso2.jpeg';
import Slider3 from '../assets/pikaso3.jpeg';

const slides = [
    {
        id: 1,
        image: Slider1, // Use imported image instead of placeholder
        headlineKey: 'slide1_headline',
        textKey: 'slide1_text',
    },
    {
        id: 2,
        image: Slider2, // Use another imported image
        headlineKey: 'slide2_headline',
        textKey: 'slide2_text',
    },
    {
        id: 3,
        image: Slider3,
        headlineKey: 'slide3_headline',
        textKey: 'slide3_text',
    },
];

const SliderSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const { t } = useTranslation(); // Initialize useTranslation

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval);
    }, []);

    const handlePrevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
    };

    const handleNextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    };

    return (
        <div className="slider-section relative">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`slider-slide ${currentSlide === index ? 'active' : ''}`}
                    style={{ backgroundImage: `url(${slide.image})` }}
                >
                    <div className={`slider-text ${currentSlide === index ? 'fade-in' : ''}`}>
                        <h1 style={{
                            color: '#000000',
                            backgroundColor: 'rgba(255, 255, 255, 0.5)',
                            padding: '10px',
                            borderRadius: '5px'
                        }}>
                            {t(slide.headlineKey)}</h1>
                        <p style={{
                            color: '#000000',
                            backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                            padding: '15px', 
                            borderRadius: '8px', 
                            fontSize: '18px',  
                            lineHeight: '1.5'  
                        }}>
                            {t(slide.textKey)}
                        </p>

                    </div>
                </div>
            ))}
            {/* Left and Right Arrow */}
            <button className="slider-arrow left-arrow" onClick={handlePrevSlide}>
                &#10094;
            </button>
            <button className="slider-arrow right-arrow" onClick={handleNextSlide}>
                &#10095;
            </button>
        </div>
    );
};

export default SliderSection;