const expect = require ( "chai" ).expect
const sinon = require ( "sinon" )

const orderController = require ( "../../../controllers/order-controller" )
const { OrderEntity } = require ( "../../../orm/sequelize/model/sequelize-orm-model" )
const { ErrorType } = require ( "../../../model/error-model" )
const { getResponseMock } = require ( "../../test-utils" )
const webSocket = require ( "../../../websocket/websocket" );

describe ( "order-controller", () => {

    describe ( "getOrders ()", () => {

        it ( "should return status code 200 and all the orders", ( done ) => {

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
                                } ]

            // Mock the method findAll of OrderEntity
            sinon.stub ( OrderEntity, "findAll" )

            // Configure the exoected result of the mocked method
            OrderEntity.findAll.returns ( expectedOrders )

            // Test the service
            orderController.getOrders ( requestMock, responseMock, () => {} ).then ( () => {

                expect ( responseMock.status ).to.be.equal ( 200 )
                expect ( responseMock.content ).to.be.equal ( expectedOrders )

                // Verify the mocked method was called
                expect ( OrderEntity.findAll.called ).to.be.true

                // Restore the original behavior of the mocked method
                OrderEntity.findAll.restore ()

                done ()
            } )
        } )


        it ( "should return status code 500 and an error payload when an internal server error occurs", ( done ) => {

            const requestMock = {}
            const responseMock = getResponseMock ()

            // Mock the method findAll of OrderEntity
            sinon.stub ( OrderEntity, "findAll" )

            // Configure the exoected result of the mocked method
            OrderEntity.findAll.throws ( "DummyException" )

            // Test the service
            orderController.getOrders ( requestMock, responseMock, () => {} ).then ( () => {

                expect ( responseMock.status ).to.be.equal ( 500 )

                expect ( responseMock.content.id ).to.be.not.null
                expect ( responseMock.content.message ).to.be.not.null
                expect ( responseMock.content.type ).to.be.equals ( ErrorType.APPLICATION_ERROR )

                // Verify the mocked method was called
                expect ( OrderEntity.findAll.called ).to.be.true

                // Restore the original behavior of the mocked method
                OrderEntity.findAll.restore ()

                done ()
            } )
        } )
    } )


    describe ( "getOrder ()", () => {

        it ( "should return status code 200 and the required order", ( done ) => {

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
            }

            // Mock the method findAll of OrderEntity
            sinon.stub ( OrderEntity, "findByPk" )

            // Configure the exoected result of the mocked method
            OrderEntity.findByPk.returns ( expectedProduct )

            // Test the service
            orderController.getOrder ( requestMock, responseMock, () => {} ).then ( () => {

                expect ( responseMock.status ).to.be.equal ( 200 )
                expect ( responseMock.content ).to.be.equal ( expectedProduct )

                // Verify the mocked method was called
                expect ( OrderEntity.findByPk.called ).to.be.true

                // Restore the original behavior of the mocked method
                OrderEntity.findByPk.restore ()

                done ()
            } )
        } )


        it ( "should return status code 404 and an error payload when the required order does not exist", ( done ) => {

            const requestMock = {

                params: {

                    productId: 1
                }
            }

            const responseMock = getResponseMock ()

            // Mock the method findAll of OrderEntity
            sinon.stub ( OrderEntity, "findByPk" )

            // Configure the exoected result of the mocked method
            OrderEntity.findByPk.returns ( null )

            // Test the service
            orderController.getOrder ( requestMock, responseMock, () => {} ).then ( () => {

                expect ( responseMock.status ).to.be.equal ( 404 )

                expect ( responseMock.content.id ).to.be.not.null
                expect ( responseMock.content.message ).to.be.not.null
                expect ( responseMock.content.type ).to.be.equals ( ErrorType.RESOURCE_NOT_FOUND_ERROR )

                // Verify the mocked method was called
                expect ( OrderEntity.findByPk.called ).to.be.true

                // Restore the original behavior of the mocked method
                OrderEntity.findByPk.restore ()

                done ()
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
        //         expect ( responseMock.status ).to.be.equal ( 400 )
        //
        //         expect ( responseMock.content.id ).to.be.not.null
        //         expect ( responseMock.content.message ).to.be.not.null
        //         expect ( responseMock.content.type ).to.be.equals ( ErrorType.VALIDATION_ERROR )
        //
        //         done ()
        //     } )
        // } )


        it ( "should return status code 500 and an error payload when an error occurs", ( done ) => {

            const requestMock = {

                params: {

                    productId: 1
                }
            }

            const responseMock = getResponseMock ()

            // Mock the method findAll of OrderEntity
            sinon.stub ( OrderEntity, "findByPk" )

            // Configure the exoected result of the mocked method
            OrderEntity.findByPk.throws ( "DummyException" )

            // Test the service
            orderController.getOrder ( requestMock, responseMock, () => {} ).then ( () => {

                expect ( responseMock.status ).to.be.equal ( 500 )

                expect ( responseMock.content.id ).to.be.not.null
                expect ( responseMock.content.message ).to.be.not.null
                expect ( responseMock.content.type ).to.be.equals ( ErrorType.APPLICATION_ERROR )

                // Verify the mocked method was called
                expect ( OrderEntity.findByPk.called ).to.be.true

                // Restore the original behavior of the mocked method
                OrderEntity.findByPk.restore ()

                done ()
            } )
        } )
    } )


    describe ( "addProduct ()", () => {

        it ( "should add the product and return a status code 201", ( done ) => {

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

            // Override webSocket.getSocketIO ().emit ( "orders", { action: "create", data: order } ) to do nothing
            webSocket.getSocketIO = () => {

                return { emit: () => {

                    } }
            }

            sinon.stub ( OrderEntity, "create" )

            const expectedAddedProduct = { id: 1, customerId: 1, date: "2021-08-27T19:34:34.438Z",
                addProduct: ( prod ) => {

                    return this
                } }

            OrderEntity.create.returns ( expectedAddedProduct )

            // Test the service
            orderController.addOrder ( requestMock, responseMock, () => {} ).then ( () => {

                expect ( responseMock.status ).to.be.equal ( 201 )
                expect ( responseMock.content ).to.be.equal ( expectedAddedProduct )

                // Verify the mocked method was called
                expect ( OrderEntity.create.called ).to.be.true

                // Restore the original behavior of the mocked method
                OrderEntity.create.restore ()

                done ()
            } )
        } )


        it ( "should return status code 500 and an error payload when a failure occurs", ( done ) => {

            const requestMock = {

                body: {

                    name: "iPad 9"
                }
            }

            const responseMock = getResponseMock ()

            sinon.stub ( OrderEntity, "create" )

            OrderEntity.create.throws ( "DummyException" )

            // Test the service
            orderController.addOrder ( requestMock, responseMock, () => {} ).then ( () => {

                expect ( responseMock.status ).to.be.equal ( 500 )

                expect ( responseMock.content.id ).to.be.not.null
                expect ( responseMock.content.message ).to.be.not.null
                expect ( responseMock.content.type ).to.be.equals ( ErrorType.APPLICATION_ERROR )

                // Verify the mocked method was called
                expect ( OrderEntity.create.called ).to.be.true

                // Restore the original behavior of the mocked method
                OrderEntity.create.restore ()

                done ()
            } )
        } )

    } )
} )