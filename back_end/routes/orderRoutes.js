const express = require('express');
const Order = require('../models/Order');
const auth = require('../middleware/auth');
const router = express.Router();

// Đặt lệnh mua/bán
router.post('/create', auth, async (req, res) => {
  try {
    const { stockSymbol, type, quantity, price } = req.body;
    const newOrder = new Order({
      userId: req.user.id,
      stockSymbol,
      type,
      quantity,
      price
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tạo lệnh' });
  }
});

// Lấy lịch sử giao dịch của người dùng
router.get('/history', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy lịch sử giao dịch' });
  }
});

// Hủy lệnh
router.put('/cancel/:orderId', auth, async (req, res) => {
  try {
    const order = await Order.findOne({ 
      _id: req.params.orderId, 
      userId: req.user.id 
    });

    if (!order) {
      return res.status(404).json({ message: 'Không tìm thấy lệnh' });
    }

    if (order.status !== 'PENDING') {
      return res.status(400).json({ message: 'Không thể hủy lệnh này' });
    }

    order.status = 'CANCELLED';
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi hủy lệnh' });
  }
});

module.exports = router;