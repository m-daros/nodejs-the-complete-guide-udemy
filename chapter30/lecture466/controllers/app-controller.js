// Log request method and URL for every route
exports.logRequest = ( request, response, next ) => {

    console.log ( `${request.method} ${request.url}` )
    next ()
}