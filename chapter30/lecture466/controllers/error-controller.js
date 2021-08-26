const { AppError, ErrorType, logError } = require ( "../model/error-model.js" );

exports.handleError = ( error, request, response, next ) => {

    const appError = new AppError ( ErrorType.APPLICATION_ERROR, "An application error occurred" );

    logError ( appError, `An application error occurred due to ${error}` )

    response.status ( 500 )
        .json ( appError );
};