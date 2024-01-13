// An instance of the Express Router class, which is used to define routes for handling different HTTP methods
const router = require('express').Router();

// destructuring assignment to extract specific objects: Product, Tag, and ProductTag.
const { Category, Product } = require('../../models');

// The endpoint: /api/categories
// All routes use async and await to handle requests asynchronously
// Category.findAll uses Sequelize to fetch all Categories from the database
// include "Product" associated data for each Category
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product}],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
    throw err;
  }
});

// Find a single product by its `id`, 'id' is taken through the endpoint: /api/categories/'id'
// "Category.findByPk" uses Sequelize to fetch the Tag from the database based on req.params.id.
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product}],
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No library card found with that id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
    throw err;
  }
});

// The endpoint `/api/categories` 
// "Tag.create" uses Sequelize to create a new Tag with the data found in req.body
  /* req.body should look like this...
    {
      "category_name": "Basketball"
    }
  */
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update Category
// "Category.update" uses Sequelize to fetch a find a single Tag by its `id`, 'id' is taken through the endpoint: /api/tags/'id'
// if (!categoryData[0]): checks if the value of categoryData[0] is falsy, which means that no records were updated
// If records were updated (the condition is false): and the Data Base is updated 
router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData[0]) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a single Category by its `id`, 'id' is taken through the endpoint: /api/categories/'id'
// "Tag.destroy" uses Sequelize to DELETE a single Category based on the JSON response 
// Found within req.params.id
router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No Category with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    throw err;
    res.status(500).json(err);
  }
});

module.exports = router;
