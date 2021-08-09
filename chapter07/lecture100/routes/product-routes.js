const express = require ( "express" );

const productController = require ( "../controllers/product-controller.js" );

const router = express.Router ();

router.get ( "/add-product-view", productController.addProductView );

router.post ( "/add-product", productController.addProduct );

router.get ( "/products-view", productController.productsView );

module.exports = router;