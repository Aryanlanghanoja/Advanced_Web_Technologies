import React from 'react';

export const Button = ({ children, onClick, className = '', type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-2xl shadow-md transition duration-200 ease-in-out ${className}`}
    >
      {children}
    </button>
  );
};
