exports.handleError = ( error, request, response, next ) => {

    console.error ( `An error occured: ${error}` );
    response.status ( 500 ).send ( "An error occurred" );
};