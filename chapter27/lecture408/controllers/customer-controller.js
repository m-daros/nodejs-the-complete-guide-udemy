const { CustomerEntity } = require ( "../orm/sequelize/model/sequelize-orm-model.js" );
const { catchErrors } = require ( "../util/error-handling.js" );

exports.getCustomers = catchErrors ( async ( request, response, next ) => {

    const customers = await CustomerEntity.findAll ();

    response.status ( 200 )
        .json ( customers );
} );