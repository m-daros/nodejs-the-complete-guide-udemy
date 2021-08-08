const express = require ( "express" );

exports.pageNotFound = ( request, response, next ) => {

    console.log ( `${request.method} ${request.url}` );
    next ();
};