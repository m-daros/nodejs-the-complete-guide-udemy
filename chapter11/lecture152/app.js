const express = require ( "express" );

const appRoutes = require ( "./routes/app-routes.js" );
const defaultRoutes = require ( "./routes/default-routes.js" );
const productRoutes = require ( "./routes/product-routes.js" );
const customerRoutes = require ( "./routes/customer-routes.js" );

const sequelize = require ( "./config/orm-sequelize.js" );
const customerRepository = require ( "./repositories/customer-repository.js" );
const Customer = require ( "./models/customer.js" );

const app = express ();

app.use ( appRoutes );
app.use ( productRoutes );
app.use ( customerRoutes );
app.use ( defaultRoutes );

initDB ();

function initDB () {

    // Init the DB schema if necessary
    sequelize.sync ()
        .then ( result => {

            // Add some customer
            customerRepository.deleteCustomers ()
        })
        .then (() => {

            // Add some customer
            customerRepository.addCustomer ( Customer.build ( { name: "Mario", surname: "Rossi", age: 24 } ) );
            customerRepository.addCustomer ( Customer.build ( { name: "Marco", surname: "Bianchi", age: 32 } ) );
        })
        .then (() => {

            app.listen ( 3000 );
            console.log ( "DB initialized and app started and listen to port 3000" );
        })
        .catch ( error => {

            console.log ( `Unable to start the app due to a DB initilalization error: ${error}` );
        } );
}