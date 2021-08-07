const express = require ( "express" );
const bodyPrser = require ( "body-parser" );

const app = express ();

// Use body parser on all the routes
app.use ( bodyPrser.urlencoded ( { extended: false } ) );

// Log request method and URL for every route
app.use ( ( request, response, next ) => {

    console.log ( `${request.method} ${request.url}` );
    next ();
} )

app.get ( "/page1", ( request, response, next ) => {

    response.send ( "<h1>Page 1</h1>" )
} );

app.get ( "/page2", ( request, response, next ) => {

    response.send ( "<h1>Page 2</h1>" )
} );

// 404 error page
app.use ( "/", ( request, response, next ) => {

    const message = `URL not found: ${request.method} ${request.url}`;
    console.log ( message );

    response.status ( 404 )
            .send ( `<h3>${message}<h3>` );
} )

app.listen ( 3000 );