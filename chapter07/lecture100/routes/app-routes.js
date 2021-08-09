const express = require ( "express" );
const bodyPrser = require ( "body-parser" );

const appController = require ( "../controllers/app-controller.js" );

const router = express.Router ();

// Log request method and URL for every route
router.use ( appController.logRequest );

// Use body parser on all the routes
router.use ( bodyPrser.urlencoded ( { extended: false } ) );

module.exports = router;