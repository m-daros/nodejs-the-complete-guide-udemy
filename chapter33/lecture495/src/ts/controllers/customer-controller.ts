import { CustomerEntity } from "../orm/sequelize/model/customer-entity"
import { catchErrors } from "../util/error-handling"
import { AppError, ErrorType, logError } from "../model/error-model"

export const getCustomers = catchErrors ( async ( request, response, next ) => {

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