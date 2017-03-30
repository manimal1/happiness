/**
 *  REST WELL WITH HAPI
 * ─────────────────────
 * HELLO_HAPI
 * Exercise 1 of 13
 *
 * Create a hapi server that listens on a port passed from the command line and
 * replies with "Hello hapi" when an HTTP GET request is sent to / .
 *
 * The workshop will execute requests against the server and verify the output.
 *
 */
const Hapi = require('hapi');
const server = new Hapi.Server();

/**
 * One server can have multiple connections, running on different ports
 * - you can add labels to connections as well
 */
server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

/**
 * Routes are added via the route function :
 * you can also pass an array: much more convenient : see exercise three
 */
server.route({path: '/', method:'GET', handler: helloWorld});

/**
 * Hello world route handler
 * @param {Object} request
 * @param {Object|Function} reply
 */
function helloWorld(request, reply) {
    console.log( 'request made' );

    // Request has all information
    // Reply handles client response
    reply( "Hello hapi" );
}

/**
 * Start up the server
 * - err can be passed in callback function
 */
server.start(() => {
    console.log('Server running at:', server.info.uri);
} );
