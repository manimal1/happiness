/**
 *
 * REST WELL WITH HAPI
 * ─────────────────────
 * ROUTES
 * Exercise 2 of 13
 *
 * Create a hapi server that listens on a port passed from the command line and
 * outputs "Hello [name]" where [name] is replaced with the path parameter supplied
 * to GET /{name}
 *
 * When you have completed your server, you can run it in the test environment
 * with:
 *  makemehapi verify program.js
 *
 *  Note: make sure your current directory is in the same directory as program.js
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
server.route(
{
    path: '/{name}',
    method:'GET',
    handler: helloWorld
} );

/**
 * Hello world route handler
 *
 * @param {Object} request
 * @param {Object|Function} reply
 */
function helloWorld(request, reply) {
    console.log( 'request made' );
    reply('Hello ' + request.params.name);

    /**
     * a more secure alternative is this:
     *
     *     reply('Hello ' + encodeURIComponent(request.params.name));
     *
     * encodeURIComponent escapes all characters except the following: alphabetic, decimal digits, - _ . ! ~ * ' ( )
     * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent for more details why you should call encodeURIComponent on any user-entered parameter
     */
}

/**
 * Start up the server
 * - err can be passed in callback function
 */
server.start(() => {
    console.log('Server running at:', server.info.uri);
} );
