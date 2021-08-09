const express = require ( "express" );

const appRoutes = require ( "./routes/app-routes.js" );
const defaultRoutes = require ( "./routes/default-routes.js" );
const productRoutes = require ( "./routes/product-routes.js" );
const customerRoutes = require ( "./routes/customer-routes.js" );

const app = express ();

app.use ( appRoutes );
app.use ( productRoutes );
app.use ( customerRoutes );
app.use ( defaultRoutes );

app.listen ( 3000 );