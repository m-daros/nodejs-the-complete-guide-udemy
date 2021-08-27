const { CustomerEntity } = require ( "../orm/sequelize/model/sequelize-orm-model" )
const { catchErrors } = require ( "../util/error-handling" )
const { AppError, ErrorType, logError } = require ( "../model/error-model" )

exports.getCustomers = catchErrors ( async ( request, response, next ) => {

    try {

        const customers = await CustomerEntity.findAll ()

        response.status ( 200 ).json ( customers )
    }
    catch ( error ) {

        const appError = new AppError ( ErrorType.APPLICATION_ERROR, `Unable to get customers` )
        logError ( appError, `Unable to get customers due to error ${error}` )

        response.status ( 500 ).json ( appError )
    }
} )