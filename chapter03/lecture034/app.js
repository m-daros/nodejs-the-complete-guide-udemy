const http = require ( "http" )

function handlePostBody ( request, response ) {

    const bodyChunks = [];

    // Register handler from the stream of data in the request body
    request.on ( "data", ( bodyChunk ) => {

        bodyChunks.push ( bodyChunk );
    })

    // Register handler for the end of the data stream of the request body
    request.on ( "end", () => {

        const parsedBody = Buffer.concat ( bodyChunks ).toString ();

        console.log (`Received ${request.method} ${request.url} \nbody: ${parsedBody}`);

        response.statusCode = 204;
        response.end ();
    } )
}

const server = http.createServer ( ( request, response ) => {

    if ( request.method === "POST" ) {

        handlePostBody ( request, response );
    }
    else {

        console.log ( `Received ${request.method} ${request.url}` );
        response.statusCode = 204;
        response.end ();
    }
} )

server.listen ( port = 3000, () => console.log ( "Listen on port 3000" ) )