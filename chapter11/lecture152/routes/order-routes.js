const express = require ( "express" );

const orderController = require ( "../controllers/order-controller.js" );

const router = express.Router ();

router.get ( "/add-order-view", orderController.addOrderView );

router.post ( "/add-order", orderController.addOrder );

router.get ( "/orders-view", orderController.ordersView );

router.get ( "/order-detail-view/:orderId", orderController.orderDetailView );

module.exports = router;