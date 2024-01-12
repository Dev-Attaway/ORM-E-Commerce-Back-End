// This line imports the necessary components (Model and DataTypes) from the Sequelize library Model
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// the Model class to define the Category model.
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
    sequelize,              // The database connection instance.
    timestamps: false,      // use the model's name as the table name (prevents Sequelize from pluralizing the model name)
    freezeTableName: true,  // Set to 'true' to use underscores in the table and column names.
    underscored: true,      // use underscores in the table and column names
    modelName: 'product',
  }
);

module.exports = Product;
