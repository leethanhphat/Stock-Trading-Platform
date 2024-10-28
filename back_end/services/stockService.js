const axios = require('axios');



const getStockQuote = async (symbol) => {
  try {
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`
    );
    return response.data;
  } catch (error) {
    throw new Error('Lỗi khi lấy dữ liệu cổ phiếu');
  }
};

module.exports = {
  getStockQuote
};