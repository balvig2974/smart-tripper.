// AlertComponent.js
import React, { useContext } from 'react';
import { ThemeContext } from './themeprovider'; // Adjust the import as needed

export const AlertComponent = ({ message, show }) => {
  const { isDarkMode } = useContext(ThemeContext); // Get theme context

  return (
    show && (
      <div className={`alert ${isDarkMode ? 'alert-dark' : 'alert-light'}`} role="alert">
        {message}
      </div>
    )
  );
};
