const express = require ( "express" );

const appRoutes = require ( "./routes/app-routes.js" );
const defaultRoutes = require ( "./routes/default-routes.js" );
const productRoutes = require ( "./routes/product-routes.js" );
const customerRoutes = require ( "./routes/customer-routes.js" );
const orderRoutes = require ( "./routes/order-routes.js" );

const sequelize = require ( "./orm/sequelize/sequelize-config.js" );

const { CustomerEntity, ProductEntity } = require ( "./orm/sequelize/model/sequelize-orm-model" );

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

            CustomerEntity.destroy ( { where: {}, truncate: false } );
            ProductEntity.destroy ( { where: {}, truncate: false } );
        })
        .then (() => {

            // Add some customer
            CustomerEntity.create ( { name: "Mario", surname: "Rossi", age: 24 } );
            CustomerEntity.create ( { name: "Marco", surname: "Bianchi", age: 32 } );

            // Add some product
            ProductEntity.create ( { name: "Samsung Galaxy S10" } );
            ProductEntity.create ( { name: "Samsung Galaxy S4" } );
        })
        .then (() => {

            app.listen ( 3000 );
            console.log ( "DB initialized and app started and listen to port 3000" );
        })
        .catch ( error => {

            console.log ( `Unable to start the app due to a DB initilalization error: ${error}` );
        } );
}