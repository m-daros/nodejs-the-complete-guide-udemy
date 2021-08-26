const expect = require ( "chai" ).expect
const customerController = require ( "../../controllers/customer-controller" )

describe ( "customer-controller", () => {

    describe ( "getCustomers ()", () => {

        it ( "should return all the customers", async () => {

            const customers = await customerController.getCustomers ()

            console.log ( `customers: ${JSON.stringify ( customers ) }` )
        } )
    } )
} )