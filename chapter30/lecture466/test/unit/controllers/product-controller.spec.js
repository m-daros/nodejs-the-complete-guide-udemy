const expect = require ( "chai" ).expect
const sinon = require ( "sinon" )

const productController = require ( "../../../controllers/product-controller" )
const { ProductEntity } = require ( "../../../orm/sequelize/model/sequelize-orm-model" )
const { ErrorType } = require ( "../../../model/error-model" )
const { getResponseMock } = require ( "../../test-utils" )

describe ( "product-controller", () => {

    describe ( "getProducts ()", () => {

        it ( "should return status code 200 and all the products", ( done ) => {

            const requestMock = {}
            const responseMock = getResponseMock ()

            const expectedProducts = [ { id: 1, name: "Samsung Galaxy S10" }, { id: 2, name: "iPhone 10" } ]

            // Mock the method findAll of ProductEntity
            sinon.stub ( ProductEntity, "findAll" )

            // Configure the exoected result of the mocked method
            ProductEntity.findAll.returns ( expectedProducts )

            // Test the service
            productController.getProducts ( requestMock, responseMock, () => {} ).then ( () => {

                expect ( responseMock.status ).to.be.equal ( 200 )
                expect ( responseMock.content ).to.be.equal ( expectedProducts )

                // Verify the mocked method was called
                expect ( ProductEntity.findAll.called ).to.be.true

                // Restore the original behavior of the mocked method
                ProductEntity.findAll.restore ()

                done ()
            } )
        } )


        it ( "should return status code 500 and an error payload when an internal server error occurs", ( done ) => {

            const requestMock = {}
            const responseMock = getResponseMock ()

            // Mock the method findAll of ProductEntity
            sinon.stub ( ProductEntity, "findAll" )

            // Configure the exoected result of the mocked method
            ProductEntity.findAll.throws ( "DummyException" )

            // Test the service
            productController.getProducts ( requestMock, responseMock, () => {} ).then ( () => {

                expect ( responseMock.status ).to.be.equal ( 500 )

                expect ( responseMock.content.id ).to.be.not.null
                expect ( responseMock.content.message ).to.be.not.null
                expect ( responseMock.content.type ).to.be.equals ( ErrorType.APPLICATION_ERROR )

                // Verify the mocked method was called
                expect ( ProductEntity.findAll.called ).to.be.true

                // Restore the original behavior of the mocked method
                ProductEntity.findAll.restore ()

                done ()
            } )
        } )
    } )


    describe ( "getProduct ()", () => {

        it ( "should return status code 200 and the required product", ( done ) => {

            const requestMock = {

                params: {

                    productId: 1
                }
            }

            const responseMock = getResponseMock ()

            const expectedProduct = { id: 1, name: "Samsung Galaxy S10" }

            // Mock the method findAll of ProductEntity
            sinon.stub ( ProductEntity, "findByPk" )

            // Configure the exoected result of the mocked method
            ProductEntity.findByPk.returns ( expectedProduct )

            // Test the service
            productController.getProduct ( requestMock, responseMock, () => {} ).then ( () => {

                expect ( responseMock.status ).to.be.equal ( 200 )
                expect ( responseMock.content ).to.be.equal ( expectedProduct )

                // Verify the mocked method was called
                expect ( ProductEntity.findByPk.called ).to.be.true

                // Restore the original behavior of the mocked method
                ProductEntity.findByPk.restore ()

                done ()
            } )
        } )


        it ( "should return status code 404 and an error payload when the required product does not exist", ( done ) => {

            const requestMock = {

                params: {

                    productId: 1
                }
            }

            const responseMock = getResponseMock ()

            // Mock the method findAll of ProductEntity
            sinon.stub ( ProductEntity, "findByPk" )

            // Configure the exoected result of the mocked method
            ProductEntity.findByPk.returns ( null )

            // Test the service
            productController.getProduct ( requestMock, responseMock, () => {} ).then ( () => {

                expect ( responseMock.status ).to.be.equal ( 404 )

                expect ( responseMock.content.id ).to.be.not.null
                expect ( responseMock.content.message ).to.be.not.null
                expect ( responseMock.content.type ).to.be.equals ( ErrorType.RESOURCE_NOT_FOUND_ERROR )

                // Verify the mocked method was called
                expect ( ProductEntity.findByPk.called ).to.be.true

                // Restore the original behavior of the mocked method
                ProductEntity.findByPk.restore ()

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
        //     productController.getProduct ( requestMock, responseMock, () => {} ).then ( () => {
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

            // Mock the method findAll of ProductEntity
            sinon.stub ( ProductEntity, "findByPk" )

            // Configure the exoected result of the mocked method
            ProductEntity.findByPk.throws ( "DummyException" )

            // Test the service
            productController.getProduct ( requestMock, responseMock, () => {} ).then ( () => {

                expect ( responseMock.status ).to.be.equal ( 500 )

                expect ( responseMock.content.id ).to.be.not.null
                expect ( responseMock.content.message ).to.be.not.null
                expect ( responseMock.content.type ).to.be.equals ( ErrorType.APPLICATION_ERROR )

                // Verify the mocked method was called
                expect ( ProductEntity.findByPk.called ).to.be.true

                // Restore the original behavior of the mocked method
                ProductEntity.findByPk.restore ()

                done ()
            } )
        } )
    } )


    describe ( "addProduct ()", () => {

        it ( "should add the product and return a status code 201", ( done ) => {

            const requestMock = {

                body: {

                    name: "iPad 9"
                }
            }

            const responseMock = getResponseMock ()

            sinon.stub ( ProductEntity, "create" )

            const expectedAddedProduct = { id: 3, name: "iPad 10", "createdAt": "2021-08-27T16:05:32.935Z", "updatedAt": "2021-08-27T16:05:32.935Z" }

            ProductEntity.create.returns ( expectedAddedProduct )

            // Test the service
            productController.addProduct ( requestMock, responseMock, () => {} ).then ( () => {

                expect ( responseMock.status ).to.be.equal ( 201 )
                expect ( responseMock.content ).to.be.equal ( expectedAddedProduct )

                // Verify the mocked method was called
                expect ( ProductEntity.create.called ).to.be.true

                // Restore the original behavior of the mocked method
                ProductEntity.create.restore ()

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

            sinon.stub ( ProductEntity, "create" )

            ProductEntity.create.throws ( "DummyException" )

            // Test the service
            productController.addProduct ( requestMock, responseMock, () => {} ).then ( () => {

                expect ( responseMock.status ).to.be.equal ( 500 )

                expect ( responseMock.content.id ).to.be.not.null
                expect ( responseMock.content.message ).to.be.not.null
                expect ( responseMock.content.type ).to.be.equals ( ErrorType.APPLICATION_ERROR )

                // Verify the mocked method was called
                expect ( ProductEntity.create.called ).to.be.true

                // Restore the original behavior of the mocked method
                ProductEntity.create.restore ()

                done ()
            } )
        } )

    } )
} )