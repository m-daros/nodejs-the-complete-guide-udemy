import { OrderController } from "../../../src/ts/controllers/order-controller"
import OrderEntity from "../../../src/ts/orm/sequelize/model/order-entity"
import ProductEntity from "../../../src/ts/orm/sequelize/model/product-entity";
import { ErrorType } from "../../../src/ts/model/error-model"
import { getResponseMock } from "../../../src/ts/util/test-utils"
import SocketIO from "../../../src/ts/websocket/websocket"
import OrmManager from "../../../src/ts/orm/sequelize/sequelize-config";
import { Sequelize } from "sequelize-typescript";

// beforeEach ( () => {
//
//     jest.useFakeTimers ()
// } )

describe ( "order-controller", () => {

    describe ( "getOrders ()", () => {

        test ( "should return status code 200 and all the orders", () => {

            const requestMock = {}
            const responseMock = getResponseMock ()

            const expectedOrders = [ { id: 1,
                                       date: "2021-08-27T18:50:38.000Z",
                                        customerId: 1,
                                        products: [ {
                                            id: 1,
                                            name: "Samsung Galaxy S10",
                                            order_product: {
                                                id: 1,
                                                quantity: 30,
                                                productId: 1,
                                                orderId: 1
                                            }
                                        },
                                        {   id: 2,
                                            name: "Samsung Galaxy S4",
                                            order_product: {
                                                id: 2,
                                                quantity: 9,
                                                productId: 2,
                                                orderId: 1
                                            }
                                        }
                                    ]
                                } ] as unknown as OrderEntity []

            // Mock the method findAll of CustomerEntity
            const orderEntityMock = jest.spyOn ( OrderEntity,"findAll" )

            // Configure the exoected result of the mocked method
            orderEntityMock.mockImplementation (() => Promise.resolve ( expectedOrders ) )

            // Mock the SocketIO connector
            const socketIoMock = jest.spyOn ( SocketIO, "getInstance" )
                .mockImplementation ( () => { emit: ( message ) => {} } )

            const orderController = new OrderController ( null, socketIoMock )
            
            // Test the service
            return orderController.getOrders ( requestMock, responseMock, () => {} ).then ( () => {

                expect ( responseMock.httpStatus ).toBe ( 200 )
                expect ( responseMock.content ).toBe ( expectedOrders )

                // // Verify the mocked method was called
                // expect ( OrderEntity.findAll.called ).to.be.true
                //
                // // Restore the original behavior of the mocked method
                // OrderEntity.findAll.restore ()
            } )
        } )


        test ( "should return status code 500 and an error payload when an internal server error occurs", () => {

            const requestMock = {}
            const responseMock = getResponseMock ()

            // Mock the method findAll of OrderEntity
            const orderEntityMock = jest.spyOn ( OrderEntity,"findAll" )

            // Configure the exoected result of the mocked method
            orderEntityMock.mockImplementation (() => Promise.reject ( "DummyException" ) )

            // TODO DOVREBBE ANDAR BENE
            // Mock the SocketIO connector socketIoMock NULL
            const socketIoMock = jest.spyOn ( SocketIO, "getInstance" )
                .mockImplementation ( () => { emit: ( message ) => {} } )

            const orderController = new OrderController ( null, socketIoMock )

            // Test the service
            return orderController.getOrders ( requestMock, responseMock, () => {} ).then ( () => {

                expect ( responseMock.httpStatus ).toBe ( 500 )

                expect ( responseMock.content.id ).not.toBeNull
                expect ( responseMock.content.message ).not.toBeNull
                expect ( responseMock.content.type ).toBe ( ErrorType.APPLICATION_ERROR )

                // // Verify the mocked method was called
                // expect ( OrderEntity.findAll.called ).to.be.true
                //
                // // Restore the original behavior of the mocked method
                // OrderEntity.findAll.restore ()
            } )
        } )
    } )


    describe ( "getOrder ()", () => {

        test ( "should return status code 200 and the required order", () => {

            const requestMock = {

                params: {

                    productId: 1
                }
            }

            const responseMock = getResponseMock ()

            const expectedProduct = { id: 1,
                date: "2021-08-27T18:50:38.000Z",
                customerId: 1,
                products: [ {
                    id: 1,
                    name: "Samsung Galaxy S10",
                    order_product: {
                        id: 1,
                        quantity: 30,
                        productId: 1,
                        orderId: 1
                    }
                },
                    {   id: 2,
                        name: "Samsung Galaxy S4",
                        order_product: {
                            id: 2,
                            quantity: 9,
                            productId: 2,
                            orderId: 1
                        }
                    }
                ]
            } as unknown as OrderEntity

            // Mock the method findAll of OrderEntity
            const orderEntityMock = jest.spyOn ( OrderEntity,"findByPk" )

            // Configure the exoected result of the mocked method
            orderEntityMock.mockImplementation (() => Promise.resolve ( expectedProduct ) )

            const orderController = new OrderController ( null, null )

            // Test the service
            return orderController.getOrder ( requestMock, responseMock, () => {} )
                .then ( () => {

                    expect ( responseMock.httpStatus ).toBe ( 200 )
                    expect ( responseMock.content ).toBe ( expectedProduct )

                    // // Verify the mocked method was called
                    // expect ( OrderEntity.findByPk.called ).to.be.true
                    //
                    // // Restore the original behavior of the mocked method
                    // OrderEntity.findByPk.restore ()
                } )
                // .catch ( error => {
                //
                //     console.error ( `MAX ERROR: ${error}` )
                //     done ( error )
                // } )
        } )


        test ( "should return status code 404 and an error payload when the required order does not exist", () => {

            const requestMock = {

                params: {

                    productId: 1
                }
            }

            const responseMock = getResponseMock ()

            // Mock the method findAll of OrderEntity
            const orderEntityMock = jest.spyOn ( OrderEntity,"findByPk" )

            // Configure the exoected result of the mocked method
            orderEntityMock.mockImplementation (() => Promise.resolve ( null ) )

            const orderController = new OrderController ( null, null )

            // Test the service
            return orderController.getOrder ( requestMock, responseMock, () => {} ).then ( () => {

                expect ( responseMock.httpStatus ).toBe ( 404 )

                expect ( responseMock.content.id ).not.toBeNull
                expect ( responseMock.content.message ).not.toBeNull
                expect ( responseMock.content.type ).toBe ( ErrorType.RESOURCE_NOT_FOUND_ERROR )

                // // Verify the mocked method was called
                // expect ( OrderEntity.findByPk.called ).to.be.true
                //
                // // Restore the original behavior of the mocked method
                // OrderEntity.findByPk.restore ()
            } )
        } )


        // TODO Plan to do this as an end to end test since the validation of the parameters is on the routes definition
        // it ( "should return status code 400 and an error payload when the path param productId is not in the request URL", ( done ) => {
        //
        //     const requestMock = {}
        //
        //     const responseMock = getResponseMock ()
        //
        //     // Test the service
        //     orderController.getProduct ( requestMock, responseMock, () => {} ).then ( () => {
        //
        //         expect ( responseMock.httpStatus ).toBe ( 400 )
        //
        //         expect ( responseMock.content.id ).to.be.not.null
        //         expect ( responseMock.content.message ).to.be.not.null
        //         expect ( responseMock.content.type ).toBes ( ErrorType.VALIDATION_ERROR )
        //
        //         done ()
        //     } )
        // } )


        test ( "should return status code 500 and an error payload when an error occurs", () => {

            const requestMock = {

                params: {

                    productId: 1
                }
            }

            const responseMock = getResponseMock ()

            // Mock the method findAll of OrderEntity
            const orderEntityMock = jest.spyOn ( OrderEntity,"findByPk" )

            // Configure the exoected result of the mocked method
            orderEntityMock.mockImplementation (() => Promise.reject ( "DummyException" ) )

            const orderController = new OrderController ( null,null )

            // Test the service
            return orderController.getOrder ( requestMock, responseMock, () => {} ).then ( () => {

                expect ( responseMock.httpStatus ).toBe ( 500 )

                expect ( responseMock.content.id ).not.toBeNull
                expect ( responseMock.content.message ).not.toBeNull
                expect ( responseMock.content.type ).toBe ( ErrorType.APPLICATION_ERROR )

                // // Verify the mocked method was called
                // expect ( OrderEntity.findByPk.called ).to.be.true
                //
                // // Restore the original behavior of the mocked method
                // OrderEntity.findByPk.restore ()
            } )
        } )
    } )


    describe ( "addProduct ()", () => {

        test ( "should add the product and return a status code 201", () => {

            const requestMock = {

                body: {
                    customerId: 1,
                    products: [
                        {   id: 1,
                            name: "Samsung Galaxy S4",
                            order_product: {
                                quantity: 30,
                                productId: 1
                            }
                        },
                        {   id: 2,
                            name: "Samsung Galaxy S10",
                            order_product: {
                                quantity: 9,
                                productId: 2
                            }
                        }
                    ]
                }
            }

            const responseMock = getResponseMock ()

            const expectedAddedProduct = { id: 1, customerId: 1, date: "2021-08-27T19:34:34.438Z",
                addProduct: ( prod ) => {

                    return this
                } } as unknown as ProductEntity

            // Mock the method create of OrderEntity
            const orderEntityMock = jest.spyOn ( OrderEntity,"create" )
                .mockImplementation (() => Promise.resolve ( expectedAddedProduct ) )

            const bbbMock = {}

            // Mocks SocketIO.getInstance ().emit ( "orders", { action: "create", data: order } ) to do nothing
            const socketIoMock = jest.spyOn ( SocketIO, "getInstance" )
                .mockImplementation ( () => { () => { emit: ( message ) => {} } } )

            const productEntityMock = jest.spyOn ( ProductEntity,"findByPk" )
                .mockImplementation ( ( productId )  => Promise.resolve ( { id: productId, name: "Samsung Galaxy S4", orders: [] } as ProductEntity ) )

            // Workaround: unable to mock OrmManager.getOrmMapper () using jest
            const sequelizeMock = {

                transaction () {

                    return {

                        commit () {},
                        rollback () {}
                    } as unknown
                }

            } as Sequelize

            const ormManagerMock = {

                getOrmMapper () { return sequelizeMock }
            } as OrmManager

            const orderController = new OrderController ( ormManagerMock, socketIoMock )

            // Test the service
            return orderController.addOrder ( requestMock, responseMock, () => {} ).then ( () => {

                expect ( responseMock.httpStatus ).toBe ( 201 )
                expect ( responseMock.content ).toBe ( expectedAddedProduct )

                // // Verify the mocked method was called
                // expect ( OrderEntity.create.called ).to.be.true
                //
                // // Restore the original behavior of the mocked method
                // OrderEntity.create.restore ()
            } )
        } )


        test ( "should return status code 500 and an error payload when a failure occurs", () => {

            const requestMock = {

                body: {

                    name: "iPad 9"
                }
            }

            const responseMock = getResponseMock ()

            // Mock the method findAll of OrderEntity
            const orderEntityMock = jest.spyOn ( OrderEntity,"create" )

            // Configure the exoected result of the mocked method
            orderEntityMock.mockImplementation (() => Promise.reject ( "DummyException" ) )

            const orderController = new OrderController ( null, null )

            // Test the service
            return orderController.addOrder ( requestMock, responseMock, () => {} ).then ( () => {

                expect ( responseMock.httpStatus ).toBe ( 500 )

                expect ( responseMock.content.id ).not.toBeNull
                expect ( responseMock.content.message ).not.toBeNull
                expect ( responseMock.content.type ).toBe ( ErrorType.APPLICATION_ERROR )

                // // Verify the mocked method was called
                // expect ( OrderEntity.create.called ).to.be.true
                //
                // // Restore the original behavior of the mocked method
                // OrderEntity.create.restore ()
            } )
        } )

    } )
} )