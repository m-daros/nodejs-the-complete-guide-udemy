import { ProductEntity } from "../orm/sequelize/model/product-entity"
import { catchErrors } from "../util/error-handling"
import { AppError, ErrorType, logError } from "../model/error-model"

export const addProduct = async ( request, response, next ) => {

    try {

        const product = await ProductEntity.create ( { name: request.body [ "name" ] } as ProductEntity )

        response.status ( 201 ).json ( product )
    }
    catch ( error ) {

        const appError = new AppError ( ErrorType.APPLICATION_ERROR, `Unable to add product` )
        logError ( appError, `Unable to add product due to error ${error}` )

        response.status ( 500 ).json ( appError )
    }
}

export const getProducts = catchErrors ( async ( request, response, next ) => {

    try {

        const products = await ProductEntity.findAll ()

        response.status ( 200 ).json ( products )
    }
    catch ( error ) {

        const appError = new AppError ( ErrorType.APPLICATION_ERROR, `Unable to get products` )
        logError ( appError, `Unable to get products due to error ${error}` )

        response.status ( 500 ).json ( appError )
    }
} )

export const getProduct = async ( request, response, next ) => {

    const productId = parseInt ( request.params.productId , 10 )

    try {

        const product = await ProductEntity.findByPk ( productId )

        if ( ! product ) {

            const appError = new AppError ( ErrorType.RESOURCE_NOT_FOUND_ERROR, `Unable to find product with id ${productId}` )
            logError ( appError, `Unable to find product with id ${productId}` )

            response.status ( 404 ).json ( appError )
        }
        else {

            response.status ( 200 ).json ( product )
        }
    }
    catch ( error ) {

        const appError = new AppError ( ErrorType.APPLICATION_ERROR, `Unable to find product with id ${productId}` )
        logError ( appError, `Unable to find product with id ${productId} due to error ${error}` )

        response.status ( 500 ).json ( appError )
    }
}