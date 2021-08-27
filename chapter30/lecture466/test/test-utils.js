exports.getResponseMock = () => {

    return {

        status: null,
        content: null,

        status: function ( status ) {

            this.status = status
            return this
        },

        json: function ( content ) {

            this.content = content
            return this
        }
    }
}