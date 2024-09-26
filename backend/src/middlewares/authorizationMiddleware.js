const { getReputationById } = require("@entities/eMember");

const authorize = async (requiredReputation) => {
  return (req, res, next) => {
    const member_id = req.member_id;

    if (!member_id) {
      return res
        .status(401)
        .json({ message: "Unauthorized, user not authenticated" });
    }

    try {
      const reputation = getReputationById(member_id);
      if (reputation < requiredReputation) {
        return res.status(403).json({
          message: `Insufficient reputation. Requires at least ${requiredReputation} reputation`,
        });
      }
      req.reputation = reputation;
      next();
    } catch (e) {
      return res.status(404).json({ error: e.message });
    }
  };
};

module.exports = authorize;
