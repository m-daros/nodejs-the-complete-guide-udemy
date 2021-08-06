const express = require ( "express" );

const app = express ();

app.use ( "/page1", ( request, response, next ) => {

    console.log ( "Opening /page1" )
    response.send ( "<h1>Page 1<h1>" )
} )

app.use ( "/page2", ( request, response, next ) => {

    console.log ( "Opening /page2" )
    response.send ( "<h1>Page 2<h1>" )
} )

app.use ( "/", ( request, response, next ) => {

    console.log ( `Request URL: ${request.url}` )
    console.log ( "No exlicit route was found, using default route" )
    response.send ( "<h1>This can be used as default page<h1>" )
} )

app.listen ( 3000 )