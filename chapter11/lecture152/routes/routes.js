const express = require ( "express" );
const bodyPrser = require ( "body-parser" );

const appController = require ( "../controllers/app-controller.js" );
const customerController = require ( "../controllers/customer-controller.js" );
const productController = require ( "../controllers/product-controller.js" );
const orderController = require ( "../controllers/order-controller.js" );
const defaultController = require ( "../controllers/default-controller.js" );

const router = express.Router ();

// Log request method and URL for every route
router.use ( appController.logRequest );

// Use body parser on all the routes
router.use ( bodyPrser.urlencoded ( { extended: false } ) );

// Customer routes
router.get ( "/customers-view", customerController.customersView );

// Product routes
router.get ( "/add-product-view", productController.addProductView );

router.post ( "/add-product", productController.addProduct );

router.get ( "/products-view", productController.productsView );

router.get ( "/product-detail-view/:productId", productController.productDetailView );

// Order routes
router.get ( "/add-order-view", orderController.addOrderView );

router.post ( "/add-order", orderController.addOrder );

router.get ( "/orders-view", orderController.ordersView );

router.get ( "/order-detail-view/:orderId", orderController.orderDetailView );

// Default routes
// 404.html page not found
router.use ( defaultController.pageNotFound );

module.exports = router;