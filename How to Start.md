# Hướng dẫn sử dụng:

1. **Chạy server:**
   ```bash
   npm run dev
   ```

2. **Các route API hiện có:**
   - Đăng ký: `POST /auth/register`
   - Đăng nhập: `POST /auth/login`
   - Lấy dữ liệu cổ phiếu: `GET /stocks/price/:symbol`

3. **Cấu hình MongoDB:**
   - Đảm bảo MongoDB đang chạy trên `localhost:27017` với database tên là `stock_trading`.

# Ghi chú:
- Đăng ký tài khoản trên [Alpha Vantage](https://www.alphavantage.co/) để nhận API key và thay thế `'your_alpha_vantage_api_key'` trong file `stockRoutes.js`.
#

stock-trading-app/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Stock.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── stockRoutes.js
│   │   └── orderRoutes.js
│   ├── services/
│   │   └── stockService.js
│   ├── .env
│   ├── package.json
│   └── index.js
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── services/
│       ├── store/
│       ├── App.js
│       └── index.js
│
└── README.md