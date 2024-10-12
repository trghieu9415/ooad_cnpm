require('module-alias/register')
require('dotenv').config() // Load biến môi trường từ file .env
const express = require('express')
const morgan = require('morgan') // Logging requests
const routes = require('@routes/_index') // Import các routes của ứng dụng
const cors = require('cors') // Import CORS middleware
const app = express()
const PORT = process.env.PORT || 5000

app.use(cors()) // Cho phép tất cả các domain truy cập API
app.use(morgan('dev'))
app.use(express.json()) // Xử lý dữ liệu JSON từ body request

app.use('/', routes) // Sử dụng các routes trong thư mục routes

app.get('/', (req, res) => {
  res.send('Welcome to the API!')
})

// Lắng nghe máy chủ
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
