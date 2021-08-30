import express from "express"
import bodyPrser from "body-parser"
import { body } from "express-validator"

import * as appController from "../controllers/app-controller"
import * as customerController from "../controllers/customer-controller"
import * as productController from "../controllers/product-controller"
import * as orderController from "../controllers/order-controller"
import * as errorController from "../controllers/error-controller"

export const router = express.Router ()

// Log request method and URL for every route
router.use ( appController.logRequest )

// Use body parser on all the routes parsing JSON
router.use ( bodyPrser.json () )

// Customer routes
router.get ( "/customers", customerController.getCustomers )

// Product routes
// TODO validation
router.post ( "/products", productController.addProduct )

router.get ( "/products", productController.getProducts )

router.get ( "/products/:productId", productController.getProduct )

// Order routes
// TODO validation
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