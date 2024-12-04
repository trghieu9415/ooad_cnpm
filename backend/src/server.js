require('module-alias/register')
require('dotenv').config() // Load biến môi trường từ file .env
const YAML = require('yamljs') // Import YAML parser
const swaggerUi = require('swagger-ui-express')
const express = require('express')
const morgan = require('morgan') // Logging requests
const routes = require('@routes/_index') // Import các routes của ứng dụng
const routesAdmin = require('@routes/admin/index') // Import các routes của ứng dụng

const cors = require('cors') // Import CORS middleware
const app = express()
const PORT = process.env.PORT || 5000

app.use(cors()) // Cho phép tất cả các domain truy cập API
app.use(morgan('dev'))
app.use(express.json()) // Xử lý dữ liệu JSON từ body request

const swaggerDocument = YAML.load('./src/api.yml') // Đường dẫn tới file Swagger YAML
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use('/', routes) // Sử dụng các routes trong thư mục routes
app.use('/admin', routesAdmin) // Sử dụng các routes trong thư mục routes

app.get('/', (req, res) => {
  res.send('Welcome to the API!')
})

// Lắng nghe máy chủ
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
  console.log(`API documentation available at http://localhost:${PORT}/api-docs`)
})
