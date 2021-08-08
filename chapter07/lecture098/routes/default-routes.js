const express = require ( "express" );

const defaultController = require ( "../controllers/default-controller.js" );

const router = express.Router ();

// 404.html page not found
router.use ( defaultController.pageNotFound );

module.exports = router;