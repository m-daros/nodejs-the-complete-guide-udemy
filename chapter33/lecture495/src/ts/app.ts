import express, { Router, Request, Response, NextFunction } from "express"
import sequelize from "./orm/sequelize/sequelize-config"
import * as webSocket from "./websocket/websocket"
import { router } from "./routes/routes"
import { CustomerEntity } from "./orm/sequelize/model/customer-entity"
import { ProductEntity } from "./orm/sequelize/model/product-entity"

const app = express ()
const port = 3000

const initDB = async () => {

    await sequelize.sync ( { force: true } )

    // Add some customer
    CustomerEntity.create ( { name: "Mario", surname: "Rossi", age: 24 } as CustomerEntity )
    CustomerEntity.create ( { name: "Marco", surname: "Bianchi", age: 32 } as CustomerEntity )

    // Add some product
    ProductEntity.create ( { name: "Samsung Galaxy S10" } as ProductEntity )
    ProductEntity.create ( { name: "Samsung Galaxy S4" } as ProductEntity )
}

const initWebServer = async () => {

    // const app = express ()
    app.use ( "/api/v1", router )

    const httpServer = await app.listen ( port )

    console.log ( `app started and listen to port ${port}` )

    return httpServer
}

const initSocketIO = async ( httpServer ) => {

    // Start an handler to Websocket
    webSocket.init ( httpServer )
    const socketIO = webSocket.getSocketIO ()
    console.log ( `Listening to Websocket port ${port}` )

    socketIO.on ( "connection", socket => {

        console.log ( "A client established a WebSocket connection" )
    } )
}

initDB ()
    .then ( () => initWebServer() )
    .then ( ( httpServer ) => initSocketIO ( httpServer ) )
    .then ( () => app.emit ( "appStarted" ) )