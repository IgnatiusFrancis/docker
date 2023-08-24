const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../config/database");

const Post = sequelize.define("Post", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: {
        args: true,
        msg: "Title cannot be empty.",
      },
      async isTitleUnique(value) {
        const post = await Post.findOne({
          where: {
            title: value,
            id: {
              [Sequelize.Op.not]: this.id, // Exclude the current post's ID
            },
          },
        });

        if (post) {
          throw new Error("Title is already in use.");
        }
      },
    },
  },
  body: {
    type: DataTypes.STRING,
    allowNull: false,
    // unique: true,
    validate: {
      notEmpty: {
        args: true,
        msg: "Body cannot be empty.",
      },
    },
  },
  // ... other fields
});

module.exports = Post;
