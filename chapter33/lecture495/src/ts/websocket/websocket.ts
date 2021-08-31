export default class SocketIO {

    private static socketIO

    private constructor () {

    }

    public static getInstance = ( httpServer ) => {

        if ( ! this.socketIO ) {

            this.socketIO = require ( "socket.io" ) ( httpServer )
        }

        return this.socketIO
    }

    // getSocketIO = () => {
    //
    //     if ( ! this.socketIO ) {
    //
    //         console.error ( "SocketIO not initialized" )
    //         throw new Error ( "SocketIO not initialized" )
    //     }
    //
    //     return this.socketIO
    // }
}
// let socketIO
//
// export const getInstance = ( httpServer ) => {
//
//     socketIO = require ( "socket.io" ) ( httpServer )
// }
//
// export const getSocketIO = () => {
//
//     if ( ! socketIO ) {
//
//         console.error ( "SocketIO not initialized" )
//         throw new Error ( "SocketIO not initialized" )
//     }
//
//     return socketIO
// }