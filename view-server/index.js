module.exports =
{
    exportTemplates : require( './exportTemplates' ),
    startServer : require( './server' )
};



// 'use strict';
//
// const Hapi = require('hapi');
// // See how debug works with request.log and server.log
// const server = new Hapi.Server({debug: {request: ['pages']}});
// const config = require('./server-config.json');
//
// global.config = config;
//
// /**
//  * View Server
//  *
//  * - For templating and such
//  * - nunjucks configured as view engine
//  * - see exportTemplates for exporting the pages as plain html
//  * - want to install handlebars as well as an alternative
//  *
//  * - static file handler spawned as separate Server, set in config here somehow
//  */
// module.exports = start;
//
// function start() {
//     const routes = require('./routes');
//
//     server.connection(config.server);
//
//     registerViews(server);
//     routes(server);
//     server.start(startServer);
// }
//
// /**
//  * Registers View Engines
//  * - want to be able to register multiple views eventually
//  * - registers pages
//  */
// function registerViews(server) {
//     const Path = require('path');
//     const Vision = require('vision');
//     const NunjucksHapi = require('nunjucks-hapi');
//     const viewPath = Path.join(__dirname, './pages');
//     const env = NunjucksHapi.configure(viewPath);
//
//     // Todo: add custom functions for isEnvironment etc
//     // - investigate how to incorporate custom functions into preRendering function in exportTemplates
//     env.addFilter('some-filter', e => {
//         return '';
//     });
//
//     server.register(Vision, (err) => {
//         if (err) {
//             console.log(err);
//             return;
//         }
//
//         server.views({
//             engines: {
//                 tpl: NunjucksHapi
//             },
//             compileMode: 'async',
//             path: viewPath
//         });
//
//     });
// }
//
// /**
//  * Callback for starting view Server
//  */
// function startServer(err) {
//     if (err) {
//         console.log(err);
//         return;
//     }
//
//     console.log('server running at:', server.info.uri);
// }
//
