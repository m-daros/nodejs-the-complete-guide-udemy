const express = require ( "express" );
const bodyPrser = require ( "body-parser" );
const path = require ( "path" )

const projectRootFolder = require ( "./util/path.js" )

const productRoutes = require ( "./routes/product-routes.js" );
const customerRoutes = require ( "./routes/customer-routes.js" );

const app = express ();

// Use body parser on all the routes
app.use ( bodyPrser.urlencoded ( { extended: false } ) );

// Log request method and URL for every route
app.use ( ( request, response, next ) => {

    console.log ( `${request.method} ${request.url}` );
    next ();
} )

app.use ( productRoutes );
app.use ( customerRoutes );

// 404 error page
app.use ( "/", ( request, response, next ) => {

    const message = `URL not found: ${request.method} ${request.url}`;
    console.log ( message );

    response.status ( 404 )
        .sendFile ( path.join ( projectRootFolder, "views", "404.html" ) );
} )

app.listen ( 3000 );