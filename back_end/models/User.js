const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  balance: { 
    type: Number, 
    default: 100000 // Số dư ban đầu
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('User', userSchema);

// Thêm một số cổ phiếu mẫu
db.stocks.insertMany([
  {
    username: "tranducb",
    password: "qwerty",
    balance: 200000,
    createdAt: ISODate("2022-01-02T00:00:00.000Z")
  },
  {
    username: "lethanhc",
    password: "abc123",
    balance: 100000,
    createdAt: ISODate("2022-01-03T00:00:00.000Z")
  },
  {
    username: "nguyentd",
    password: "def456",
    balance: 250000,
    createdAt: ISODate("2022-01-04T00:00:00.000Z")
  }
])

// Tạo indexes
db.users.createIndex({ "username": 1 }, { unique: true })
db.stocks.createIndex({ "symbol": 1 }, { unique: true })
db.portfolios.createIndex({ "userId": 1, "stockSymbol": 1 }, { unique: true })
