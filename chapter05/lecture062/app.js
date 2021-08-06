const express = require ( "express" );

const app = express ();

app.use ( ( request, response, next ) => {

    console.log ( "I'm the first middleware" )
    next ()
} )

app.use ( ( request, response, next ) => {

    console.log ( "I'm the second middleware" )
    response.send ( "<h1>I'm using Express.js !!<h1>" )
} )

app.listen ( 3000 )