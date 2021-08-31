import CustomerEntity from "../orm/sequelize/model/customer-entity"
import { AppError, ErrorType, logError } from "../model/error-model"

export class CustomerController {

    getCustomers = async ( request, response, next ) => {

        try {

            // TODO Inject CustomerEntity
            const customers = await CustomerEntity.findAll () as CustomerEntity []

            response.status ( 200 ).json ( customers )
        }
        catch ( error ) {

            const appError = new AppError ( ErrorType.APPLICATION_ERROR, `Unable to get customers` )
            logError ( appError, `Unable to get customers due to error ${error}` )

            response.status ( 500 ).json ( appError )
        }
    }
}