// An instance of the Express Router class, which is used to define routes for handling different HTTP methods
const router = require('express').Router();

// destructuring assignment to extract specific objects: Product, Tag, and ProductTag.
const { Tag, Product, ProductTag } = require('../../models');

// The endpoint `/api/tags` 
// All routes use async and await to handle requests asynchronously
// Tag.findAll uses Sequelize to fetch all tags from the database
// include "Products" through their association
// Tag and Product's association is aliased as products and is define through "ProductTag" 
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{
        model: Product, through: ProductTag, as: 'products'
      }]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
    throw err;
  }
});

// find a single product by its `id`, 'id' is taken through the endpoint: /api/products/'id'
// "Tag.findByPk" uses Sequelize to fetch the Tag from the database based on req.params.id.
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{
        model: Product, through: ProductTag, as: 'products'
      }]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }

});

// The endpoint `/api/tags` 
// "Tag.create" uses Sequelize to create a new Tag with the data found in req.body
  /* req.body should look like this...
    {
      "tag_name": "Basketball"
    }
  */
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update Tag
// "Tag.update" uses Sequelize to fetch a find a single Tag by its `id`, 'id' is taken through the endpoint: /api/tags/'id'
// if (!tagData[0]): checks if the value of tagData[0] is falsy, which means that no records were updated
// If records were updated (the condition is false): and the Data Base is updated 
router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tagData[0]) {
      res.status(404).json({ message: 'No Tag with this id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a single tag by its `id`, 'id' is taken through the endpoint: /api/tag/'id'
// "Tag.destroy" uses Sequelize to DELETE a single tag based on the JSON response 
// Found within req.params.id
router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagData) {
      res.status(404).json({ message: 'No Tag with this id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
