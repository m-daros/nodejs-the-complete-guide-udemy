const http = require ( "http" )

const server = http.createServer ( ( request, response ) => {


    console.log ( `Received ${request.url}` );
} )

server.listen ( port = 3000, () => console.log ( "Listen on port 3000" ) )