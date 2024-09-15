/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from './LanguageContext'; // Import context hook

// Import flag images
import flagEn from '../assets/flags/gb-eng.svg';
import flagFr from '../assets/flags/fr.svg';
import flagEs from '../assets/flags/es.svg';
import flagAr from '../assets/flags/sa.svg';

const languageOptions = {
    en: { name: 'English', flag: flagEn },
    fr: { name: 'Français', flag: flagFr },
    es: { name: 'Español', flag: flagEs },
    ar: { name: 'العربية', flag: flagAr },
};

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [showLanguageMenu, setShowLanguageMenu] = useState(false);
    const { language, changeLanguage } = useLanguage();
    const { t } = useTranslation();

    const toggleMenu = () => setIsOpen(!isOpen);
    const toggleDropdown = (index) => {
        setDropdownOpen(dropdownOpen === index ? null : index);
    };
    const toggleLanguageMenu = () => setShowLanguageMenu(!showLanguageMenu);
    const handleLanguageChange = (lng) => {
        changeLanguage(lng);
        setShowLanguageMenu(false);
    };

    const parentMenuItems = [
        t('our_services'),
        t('recruitment_trip'),
        t('about_recruitment'),
        t('support'),
        t('join_us'),
        t('login')
    ];

    // Determine if the current language is Arabic
    const isArabic = language === 'ar';

    return (
        <nav className="bg-blue-600 relative">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                {/* Left section (language selector and navigation links) */}
                <div className={`flex items-center ${isArabic ? 'space-x-reverse space-x-4' : 'space-x-6'} flex-1 flex-nowrap`}>
                    {/* Language selector */}
                    <div className={`relative ${isArabic ? 'mr-10' : 'mr-6'}`}>
                        <button
                            className="text-white hover:text-gray-300 focus:outline-none flex items-center"
                            aria-label="Select Language"
                            onClick={toggleLanguageMenu}
                        >
                            <img src={languageOptions[language].flag} alt="Current Language" width="32" height="24" />
                            <span className="ml-2 text-white">{languageOptions[language].name}</span>
                        </button>
                        <div className={`absolute top-full ${isArabic ? 'right-0' : 'left-0'} mt-2 bg-white text-gray-800 shadow-lg w-48 ${showLanguageMenu ? 'block' : 'hidden'}`}>
                            {Object.keys(languageOptions).map((key) => (
                                <button
                                    key={key}
                                    onClick={() => handleLanguageChange(key)}
                                    className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center"
                                >
                                    <img src={languageOptions[key].flag} alt={languageOptions[key].name} width="20" height="15" /> 
                                    <span className="ml-2">{languageOptions[key].name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Desktop links section */}
                    <div className="hidden lg:flex flex-1">
                        <div className={`flex items-center ${isArabic ? 'space-x-reverse space-x-6' : 'space-x-6'} flex-nowrap`}>
                            {/* "Home" link positioned based on language */}
                            {isArabic && (
                                <div className="flex-none">
                                    <a href="#" className="text-white hover:text-gray-300 focus:outline-none">
                                        {t('home')}
                                    </a>
                                </div>
                            )}
                            {parentMenuItems.map((item, index) => (
                                <div key={index} className="relative flex-none">
                                    <button
                                        onClick={() => toggleDropdown(index)}
                                        className="text-white hover:text-gray-300 focus:outline-none"
                                    >
                                        {item}
                                    </button>
                                    {/* Dropdown for Parent link */}
                                    <div className={`${dropdownOpen === index ? 'block' : 'hidden'} absolute bg-white shadow-lg py-2 w-48 mt-1`}>
                                        {Array.from({ length: 4 }).map((_, childNum) => (
                                            <a
                                                key={childNum}
                                                href="#"
                                                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                            >
                                                {t('child')} {childNum + 1}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            {!isArabic && (
                                <div className="flex-none">
                                    <a href="#" className="text-white hover:text-gray-300 focus:outline-none">
                                        {t('home')}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Logo positioned on the right */}
                <div className="flex-none">
                    <img
                        src="https://via.placeholder.com/50"
                        alt="Logo"
                        className="w-12 h-12 object-contain"
                    />
                </div>

                {/* Mobile menu toggle button */}
                <div className="lg:hidden ml-4">
                    <button onClick={toggleMenu} className="text-white focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile menu (for small screens) */}
            <div className={`${isOpen ? 'block' : 'hidden'} lg:hidden`}>
                <div className="space-y-2 bg-blue-600 text-white px-4 py-4">
                    <a
                        href="#"
                        className="block px-4 py-2 text-white hover:bg-blue-700"
                    >
                        {t('home')}
                    </a>
                    {parentMenuItems.map((item, index) => (
                        <div key={index}>
                            <button
                                onClick={() => toggleDropdown(index)}
                                className="w-full text-left px-4 py-2 text-white hover:bg-blue-700 focus:outline-none"
                            >
                                {item}
                            </button>
                            {/* Mobile dropdown for Parent */}
                            <div className={`${dropdownOpen === index ? 'block' : 'hidden'} pl-4`}>
                                {Array.from({ length: 4 }).map((_, childNum) => (
                                    <a
                                        key={childNum}
                                        href="#"
                                        className="block px-4 py-2 text-gray-200 hover:bg-blue-800"
                                    >
                                        {t('child')} {childNum + 1}
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;