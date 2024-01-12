// This line imports the necessary components (Model and DataTypes) from the Sequelize library Model
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// the Model class to define the Category model. 
class ProductTag extends Model {}

ProductTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // Defines the characteristics of ID as an INTEGER and references
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'product',
        key: 'id',
        unique: false
      }
    },
    // Defines the characteristics of ID as an INTEGER and references
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tag',
        key: 'id',
        unique: false
      }
    }
  },
  {
    sequelize,              // The database connection instance.
    timestamps: false,      // use the model's name as the table name (prevents Sequelize from pluralizing the model name)
    freezeTableName: true,  // Set to 'true' to use underscores in the table and column names.
    underscored: true,      // use underscores in the table and column names
    modelName: 'productTag',
  }
);

module.exports = ProductTag;
