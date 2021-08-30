let socketIO

export const init = ( httpServer ) => {

    socketIO = require ( "socket.io" ) ( httpServer )
}

export const getSocketIO = () => {

    if ( ! socketIO ) {

        console.error ( "SocketIO not initialized" )
        throw new Error ( "SocketIO not initialized" )
    }

    return socketIO
}