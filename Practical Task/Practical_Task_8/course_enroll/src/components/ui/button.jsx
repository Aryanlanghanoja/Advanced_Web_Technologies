import React from "react";

export function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition font-[Poppins] disabled:bg-gray-400 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
