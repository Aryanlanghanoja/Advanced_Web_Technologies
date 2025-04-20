import React, { useState, useEffect } from 'react';
import axiosInstance from './api/axiosInstance';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Card, CardContent } from './components/ui/card';
import { motion } from 'framer-motion'; // ✅ Add this line


export default function App() {
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);

  // Fetch all items or filtered items
  const fetchItems = async (query = '') => {
    try {
      const res = query
        ? await axiosInstance.get(`/items/search?keyword=${query}`)
        : await axiosInstance.get('/items');
      setItems(res.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchItems(search);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  const getTotal = () => cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-[Poppins]">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1 className="text-2xl font-semibold mb-4">Search Items</h1>
          <Input
            placeholder="Search for items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-4"
          />
          <div className="space-y-3">
            {items.map((item) => (
              <Card key={item.id} className="flex justify-between items-center p-4">
                <CardContent className="text-lg">{item.name} - ₹{item.price}</CardContent>
                <Button onClick={() => addToCart(item)}>Add</Button>
              </Card>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
          <h1 className="text-2xl font-semibold mb-4">Cart</h1>
          <div className="space-y-3">
            {cart.map((item, index) => (
              <Card key={index} className="flex justify-between items-center p-4">
                <CardContent className="text-lg">{item.name} - ₹{item.price}</CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-6 text-xl font-semibold">Total: ₹{getTotal()}</div>
          <Button className="mt-4 w-full">Generate Bill</Button>
        </motion.div>
      </div>
    </div>
  );
}
