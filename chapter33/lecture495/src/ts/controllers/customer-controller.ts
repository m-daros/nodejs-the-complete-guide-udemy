import CustomerEntity from "../orm/sequelize/model/customer-entity"
import { catchErrors } from "../util/error-handling"
import { AppError, ErrorType, logError } from "../model/error-model"

export class CustomerController {

    // customerEntity: CustomerEntity
    //
    // constructor ( customerEntity: CustomerEntity ) {
    //
    //     this.customerEntity = customerEntity
    // }

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

// export const getCustomers = catchErrors ( async ( request, response, next ) => {
//
//     try {
//
//         const customers = await CustomerEntity.findAll ()
//
//         response.status ( 200 ).json ( customers )
//     }
//     catch ( error ) {
//
//         const appError = new AppError ( ErrorType.APPLICATION_ERROR, `Unable to get customers` )
//         logError ( appError, `Unable to get customers due to error ${error}` )
//
//         response.status ( 500 ).json ( appError )
//     }
// } )