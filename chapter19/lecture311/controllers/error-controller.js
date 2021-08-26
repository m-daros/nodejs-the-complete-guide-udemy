var Promise = require ( "bluebird" )

exports.wrap = ( genFn ) => {

    var coRoutine = Promise.coroutine ( genFn )

    return ( request, response, next ) => {

        coRoutine ( request, response, next )
            .catch ( next )
    }
}

exports.handleError = ( error, request, response, next ) => {

    console.error ( `An error occured: ${error}` );
    response.status ( 500 ).send ( "An error occurred" );
};