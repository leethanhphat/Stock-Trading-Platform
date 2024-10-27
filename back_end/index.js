const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Kết nối database
connectDB();

// Route mặc định
app.get('/', (req, res) => {
  res.send('Backend API đang hoạt động!');
});

// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});

// routes cho authRoutes auth/resgister and auth/login
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

//routes lquan đến cổ phiếu
const stockRoutes = require('./routes/stockRoutes');
app.use('/api/stocks',stockRoutes);

const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders',orderRoutes);

// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/stocks', require('./routes/stockRoutes'));
// app.use('/api/orders', require('./routes/orderRoutes'));