import { ProductController } from "../../../src/ts/controllers/product-controller"
import ProductEntity from "../../../src/ts/orm/sequelize/model/product-entity"
import { ErrorType } from "../../../src/ts/model/error-model"
import { getResponseMock } from "../../../src/ts/util/test-utils"

describe ( "product-controller", () => {

    describe ( "getProducts ()", () => {

        it ( "should return status code 200 and all the products", () => {

            const requestMock = {}
            const responseMock = getResponseMock ()

            const expectedProducts = [ { id: 1, name: "Samsung Galaxy S10" }, { id: 2, name: "iPhone 10" } ] as ProductEntity []

            // Mock the method findAll of ProductEntity
            jest.spyOn ( ProductEntity, "findAll" )
                .mockImplementationOnce ( () => Promise.resolve ( expectedProducts ) )

            const productController = new ProductController ()

            // Test the service
            return productController.getProducts ( requestMock, responseMock, () => {} ).then ( () => {

                expect ( responseMock.httpStatus ).toBe ( 200 )
                expect ( responseMock.content ).toBe ( expectedProducts )

                // // Verify the mocked method was called
                // expect ( ProductEntity.findAll.called ).to.be.true
                //
                // // Restore the original behavior of the mocked method
                // ProductEntity.findAll.restore ()
            } )
        } )


        it ( "should return status code 500 and an error payload when an internal server error occurs", () => {

            const requestMock = {}
            const responseMock = getResponseMock ()

            // Mock the method findAll of ProductEntity
            jest.spyOn ( ProductEntity, "findAll" )
                .mockImplementationOnce ( () => Promise.reject ( "DummyException" ) )

            const productController = new ProductController ()

            // Test the service
            return productController.getProducts ( requestMock, responseMock, () => {} ).then ( () => {

                expect ( responseMock.httpStatus ).toBe ( 500 )

                expect ( responseMock.content.id ).not.toBeNull
                expect ( responseMock.content.message ).not.toBeNull
                expect ( responseMock.content.type ).toBe ( ErrorType.APPLICATION_ERROR )

                // // Verify the mocked method was called
                // expect ( ProductEntity.findAll.called ).to.be.true
                //
                // // Restore the original behavior of the mocked method
                // ProductEntity.findAll.restore ()
            } )
        } )
    } )


    describe ( "getProduct ()", () => {

        it ( "should return status code 200 and the required product", () => {

            const requestMock = {

                params: {

                    productId: 1
                }
            }

            const responseMock = getResponseMock ()

            const expectedProduct = { id: 1, name: "Samsung Galaxy S10" } as ProductEntity

            // Mock the method findAll of ProductEntity
            jest.spyOn ( ProductEntity, "findByPk" )
                .mockImplementationOnce ( () => Promise.resolve ( expectedProduct ) )

            const productController = new ProductController ()

            // Test the service
            return productController.getProduct ( requestMock, responseMock, () => {} ).then ( () => {

                expect ( responseMock.httpStatus ).toBe ( 200 )
                expect ( responseMock.content ).toBe ( expectedProduct )

                // // Verify the mocked method was called
                // expect ( ProductEntity.findByPk.called ).to.be.true
                //
                // // Restore the original behavior of the mocked method
                // ProductEntity.findByPk.restore ()
            } )
        } )


        it ( "should return status code 404 and an error payload when the required product does not exist", () => {

            const requestMock = {

                params: {

                    productId: 1
                }
            }

            const responseMock = getResponseMock ()

            // Mock the method findAll of ProductEntity
            jest.spyOn ( ProductEntity, "findByPk" )
                .mockImplementationOnce ( () => Promise.resolve ( null ) )

            const productController = new ProductController ()

            // Test the service
            return productController.getProduct ( requestMock, responseMock, () => {} ).then ( () => {

                expect ( responseMock.httpStatus ).toBe ( 404 )

                expect ( responseMock.content.id ).not.toBeNull
                expect ( responseMock.content.message ).not.toBeNull
                expect ( responseMock.content.type ).toBe ( ErrorType.RESOURCE_NOT_FOUND_ERROR )

                // // Verify the mocked method was called
                // expect ( ProductEntity.findByPk.called ).to.be.true
                //
                // // Restore the original behavior of the mocked method
                // ProductEntity.findByPk.restore ()
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
        //         expect ( responseMock.httpStatus ).toBe ( 400 )
        //
        //         expect ( responseMock.content.id ).to.be.not.null
        //         expect ( responseMock.content.message ).to.be.not.null
        //         expect ( responseMock.content.type ).toBe ( ErrorType.VALIDATION_ERROR )
        //
        //         done ()
        //     } )
        // } )


        it ( "should return status code 500 and an error payload when an error occurs", () => {

            const requestMock = {

                params: {

                    productId: 1
                }
            }

            const responseMock = getResponseMock ()

            // Mock the method findAll of ProductEntity
            jest.spyOn ( ProductEntity, "findByPk" )
                .mockImplementationOnce ( () => Promise.reject ( "DummyException" ) )

            const productController = new ProductController ()

            // Test the service
            return productController.getProduct ( requestMock, responseMock, () => {} ).then ( () => {

                expect ( responseMock.httpStatus ).toBe ( 500 )

                expect ( responseMock.content.id ).not.toBeNull
                expect ( responseMock.content.message ).not.toBeNull
                expect ( responseMock.content.type ).toBe ( ErrorType.APPLICATION_ERROR )

                // // Verify the mocked method was called
                // expect ( ProductEntity.findByPk.called ).to.be.true
                //
                // // Restore the original behavior of the mocked method
                // ProductEntity.findByPk.restore ()
            } )
        } )
    } )


    describe ( "addProduct ()", () => {

        it ( "should add the product and return a status code 201", () => {

            const requestMock = {

                body: {

                    name: "iPad 9"
                }
            }

            const responseMock = getResponseMock ()

            const expectedAddedProduct = { id: 3, name: "iPad 10", "createdAt": "2021-08-27T16:05:32.935Z", "updatedAt": "2021-08-27T16:05:32.935Z" }

            jest.spyOn ( ProductEntity, "create" )
                .mockImplementationOnce ( () => Promise.resolve ( expectedAddedProduct ) )

            const productController = new ProductController ()

            // Test the service
            return productController.addProduct ( requestMock, responseMock, () => {} ).then ( () => {

                expect ( responseMock.httpStatus ).toBe ( 201 )
                expect ( responseMock.content ).toBe ( expectedAddedProduct )

                // // Verify the mocked method was called
                // expect ( ProductEntity.create.called ).to.be.true
                //
                // // Restore the original behavior of the mocked method
                // ProductEntity.create.restore ()
            } )
        } )


        it ( "should return status code 500 and an error payload when a failure occurs", () => {

            const requestMock = {

                body: {

                    name: "iPad 9"
                }
            }

            const responseMock = getResponseMock ()

            // Mock the function create of ProductEntity
            jest.spyOn ( ProductEntity, "create" )
                .mockImplementationOnce ( () => Promise.reject ( "DummyException" ) )

            const productController = new ProductController ()

            // Test the service
            return productController.addProduct ( requestMock, responseMock, () => {} ).then ( () => {

                expect ( responseMock.httpStatus ).toBe ( 500 )

                expect ( responseMock.content.id ).not.toBeNull
                expect ( responseMock.content.message ).not.toBeNull
                expect ( responseMock.content.type ).toBe ( ErrorType.APPLICATION_ERROR )

                // // Verify the mocked method was called
                // expect ( ProductEntity.create.called ).to.be.true
                //
                // // Restore the original behavior of the mocked method
                // ProductEntity.create.restore ()
            } )
        } )

    } )
} )