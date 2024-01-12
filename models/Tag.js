// This line imports the necessary components (Model and DataTypes) from the Sequelize library Model
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

// the Model class to define the Tag model. 
class Tag extends Model {}

Tag.init(
  {
    // The 'id' attribute is an integer, serves as the primary key, and is set to auto-increment.
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // Defines the characteristics of tag_name as a STRING and NOT NULL
    tag_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,              // The database connection instance.
    timestamps: false,      // use the model's name as the table name (prevents Sequelize from pluralizing the model name)
    freezeTableName: true,  // Set to 'true' to use underscores in the table and column names.
    underscored: true,      // use underscores in the table and column names
    modelName: 'tag',       // Specifies the model name
  }
);

module.exports = Tag;
