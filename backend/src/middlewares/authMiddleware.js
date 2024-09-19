const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY

const authenticateAccount = (req, res, next) => {
  const token = req.headers['authorization'];
  
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized, no token provided' });
  }

  jwt.verify(token, secretKey, (err, member_id) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.member_id = member_id;
    req.account_id = account_id;
    next();
  });
};

module.exports = authenticateAccount;
