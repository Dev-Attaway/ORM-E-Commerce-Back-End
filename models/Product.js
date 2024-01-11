// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config/connection.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // Defines the characteristics of ID as an INTEGER, NOT NULL, a Primary Key, and is set to AUTO_INCREMENT
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Defines the characteristics of product_name as a STRING and NOT NULL
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      // DECIMAL data type that has up to P digits and D decimal places
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    },    

    // Defines the characteristics of ID as an INTEGER, NOT NULL, and its defaultValue = 10
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
    },

    // Defines the characteristics of ID as an INTEGER and references
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'category',
        key: 'id',
        unique: false,
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
