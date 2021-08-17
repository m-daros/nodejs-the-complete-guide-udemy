const path = require ( "path" );

const { OrderEntity, ProductEntity } = require ( "../orm/sequelize/model/sequelize-orm-model" );

exports.addOrderView = ( request, response, next ) => {

    ProductEntity.findAll ()
        .then ( products => {

            response.write ( "<h1>Add order</h1>" );
            response.write ( "<form method='POST' action='/add-order'>" );
            response.write ( "<br/>" );

            response.write ( "Product:  <select name='productId'>" );

            products.forEach ( product => {

                response.write ( `<option value="${product.id}'">${product.name}</option>` );
            } );

            response.write ( "</select>" );

            response.write ( "Quantity: <input type='text' name='quantity'/>" );

            response.write ( "<button type='submit'>Add</button>" );
            response.write ( "</form>" );
            response.send ();
        } )
        .catch ( error => {

            console.log ( `ERROR: ${error}` )
            response.status ( 500 );
            response.send ( `Unable to load produucts` );
        } )

};

exports.addOrder = ( request, response, next ) => {

    // TODO CAPIRE SE GLI INSERT VENGONO FATTI IN MODO TRANSAZIONALE
    const orderPromise = OrderEntity.create ( { date: new Date (), customerId: 1 } ); // TODO Get customnerId from the logged user
    const productPromise = ProductEntity.findByPk ( parseInt ( request.body [ "productId" ] ) );

    // Orchestrate the 2 promises (the 2 queries) adding the product to the order when both the 2 queries are ready
    Promise.all ( [ orderPromise, productPromise ] )
        .then ( results => {

            const order = results [0];
            const product = results [1];

            // Add the product to the order through the order_product association, assign the attribute quantity to the association
            order.addProduct ( product, { through: { quantity: parseInt ( request.body [ "quantity" ] ) } } );
        } )
        .then ( result => {

            response.redirect ( "/orders-view" );
        } )
        .catch ( error => {

            console.log ( `ERROR: ${error}` )
            response.status ( 500 );
            response.send ( `Unable to save order: TODO IMPROVE MESSAGE` ); // TODO IMPROVE MESSAGE
        } )
};

exports.ordersView = ( request, response, next ) => {

    // TODO get customerId from the logged user
    OrderEntity.findAll ( { where: { customerId: 1 } } )
        .then ( orders => {

            response.write ( "<h1>Orders<h1>" );
            response.write ( "<ul>" );

            orders.forEach ( order => {

                response.write ( `<li>${order.id} <a href="/order-detail-view/${order.id}">Detail</a></li>` );
            } )

            response.write ( "</ul>" );
            response.write ( "<a href='/add-order-view'>Add an order</a>" );
            response.send ();
        } )
        .catch ( error => {

            console.log ( `ERROR: ${error}` )
            response.status ( 500 );
            response.send ( "Unable to show orders" );
        } );
};

exports.orderDetailView = ( request, response, next ) => {

    const orderId = parseInt ( request.params.orderId , 10 );

    OrderEntity.findByPk ( orderId, { include: ProductEntity } )
        .then ( order => {

            response.write ( "<h1>Order detail<h1>" );
            response.write ( "<ul>" );
            response.write ( `<li>Id: ${order.id} date: ${order.date}</li>` );
            response.write ( "</ul>" );

            response.write ( "<br/>" );

            // Access the product associated to the order (many to meny)
            const products = order.products;

            products.forEach ( product => {

                // Get the attributes of the associations (many to many)
                const orderProduct = product.order_product;

                response.write ( `product: ${product.name} quantity: ${orderProduct.quantity}<br/>` );
            } )

            response.write ( "<br/>" );
            response.write ( "<a href='/orders-view'>Show all orders</a>" );

            response.send ();
        } )
        .catch ( error => {

            console.log ( `ERROR: ${error}` )
            response.status ( 500 );
            response.send ( `Unable to show order with id ${orderId}` );
        } );
};