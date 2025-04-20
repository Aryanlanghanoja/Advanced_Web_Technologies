import React from 'react';

export const Input = ({ value, onChange, placeholder, className = '', type = 'text' }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-[Poppins] ${className}`}
    />
  );
};
