const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
  })
  .then(allCategoryData => {
    if(!allcatergoryData) {
      res.status(400).json({message: 'No categories found'});
      return;
    }
    res.json(allCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  })
    .then(oneCategory => {
      if(!oneCategory) {
        res.status(404).json({message: 'No categories found'});
        return;
      }
      res.json(oneCategory);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
});

router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
    .then(categoryAdd => res.json(categoryAdd))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(updateCategory => {
      if (!updateCategory) {
        res.status(404).json({message:'No category found with this id'});
        return;
      }
      res.json(updateCategory);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(delCategory => {
      if (!delCategory){
        res.status(404).json({message: 'No category found with that id.'});
        return;
      }
      res.json(delCategory);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
