const { CustomerEntity } = require ( "../orm/sequelize/model/sequelize-orm-model.js" );
const { wrap } = require ( "./error-controller.js" );

exports.customersView = wrap ( function *( request, response, next ) {

    const customers = yield CustomerEntity.findAll ();

    response.write ( "<h1>Customers<h1>" );
    response.write ( "<ul>" );

    customers.forEach ( customer => {

        response.write ( `<li>${customer.name} ${customer.surname}</li>` );
    } )

    response.write ( "</ul>" );
    response.send ();
} );