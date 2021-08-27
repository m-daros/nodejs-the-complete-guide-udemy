let socketIO

// TODO SEMBRA NON FUNZIONARE
exports.init = ( httpServer ) => {

    socketIO = require ( "socket.io" ) ( httpServer )
}

exports.getSocketIO = () => {

    if ( ! socketIO ) {

        console.error ( "SocketIO not initialized" )
        throw new Error ( "SocketIO not initialized" )
    }

    return socketIO;
}