require('module-alias/register');
require("dotenv").config(); // Load biến môi trường từ file .env
const express = require("express");
const morgan = require('morgan'); // Logging requests
const routes = require('@routes/_index'); // Import các routes của ứng dụng

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Xử lý dữ liệu JSON từ body request
app.use("/api", routes); // Sử dụng các routes trong thư mục routes


app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

app.use(morgan('combined'))

// Lắng nghe máy chủ
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
