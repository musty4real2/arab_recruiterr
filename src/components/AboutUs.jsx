/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react';
import '../assets/styles/AboutUs.css';
import AboutImg from '../assets/about.jpeg'
const AboutUs = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        if (sectionRef.current) {
            sectionRef.current.classList.add('animate');
        }
    }, []);

    return (
        <div ref={sectionRef} className="about-us-container">
            <div className="about-us-text">
                <h2>About Us</h2>
                <p>
                    We are a passionate team dedicated to providing exceptional services in recruitment, web development, and cybersecurity.
                    Our mission is to connect talent with opportunity, while ensuring the highest standards of security in every project we deliver.
                </p>
            </div>
            <div className="about-us-image">
                <img
                    src={AboutImg}
                    alt="About us"
                />
            </div>
        </div>
    );
};

export default AboutUs;