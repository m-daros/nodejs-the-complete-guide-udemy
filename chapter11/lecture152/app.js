const express = require ( "express" );

const appRoutes = require ( "./routes/app-routes.js" );
const defaultRoutes = require ( "./routes/default-routes.js" );
const productRoutes = require ( "./routes/product-routes.js" );
const customerRoutes = require ( "./routes/customer-routes.js" );
const orderRoutes = require ( "./routes/order-routes.js" );

const sequelize = require ( "./orm/sequelize/sequelize-config.js" );
const customerRepository = require ( "./repositories/customer-repository.js" );
const productRepository = require ( "./repositories/product-repository.js" );

const Customer = require ( "./orm/sequelize/model/customer-entity.js" );
const Product = require ( "./orm/sequelize/model/product-entity.js" );

const modelRelations = require ( "./orm/sequelize/model/relations.js" );

const app = express ();

app.use ( appRoutes );
app.use ( productRoutes );
app.use ( customerRoutes );
app.use ( orderRoutes );

// These routes must be added as last routes (they mask other routes)
app.use ( defaultRoutes );


initDB ();

function initDB () {

    // Init the DB schema if necessary
//    sequelize.sync ()
    sequelize.sync ( { force: true } )
        .then ( result => {

            customerRepository.deleteCustomers ();
            productRepository.deleteProducts ();
        })
        .then (() => {

            // Add some customer
            customerRepository.addCustomer ( Customer.build ( { name: "Mario", surname: "Rossi", age: 24 } ) );
            customerRepository.addCustomer ( Customer.build ( { name: "Marco", surname: "Bianchi", age: 32 } ) );

            // Add some product
            productRepository.addProduct ( Product.build ( { name: "Samsung Galaxy S10" } ) );
            productRepository.addProduct ( Product.build ( { name: "Samsung Galaxy S4" } ) );
        })
        .then (() => {

            app.listen ( 3000 );
            console.log ( "DB initialized and app started and listen to port 3000" );
        })
        .catch ( error => {

            console.log ( `Unable to start the app due to a DB initilalization error: ${error}` );
        } );
}