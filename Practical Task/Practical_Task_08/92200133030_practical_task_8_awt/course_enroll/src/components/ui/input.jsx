import React from "react";

export function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-[Poppins] ${className}`}
      {...props}
    />
  );
}
