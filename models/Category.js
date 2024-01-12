// This line imports the necessary components (Model and DataTypes) from the Sequelize library Model
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

// the Model class to define the Category model. 
class Category extends Model {}

Category.init(
  {
    // Defines the characteristics of ID as an INTEGER, NOT NULL, a Primary Key, and is set to AUTO_INCREMENT
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    // Defines the characteristics of category_name as a STRING and NOT NULL
    category_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,              // The database connection instance.
    timestamps: false,      // use the model's name as the table name (prevents Sequelize from pluralizing the model name)
    freezeTableName: true,  // Set to 'true' to use underscores in the table and column names.
    underscored: true,      // use underscores in the table and column names
    modelName: 'category',
  }
);

module.exports = Category;
