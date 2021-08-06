const express = require ( "express" );
const bodyPrser = require ( "body-parser" )

const app = express ();

var products = []

// Use body parser on all the routes
app.use ( bodyPrser.urlencoded ( { extended: false } ) )

// Log request method and URL for every route
app.use ( ( request, response, next ) => {

    console.log ( `${request.method} ${request.url}` )
    next ()
} )

app.get ( "/add-product-view", ( request, response, next ) => {

    response.send ( "<h1>Add product<h1><form method='POST' action='/add-product'><input type='text' name='name'/><button type='submit'>Add</button></form>" )
} )

app.post ( "/add-product", ( request, response, next ) => {

    console.log ( request.body )

    products.push ( request.body [ "name" ] )
    response.redirect ( "/products-view" )
} )

app.get ( "/products-view", ( request, response, next ) => {

    response.write ( "<h1>Products<h1>" )
    response.write ( "<ul>" )

    products.forEach ( product => {

        response.write ( `<li>${product}</li>` )
    } )

    response.write ( "</ul>" )
    response.write ( "<a href='/add-product-view'>Add a product</a>" )
    response.send ()
} )


app.get ( "/", ( request, response, next ) => {

    console.log ( "No exlicit route was found, using default route" )
    response.send ( "<h1>This can be used as default page<h1>" )
} )

app.listen ( 3000 )