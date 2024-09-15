/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import NavBar from './components/Navbar';
import { LanguageProvider } from './components/LanguageContext';
import '../src/i18n.js'; // Ensure this line is present to initialize i18next


const App = () => {
  const { i18n } = useTranslation();

  // Function to change the language
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  // Change the direction to RTL for Arabic
  useEffect(() => {
    document.body.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  return (
    <LanguageProvider>
      <NavBar changeLanguage={changeLanguage} />
      <div style={{ padding: '20px', textAlign: i18n.language === 'ar' ? 'right' : 'left' }}>
        {/* Your content here */}
      </div>
    </LanguageProvider>
  );
};

export default App;
