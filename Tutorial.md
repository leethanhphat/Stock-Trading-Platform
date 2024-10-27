# 1. Khởi tạo dự án NodeJS:

```bash
npm init -y
```

# 2. Cài đặt các thư viện cần thiết:

```bash
npm install express mongoose jsonwebtoken bcryptjs
```

# 3. Cài đặt thư viện hỗ trợ phát triển:

```bash
npm install --save-dev nodemon
```

Cập nhật file `package.json` để sử dụng `nodemon` khi chạy server:

```json
"scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  }
```

# 4. Tạo file `index.js`:

```bash
touch index.js
```

# 5. Thiết lập server Express cơ bản:

```javascript
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// Kết nối đến MongoDB
mongoose.connect('mongodb://localhost:27017/stock_trading', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Kết nối MongoDB thành công');
}).catch((err) => {
  console.error('Lỗi kết nối MongoDB:', err);
});

// Route mặc định
app.get('/', (req, res) => {
  res.send('Backend API đang hoạt động!');
});

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});
```

# 6. Chạy server:

```bash
npm run dev
```

# 7. Tạo file `authRoutes.js`:

```bash
mkdir routes
touch routes/authRoutes.js
```

# 8. Cài đặt các route đăng ký và đăng nhập trong `authRoutes.js`:

```javascript
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import model User
const router = express.Router();

// Route đăng ký
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Kiểm tra nếu username đã tồn tại
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username đã tồn tại' });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 12);

    // Tạo người dùng mới
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({ message: 'Đăng ký thành công' });
  } catch (error) {
    return res.status(500).json({ message: 'Lỗi server' });
  }
});

// Route đăng nhập
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Tìm người dùng trong database
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Username không tồn tại' });
    }

    // Kiểm tra mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Mật khẩu không đúng' });
    }

    // Tạo token JWT
    const token = jwt.sign({ userId: user._id }, 'secretkey', { expiresIn: '1h' });

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: 'Lỗi server' });
  }
});

module.exports = router;
```

# 9. Tạo model `User`:

```bash
mkdir models
touch models/User.js
```

Trong file `User.js`:

```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
```

# 10. Kết nối route xác thực với `index.js`:

```javascript
const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);
```

# 11. Cài đặt `axios` để gọi API bên ngoài:

```bash
npm install axios
```

# 12. Tạo route để lấy dữ liệu cổ phiếu trong `stockRoutes.js`:

```bash
touch routes/stockRoutes.js
```

Trong `stockRoutes.js`:

```javascript
const express = require('express');
const axios = require('axios');
const router = express.Router();

// Route để lấy dữ liệu cổ phiếu
router.get('/price/:symbol', async (req, res) => {
  const { symbol } = req.params;

  try {
    const response = await axios.get(`https://www.alphavantage.co/query`, {
      params: {
        function: 'TIME_SERIES_INTRADAY',
        symbol,
        interval: '5min',
        apikey: 'your_alpha_vantage_api_key',
      },
    });

    const data = response.data;
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: 'Lỗi khi lấy dữ liệu cổ phiếu' });
  }
});

module.exports = router;
```

# 13. Kết nối route lấy dữ liệu cổ phiếu với `index.js`:

```javascript
const stockRoutes = require('./routes/stockRoutes');
app.use('/stocks', stockRoutes);
```

# 14. Tạo model `Order` và `Stock`:

```bash
touch models/Order.js
touch models/Stock.js
```

# 15. Định nghĩa schema cho `Order` trong `Order.js`:

```javascript
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  stockSymbol: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  orderType: { type: String, enum: ['buy', 'sell'], required: true },
  date: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
```

# 16. Định nghĩa schema cho `Stock` trong `Stock.js`:

```javascript
const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  symbol: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;
```

---
