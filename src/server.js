// src/server.js (ตัวอย่าง)
const express = require('express');
const { getMaticPriceUSD } = require('./utils/price-fetcher');

const app = express();
const PORT = 3000;

app.get('/api/price/matic', async (req, res) => {
  const price = await getMaticPriceUSD();
  if (price) {
    res.json({ price });
  } else {
    res.status(500).json({ error: 'Cannot fetch price' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
