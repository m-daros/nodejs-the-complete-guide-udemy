exports.AppError = class AppError {

    constructor ( id, type, message ) {

        this.id = id;
        this.type = type;
        this.message = message;
    }
};

exports.ErrorType = {

    VALIDATION_ERROR:           "validation-error",
    APPLICATION_ERROR:          "application-error",
    RESOURCE_NOT_FOUND_ERROR:   "resource-not-found-error"
};

exports.logError = ( appError, message ) => {

    console.error ( `errorId: ${appError.id}, message: ${message}` )
};