const path = require ( "path" )

const projectRootFolder = require ( "../util/path.js" )

exports.pageNotFound = ( request, response, next ) => {

    const message = `URL not found: ${request.method} ${request.url}`;
    console.log ( message );

    response.status ( 404 )
        .sendFile ( path.join ( projectRootFolder, "views", "404.html" ) );
};