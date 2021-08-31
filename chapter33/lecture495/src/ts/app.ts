import express, { Router, Request, Response, NextFunction } from "express"
import SocketIO from "./websocket/websocket"
import Routes from "./routes/routes"
import OrmManager from "./orm/sequelize/sequelize-config"
import CustomerEntity from "./orm/sequelize/model/customer-entity"
import ProductEntity from "./orm/sequelize/model/product-entity"
import { CustomerController } from "./controllers/customer-controller";
import { OrderController } from "./controllers/order-controller";

export const app = express ()
const port = 3000

let ormManager

const initDB = async () => {

    ormManager = new OrmManager () // TODO Passare la configurazione

    await ormManager.getOrmMapper ().sync ( { force: true } )

    // Add some customer
    CustomerEntity.create ( { name: "Mario", surname: "Rossi", age: 24 } as CustomerEntity )
    CustomerEntity.create ( { name: "Marco", surname: "Bianchi", age: 32 } as CustomerEntity )

    // Add some product
    ProductEntity.create ( { name: "Samsung Galaxy S10" } as ProductEntity )
    ProductEntity.create ( { name: "Samsung Galaxy S4" } as ProductEntity )
}

const initWebServer = async () => {

    const httpServer = await app.listen ( port )
    const socketIO = SocketIO.getInstance ( httpServer )

    const customerController = new CustomerController ()
    const orderController = new OrderController ( ormManager, socketIO )
    const routes = new Routes ( customerController, orderController )

    // const app = express ()
    app.use ( "/api/v1", routes.buildRoutes () )

    console.log ( `app started and listen to port ${port}` )

    return socketIO
}

const initSocketIO = async ( socketIO ) => {

    // Start an handler to Websocket
    console.log ( `Listening to Websocket port ${port}` )

    socketIO.on ( "connection", socket => {

        console.log ( "A client established a WebSocket connection" )
    } )
}

initDB ()
    .then ( () => initWebServer() )
    .then ( ( socketIO ) => initSocketIO ( socketIO ) )
    .then ( () => app.emit ( "appStarted" ) )