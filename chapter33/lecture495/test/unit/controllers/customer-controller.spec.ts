import { CustomerController } from "../../../src/ts/controllers/customer-controller"
import CustomerEntity from "../../../src/ts/orm/sequelize/model/customer-entity"
import { ErrorType } from "../../../src/ts/model/error-model"
import { getResponseMock } from "../../../src/ts/util/test-utils"

// beforeEach ( () => {
//
//     jest.useFakeTimers ()
// } )

describe ( "customer-controller", () => {

    describe ( "getCustomers ()", () => {

        test ( "should return status code 200 and all the customers", () => {

            const requestMock = {}
            const responseMock = getResponseMock ()

            const expectedCustomers = [ { id: 1, name: "Mario", surname: "Rossi" } ] as CustomerEntity []

            // Mock the method findAll of CustomerEntity
            const customerEntityMock = jest.spyOn ( CustomerEntity,"findAll" )
                .mockImplementation (() => Promise.resolve ( expectedCustomers ) )

            const customerController = new CustomerController ()

            // Test the controller
            return customerController.getCustomers ( requestMock, responseMock, () => {} )
                .then ( () => {

                    // TODO ...
                    expect ( responseMock.httpStatus ).toBe ( 200 )
                    expect ( responseMock.content ).toBe ( expectedCustomers )
                    //
                    // // Verify the mocked method was called
                    // expect ( CustomerEntity.findAll.called ).to.be.true
                    //
                    // // Restore the original behavior of the mocked method
                    // CustomerEntity.findAll.restore ()
                } )
                // .catch ( error => {
                //
                //     done ( error )
                // } )
        } )


        test ( "should return status code 500 and an error payload when an internal server error occurs", () => {

            const requestMock = {}
            const responseMock = getResponseMock ()

            // Mock the method findAll of CustomerEntity
            const customerEntityMock = jest.spyOn ( CustomerEntity,"findAll" )
                .mockImplementation (() => Promise.reject ( "DummyException" ) )

            const customerController = new CustomerController ()

            // Test the service
            return customerController.getCustomers ( requestMock, responseMock, () => {} ).then ( () => {

                expect ( responseMock.httpStatus ). toBe ( 500 )

                expect ( responseMock.content.id ).not.toBeNull
                expect ( responseMock.content.message ).not.toBeNull
                expect ( responseMock.content.type ).toBe ( ErrorType.APPLICATION_ERROR )

                // // Verify the mocked method was called
                // expect ( CustomerEntity.findAll.called ).to.be.true
                //
                // // Restore the original behavior of the mocked method
                // CustomerEntity.findAll.restore ()
            } )
        } )
    } )
} )