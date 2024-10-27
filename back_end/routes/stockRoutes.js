const express = require('express');
const axios = require('axios');
const Stock = require('../models/Stock');
const router = express.Router();

// Middleware xác thực
const auth = require('../middleware/auth');

// Lấy thông tin cổ phiếu từ API bên ngoài
router.get('/quote/:symbol', auth, async (req, res) => {
  try {
    const { symbol } = req.params;
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=YOUR_API_KEY`
    );

    if (response.data['Global Quote']) {
      const quote = response.data['Global Quote'];
      const stockData = {
        symbol: quote['01. symbol'],
        price: parseFloat(quote['05. price']),
        change: parseFloat(quote['09. change']),
        changePercent: parseFloat(quote['10. change percent'])
      };
      res.json(stockData);
    } else {
      res.status(404).json({ message: 'Không tìm thấy thông tin cổ phiếu' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy dữ liệu cổ phiếu' });
  }
});

// Lấy danh sách cổ phiếu đang theo dõi
router.get('/watchlist', auth, async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server' });
  }
});

module.exports = router;