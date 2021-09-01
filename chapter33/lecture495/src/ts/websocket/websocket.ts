export default class SocketIO {

    private static socketIO

    private constructor () {

    }

    public static getInstance = ( httpServer ) => {

        if ( ! SocketIO.socketIO ) {

            SocketIO.socketIO = require ( "socket.io" ) ( httpServer )
        }

        return SocketIO.socketIO
    }
}