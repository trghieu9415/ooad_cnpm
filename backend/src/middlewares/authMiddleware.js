const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY
const refreshKey = process.env.REFRESH_KEY

const authenticateAccount = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized, no token provided' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized, no token provided' });
  }

  jwt.verify(token, secretKey, (err, decodedToken) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(403).json({ message: 'Token expired' });
      } else {
        return res.status(403).json({ message: 'Invalid token' });
      }
    }

    req.member_id = decodedToken.member_id;
    req.account_id = decodedToken.account_id;
    next();
  });
};

module.exports = authenticateAccount;

