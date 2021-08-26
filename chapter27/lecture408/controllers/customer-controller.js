const { CustomerEntity } = require ( "../orm/sequelize/model/sequelize-orm-model.js" );
const { catchErrors } = require ( "../util/error-handling.js" );

exports.getCustomers = catchErrors ( async ( request, response, next ) => {

    try {

        const customers = await CustomerEntity.findAll ();

        response.status ( 200 ).json ( customers );
    }
    catch ( error ) {

        const appError = new AppError ( uuidv4 (), ErrorType.APPLICATION_ERROR, `Unable to get customers` );
        logError ( appError, `Unable to get customers due to error ${error}` );

        response.status ( 500 ).json ( appError );
    }
} );