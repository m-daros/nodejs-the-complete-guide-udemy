const http = require ( "http" )

// Working with multiple files
const routes = require ( "./routes.js" )

const server = http.createServer ( ( request, response ) => {

    routes.handleRequest ( request, response );
} )

server.listen ( port = 3000, () => console.log ( "Listen on port 3000" ) )