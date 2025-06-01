import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MaticPrice() {
  const [price, setPrice] = useState(null);
  const [error, setError] = useState(null);

  // ฟังก์ชันดึงราคาจาก backend
  const fetchPrice = async () => {
    try {
      const res = await axios.get('/api/price/matic');
      setPrice(res.data.price);
      setError(null);
    } catch (err) {
      setError('Failed to fetch price');
      setPrice(null);
    }
  };

  useEffect(() => {
    fetchPrice();
    const intervalId = setInterval(fetchPrice, 5000); // ดึงข้อมูลทุก 5 วินาที
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={{ fontFamily: 'Arial', padding: 20 }}>
      <h2>ราคา MATIC (Polygon)</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {price ? (
        <p style={{ fontSize: '1.5rem' }}>${price.toFixed(4)}</p>
      ) : (
        <p>Loading price...</p>
      )}
    </div>
  );
}

export default MaticPrice;
