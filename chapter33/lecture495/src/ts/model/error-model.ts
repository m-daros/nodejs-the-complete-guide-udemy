import { v4 as uuidv4 } from "uuid"

export class AppError {

    id: string
    type: ErrorType
    message: string

    constructor ( type, message ) {

        this.id = uuidv4 ()
        this.type = type
        this.message = message
    }
}

export enum ErrorType {

    VALIDATION_ERROR         = "validation-error",
    APPLICATION_ERROR        = "application-error",
    RESOURCE_NOT_FOUND_ERROR = "resource-not-found-error"
}

export const logError = ( appError, message ) => {

    console.error ( `errorId: ${appError.id}, message: ${message}` )
}