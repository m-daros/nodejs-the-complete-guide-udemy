const express = require ( "express" )

const routes = require ( "./routes/routes" )

const webSocket = require ( "./websocket/websocket" )
const sequelize = require ( "./orm/sequelize/sequelize-config" )

const { CustomerEntity, ProductEntity } = require ( "./orm/sequelize/model/sequelize-orm-model" )

const app = express ()
app.use ( "/api/v1", routes )

initDB ()

function initDB () {

    // Init the DB schema if necessary
//    sequelize.sync ()
    sequelize.sync ( { force: true } )
        .then ( result => {

            CustomerEntity.destroy ( { where: {}, truncate: false } )
            ProductEntity.destroy ( { where: {}, truncate: false } )
        })
        .then (() => {

            // Add some customer
            CustomerEntity.create ( { name: "Mario", surname: "Rossi", age: 24 } )
            CustomerEntity.create ( { name: "Marco", surname: "Bianchi", age: 32 } )

            // Add some product
            ProductEntity.create ( { name: "Samsung Galaxy S10" } )
            ProductEntity.create ( { name: "Samsung Galaxy S4" } )
        })
        .then (() => {

            console.log ( "DB initialized" )
            const httpServer = app.listen ( 3000 )
            console.log ( "App started" )
            console.log ( "Listening to HTTP port 3000" )

            // Start an handler to Websocket
            webSocket.init ( httpServer )
            const socketIO = webSocket.getSocketIO ()
            console.log ( "Listening to Websocket port 3000" )

            socketIO.on ( "connection", socket => {

                console.log ( "A client established a WebSocket connection" )
            } )
        })
        .catch ( error => {

            console.log ( `Unable to start the app due to error: ${error}` )
        } )
}