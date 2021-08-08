const express = require ( "express" );

const appController = require ( "../controllers/app-controller.js" );

const router = express.Router ();

router.use ( appController.pageNotFound );

module.exports = router;