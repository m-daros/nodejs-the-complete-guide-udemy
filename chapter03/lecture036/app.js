const http = require ( "http" )

function sleep ( milliseconds ) {

    return new Promise (( resolve ) => {

        setTimeout ( resolve, milliseconds );
    });
}

async function doLongComputationAsync () {

    await sleep (10000 )
}

function handlePostBody ( request, response, mode ) {

    const bodyChunks = [];

    // Register handler from the stream of data in the request body
    request.on ( "data", ( bodyChunk ) => {

        bodyChunks.push ( bodyChunk );
    })

    // Register handler for the end of the data stream of the request body
    request.on ( "end", async () => {

        const date = new Date ()
        const parsedBody = Buffer.concat ( bodyChunks ).toString ();

        console.log ( `${date} Received ${request.method} ${request.url} \nbody: ${parsedBody}` );

        if ( mode === "async" ) {

            // Simulate a long async operation
            doLongComputationAsync ();
        }
        else {

            // Simulate a long operation waiting for the completion
            await doLongComputationAsync ();
        }

        response.statusCode = 204;
        response.end ()

    } )
}

const server = http.createServer ( ( request, response ) => {

    if ( request.method === "POST" && request.url === "/process-sync" ) {

        handlePostBody ( request, response, "sync" );
    }
    else if ( request.method === "POST" && request.url === "/process-async" ) {

        handlePostBody ( request, response, "async" );
    }
    else {

        console.log ( `Received ${request.method} ${request.url}` );
        response.statusCode = 204;
        response.end ();
    }
} )

server.listen ( port = 3000, () => console.log ( "Listen on port 3000" ) )