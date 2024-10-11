const cors = require('cors')
require('dotenv').config()

const corsMiddleware = cors({
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
})

module.exports = corsMiddleware
