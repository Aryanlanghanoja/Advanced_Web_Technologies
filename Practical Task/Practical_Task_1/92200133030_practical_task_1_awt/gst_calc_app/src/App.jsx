import React, { useState } from "react";

const App = () => {
  const [price, setPrice] = useState("");
  const [gstPercent, setGstPercent] = useState("");

  const parsedPrice = parseFloat(price) || 0;
  const parsedGst = parseFloat(gstPercent) || 0;

  const igst = (parsedPrice * parsedGst) / 100;
  const cgst = igst / 2;
  const sgst = igst / 2;
  const totalAmount = parsedPrice + igst + sgst + cgst;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#74EBD5] to-[#ACB6E5] font-[Poppins] px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.2)] p-8 text-center transition duration-300 hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)]">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">GST Calculator</h2>

        <form className="space-y-4">
          <div className="text-left">
            <label className="block font-medium text-gray-700 mb-1">Enter Price (₹)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter original price"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] transition"
            />
          </div>

          <div className="text-left">
            <label className="block font-medium text-gray-700 mb-1">GST Percentage (%)</label>
            <input
              type="number"
              value={gstPercent}
              onChange={(e) => setGstPercent(e.target.value)}
              placeholder="Enter GST %"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] transition"
            />
          </div>
        </form>

        <div className="mt-6 p-4 bg-[#f4f4f4] rounded-lg shadow-md transition hover:shadow-lg text-center space-y-2">
          <p><strong>IGST:</strong> ₹{igst.toFixed(2)}</p>
          <p><strong>CGST:</strong> ₹{cgst.toFixed(2)}</p>
          <p><strong>SGST:</strong> ₹{sgst.toFixed(2)}</p>
          <p className="text-lg font-semibold text-[#007BFF] mt-2">
            Total Amount: ₹{totalAmount.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
