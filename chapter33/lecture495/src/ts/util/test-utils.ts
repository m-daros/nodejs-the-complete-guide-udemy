export const getResponseMock = () => {

    return {

        httpStatus: null,
        content: null,

        status: function ( httpStatus ) {

            this.httpStatus = httpStatus
            return this
        },

        json: function ( content ) {

            this.content = content
            return this
        }
    }
}