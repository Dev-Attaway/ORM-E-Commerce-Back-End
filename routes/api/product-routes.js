// An instance of the Express Router class, which is used to define routes for handling different HTTP methods (e.g., GET, POST) 
const router = require('express').Router();

// destructuring assignment to extract specific objects: Product, Category, Tag, and ProductTag.
const { Product, Category, Tag, ProductTag } = require('../../models');

// The endpoint: `/api/products` 
// All, except PUT, routes use async and await to handle requests asynchronously
// "Product.findAll" uses Sequelize to fetch all products from the database.
//  includes associations with other models(Category, Tag, and ProductTag).
// 'attributes: ['tag_name']' Specifies that only the 'tag_name' attribute of the Tag model should be included in the result.
// 'through: ProductTag' Specifies ProductTag that represents the association between Product and Tag.
// as: 'tags' refers to the alias created for the realtionships Tag and ProductTag found in the models/index
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll({
      include: [{ model: Category }, { model: Tag, attributes: ['tag_name'], through: ProductTag, as: 'tags' }]
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

// get one product  
// find a single product by its `id`, 'id' is taken through the endpoint: /api/products/'id'
// "Product.findByPk" uses Sequelize to fetch the product from the database based on req.params.id.
router.get('/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag, attributes: ['tag_name'], through: ProductTag, as: 'tags' }]
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
    throw err;
  }
});

// create new product
// endpoint: `/api/products` 
// "Product.create" uses Sequelize to create a new product with the data found in req.body
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
router.post('/', async (req, res) => {
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
// "Product.update" uses Sequelize to fetch a find a single product by its `id`, 'id' is taken through the endpoint: /api/products/'id'
router.put('/:id', (req, res) => {
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {

      //  checks if there are new tag IDs in the request body (req.body.tagIds) and if the array has a length greater than zero (truthy)
      if (req.body.tagIds && req.body.tagIds.length) {

        // If there are new tag IDs, it uses ProductTag.findAll to fetch all existing ProductTag associations for the specified product
        // (product_id obtained from req.params.id).
        ProductTag.findAll({
          where: { product_id: req.params.id }
        }).then((productTags) => {

          // It creates a list of existing tag_ids associated with the product (productTagIds).
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
            
             // It filters the new tagIds to identify tags that are not already associated (newProductTags).
            // For each new tag, it creates an object with the product_id and tag_id.
            .filter((tag_id) => !productTagIds.includes(tag_id))
            .map((tag_id) => {
              return {
                product_id: req.params.id,
                tag_id,
              };
            });
          // figure out which ones to remove
          const productTagsToRemove = productTags
            
            // It filters existing productTags to identify tags that are not present in the updated tagIds. 
            // It creates a list of ids of the ProductTag associations that need to be removed(productTagsToRemove).
            .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
            .map(({ id }) => id);
          // run both actions
          return Promise.all([

            // Deletes the specified ProductTag associations identified for removal.
            ProductTag.destroy({ where: { id: productTagsToRemove } }),

            // BulkCreate a Sequelize method that takes an array of objects and creates corresponding records in the ProductTag
            // Creates new ProductTag associations for the newly added tags.
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }
      return res.json(product);
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

// DELETE a single product by its `id`, 'id' is taken through the endpoint: /api/products/'id'
// "Product.destroy" uses Sequelize to DELETE a single product based on the JSON response 
// Found within req.params.id
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No Product with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
