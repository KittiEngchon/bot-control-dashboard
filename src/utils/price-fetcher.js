const axios = require('axios');

async function getMaticPriceUSD() {
  try {
    const res = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
      params: {
        ids: 'matic-network',
        vs_currencies: 'usd'
      }
    });

    return res.data['matic-network'].usd;
  } catch (err) {
    console.error('❌ Error fetching MATIC price:', err.message);
    return null;
  }
}

module.exports = { getMaticPriceUSD };

