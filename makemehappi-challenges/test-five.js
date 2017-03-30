/**
 *
 * REST WELL WITH HAPI
 * ─────────────────────
 * VIEWS
 * Exercise 5 of 13
 *
 * Create a server which responds to requests to /?name=Handling using a template
 * located at templates/index.html which outputs the following HTML:
 *
 * <html>
 *  <head><title>Hello Handling</title></head>
 *  <body>
 *      Hello Handling
 *  </body>
 * </html>
 *
 *
 * remember you can verify your program with:
 *  makemehapi verify test-five.js
 */
const Hapi = require('hapi');
const server = new Hapi.Server();
const Inert = require('inert');
const Vision = require('vision');
const Path = require('path');
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
server.register(Inert, (err) => {
    if (err) {
        throw err;
    }
});

/**
 * This exercise requires you to install the vision module, which is a hapi plugin
 * for rendering templates. You'll need to register the plugin in your code in
 * order to render your templates:
 */
server.register(Vision, (err) => {
    if (err) {
        throw err;
    }
});

/**
 * server.views() is the server method that we use to configure the templates
 * used on our server. This method receives a configuration object in which we can
 * set different engines based on file extension. This object can also set a
 * directory path for your templates.
 *
 * - note: to change the extension of the files you're reading change html to hbs or etc
 */
server.views({
    engines: {
        html: require('handlebars')
    },
    path: Path.join( appPath, 'templates' )
});

/**
 * Routes... covered this in previous exercise, do take a look at wildcards and symbols you can use like /{file} in path
 * - note that routes also has configuration etc
 */
server.route([
    /**
     * The view key can be used to define the template to be used to generate the
     * response.
     *
     * The template receives some information from the request. For example, the query
     * parameters that were passed in via the URL are available in the query object.
     * These parameters can then be used in the template.  Query params get
     * automatically parsed and aren't declared in the route path.
     *
     * see templates/index.html
     */
    {
        path: '/',
        method: 'GET',
        handler: {
            view: 'index.html'
        }
    },
    /**
     * will search for provided param in the public folder specified
     * - path.resolve or appPath resolves to where the process was initialized from
     * - in this case the current directory
     */
    {
        path: '/foo/bar/baz/{param}',
        method: 'GET',
        handler: {
            directory: {path: Path.join(appPath, "/public/")}
        }
    }]);

/**
 * Start up the server
 * - err can be passed in callback function
 */
server.start(() => {
    console.log('Server Running at:', server.info.uri);
});
