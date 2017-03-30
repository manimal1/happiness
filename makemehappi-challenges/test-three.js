/**
 *  REST WELL WITH HAPI
 * ─────────────────────
 * HANDLING
 * Exercise 3 of 13
 *
 * Create a server which responds to requests to / with a static HTML file named
 * index.html containing the following:
 *
 * <html>
 *  <head><title>Hello Handling</title></head>
 *  <body>
 *      Hello Handling
 *  </body>
 * </html>
 *
 * remember you can verify your program with:
 *  makemehapi verify test-three.js
 */
const Hapi = require('hapi');
const server = new Hapi.Server();
const Inert = require( 'inert' );
const Path = require( 'path' );
const appPath = Path.resolve();

/**
 * One server can have multiple connections, running on different ports
 * - you can add labels to connections as well
 */
server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

/**
 * This exercise requires you to install the inert module, which is a hapi plugin
 * for serving static files and directories. You'll need to register the plugin in
 * your code in order to serve static files:
 * - plugins are very useful for splitting up functionality if you want to write your own
 */
server.register(Inert, ( err ) =>
{
    if ( err )
    {
        throw err;
    }
} );

/**
 * Routes... covered this in previous exercise, do take a look at wildcards and symbols you can use like /{file} in path
 * - note that routes also has configuration etc
 */
server.route( [
    {
        path: '/{file}',
        method:'GET',
        handler: helloWorld
    },
    {
        path: '/',
        method:'GET',
        handler: {
            file: Path.join( appPath, "index.html" )
        }
    }]);

/**
 * Hello world route handler
 *
 * @param {Object} request
 * @param {Object|Function} reply
 */
function helloWorld( request, reply )
{
    console.log( 'Made Request' );
    reply( 'Hello ' + encodeURIComponent( request.params.name ) );
}

/**
 * Start up the server
 * - err can be passed in callback function
 */
server.start(() =>
{
    console.log( 'Server Running at:', server.info.uri );
} );
