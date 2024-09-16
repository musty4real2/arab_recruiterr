import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from './LanguageContext';

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
    const [isOpen, setIsOpen] = React.useState(false);
    const [dropdownOpen, setDropdownOpen] = React.useState(null);
    const [showLanguageMenu, setShowLanguageMenu] = React.useState(false);
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
        t('home'),
        t('our_services'),
        t('recruitment_trip'),
        t('about_recruitment'),
        t('support'),
        t('join_us'),
        t('login')
    ];

    return (
        <nav className="bg-blue-600 fixed top-0 left-0 w-full z-50">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center flex-1">
                    <div className={`relative ${language === 'ar' ? 'mr-10' : 'mr-6'}`}>
                        <button
                            className="text-white hover:text-gray-300 focus:outline-none flex items-center"
                            aria-label="Select Language"
                            onClick={toggleLanguageMenu}
                        >
                            <img src={languageOptions[language].flag} alt="Current Language" width="32" height="24" />
                            <span className="ml-2 text-white">{languageOptions[language].name}</span>
                        </button>
                        <div className={`absolute top-full ${language === 'ar' ? 'right-0' : 'left-0'} mt-2 bg-white text-gray-800 shadow-lg w-48 ${showLanguageMenu ? 'block' : 'hidden'}`}>
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

                    <div className={`hidden lg:flex flex-1 ${language === 'ar' ? 'space-x-reverse space-x-6' : 'space-x-6'}`}>
                        {parentMenuItems.map((item, index) => (
                            <div key={index} className="relative">
                                <button
                                    onClick={() => toggleDropdown(index)}
                                    className="text-white hover:text-gray-300 focus:outline-none"
                                >
                                    {item}
                                </button>
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
                    </div>
                </div>

                <div className="flex-none">
                    <img
                        src="https://via.placeholder.com/50"
                        alt="Logo"
                        className="w-12 h-12 object-contain"
                    />
                </div>

                <div className="lg:hidden">
                    <button onClick={toggleMenu} className="text-white focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'} absolute top-full left-0 w-full bg-blue-600 text-white py-4 px-6`}>
                {parentMenuItems.map((item, index) => (
                    <div key={index} className="relative mb-2">
                        <button
                            onClick={() => toggleDropdown(index)}
                            className="w-full text-white hover:text-gray-300 focus:outline-none"
                        >
                            {item}
                        </button>
                        <div className={`${dropdownOpen === index ? 'block' : 'hidden'} bg-white text-gray-800 shadow-lg py-2 w-full mt-1`}>
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
            </div>
        </nav>
    );
};

export default NavBar;
