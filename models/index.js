// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
// 'category_id' is used to link the two tables
Product.belongsTo(Category, {
  foreignKey: 'category_id'
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
  // category is deleted, its associated products should also be deleted.
  onDelete: 'CASCADE',  
});

// Products belongToMany Tags (through ProductTag)
// 'product_id' is used to link the two tables
//  indicates that a product can have multiple tags, and vice versa.
Product.belongsToMany(Tag, {
  through: ProductTag,
  as: 'tags',
  foreignKey: 'product_id'
});

// Tags belongToMany Products (through ProductTag)
// 'tag_id' is used to link the two tables
//  indicates that a tag can have multiple products, and vice versa.
Tag.belongsToMany(Product, {
  through: ProductTag,
  as: 'products',
  foreignKey: 'tag_id'
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};