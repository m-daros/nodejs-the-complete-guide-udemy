const expect = require ( "chai" ).expect
const sinon = require ( "sinon" )

const customerController = require ( "../../../controllers/customer-controller" )
const { CustomerEntity } = require ( "../../../orm/sequelize/model/sequelize-orm-model" )
const { ErrorType } = require ( "../../../model/error-model" )
const { getResponseMock } = require ( "../../test-utils" )

describe ( "customer-controller", () => {

    describe ( "getCustomers ()", () => {

        it ( "should return status code 200 and all the customers", ( done ) => {

            const requestMock = {}
            const responseMock = getResponseMock ()

            const expectedCustomers = [ { id: 1, name: "Mario", surname: "Rossi" } ]

            // Mock the method findAll of CustomerEntity
            sinon.stub ( CustomerEntity, "findAll" )

            // Configure the exoected result of the mocked method
            CustomerEntity.findAll.returns ( expectedCustomers )

            // Test the service
            customerController.getCustomers ( requestMock, responseMock, () => {} ).then ( () => {

                expect ( responseMock.status ).to.be.equal ( 200 )
                expect ( responseMock.content ).to.be.equal ( expectedCustomers )

                // Verify the mocked method was called
                expect ( CustomerEntity.findAll.called ).to.be.true

                // Restore the original behavior of the mocked method
                CustomerEntity.findAll.restore ()

                done ()
            } )
        } )


        it ( "should return status code 500 and an error payload when an internal server error occurs", ( done ) => {

            const requestMock = {}
            const responseMock = getResponseMock ()

            // Mock the method findAll of CustomerEntity
            sinon.stub ( CustomerEntity, "findAll" )

            // Configure the exoected result of the mocked method
            CustomerEntity.findAll.throws ( "DummyException" )

            // Test the service
            customerController.getCustomers ( requestMock, responseMock, () => {} ).then ( () => {

                expect ( responseMock.status ).to.be.equal ( 500 )

                expect ( responseMock.content.id ).to.be.not.null
                expect ( responseMock.content.message ).to.be.not.null
                expect ( responseMock.content.type ).to.be.equals ( ErrorType.APPLICATION_ERROR )

                // Verify the mocked method was called
                expect ( CustomerEntity.findAll.called ).to.be.true

                // Restore the original behavior of the mocked method
                CustomerEntity.findAll.restore ()

                done ()
            } )
        } )

    } )
} )