const express = require ( "express" );
const bodyPrser = require ( "body-parser" );
const productController = require ( "./routes/product-controller.js" );
const customerController = require ( "./routes/customer-controller.js" );

const app = express ();

// Use body parser on all the routes
app.use ( bodyPrser.urlencoded ( { extended: false } ) );

// Log request method and URL for every route
app.use ( ( request, response, next ) => {

    console.log ( `${request.method} ${request.url}` );
    next ();
} )

app.use ( productController );
app.use ( customerController );

app.use ( "/", ( request, response, next ) => {

    console.log ( "No exlicit route was found, using default route" );
    response.send ( "<h1>This can be used as default page<h1>" );
} )

app.listen ( 3000 );