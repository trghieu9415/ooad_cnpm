const { DataTypes } = require("sequelize");
const sequelize = require("@configs/database");

const Permission = sequelize.define(
  "Permission",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true, // Đặt làm khóa chính
    },
    required: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "permissions",
    timestamps: false,
  }
);

const getPermissions = async () => {
  try {
    const permissions = await Permission.findAll();
    return permissions;
  } catch (error) {
    return [
      { name: "upvote", required: 15 },
      { name: "comment", required: 50 },
      { name: "create_bounty", required: 75 },
      { name: "downvote", required: 125 },
      { name: "edit_post", required: 2000 },
    ];
  }
};

const actionObjs = await getPermissions();

const actions = actionObjs.reduce((obj, action) => {
  obj[action.name] = action.required;
  return obj;
}, {});

export default actions;
