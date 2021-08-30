// Log request method and URL for every route
export const logRequest = ( request, response, next ) => {

    console.log ( `${request.method} ${request.url}` )
    next ()
}