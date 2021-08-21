const { CustomerEntity } = require ( "../orm/sequelize/model/sequelize-orm-model.js" );

exports.customersView = ( request, response, next ) => {

    CustomerEntity.findAll ()
        .then ( customers => {

            response.write ( "<h1>Customers<h1>" );
            response.write ( "<ul>" );

            customers.forEach ( customer => {

                response.write ( `<li>${customer.name} ${customer.surname}</li>` );
            } )

            response.write ( "</ul>" );
            response.send ();
        } )
        .catch ( error => {

            console.log ( `ERROR: ${error}` )
            response.status ( 500 );
            response.send ( "Unable to show customers" );
        } );
};