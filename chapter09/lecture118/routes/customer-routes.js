const express = require ( "express" );

const customerController = require ( "../controllers/customer-controller.js" );

const router = express.Router ();

router.get ( "/customers-view", customerController.customersView );

module.exports = router;