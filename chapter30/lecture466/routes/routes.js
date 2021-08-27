const express = require ( "express" )
const bodyPrser = require ( "body-parser" )
const { body } = require ( "express-validator" )

const appController = require ( "../controllers/app-controller" )
const customerController = require ( "../controllers/customer-controller" )
const productController = require ( "../controllers/product-controller" )
const orderController = require ( "../controllers/order-controller" )
const errorController = require ( "../controllers/error-controller" )

const router = express.Router ()

// Log request method and URL for every route
router.use ( appController.logRequest )

// Use body parser on all the routes parsing JSON
router.use ( bodyPrser.json () )

// Customer routes
router.get ( "/customers", customerController.getCustomers )

// Product routes
router.post ( "/products", productController.addProduct ) // TODO validation

router.get ( "/products", productController.getProducts )

router.get ( "/products/:productId", productController.getProduct )

// Order routes
router.post ( "/orders",
//    body ( "customerId" ).isNumeric (),
//    body ( "quantity" ).isNumeric (), // Validate quantity (SEMBRA NIN FUNZIONARE)
//    body ( "products/order_product/quantity" ).isNumeric (), // Validate quantity (SEMBRA NIN FUNZIONARE)
    orderController.addOrder )

router.get ( "/orders", orderController.getOrders )

router.get ( "/orders/:orderId", orderController.getOrder )

// Default routes

// Default error handling routes (runs in case of an unhandled error)
router.use ( errorController.handleError )

module.exports = router