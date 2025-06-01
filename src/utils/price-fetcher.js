const axios = require('axios');

async function getMaticPriceUSD() {
  try {
    const url = 'https://api.coingecko.com/api/v3/simple/price?ids=polygon&vs_currencies=usd';
    const res = await axios.get(url);
    return res.data.polygon.usd;
  } catch (error) {
    console.error('Error fetching MATIC price:', error.message);
    return null;
  }
}

module.exports = { getMaticPriceUSD };
