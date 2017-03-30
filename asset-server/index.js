'use strict';

/**
 * Serves Static Files on a server
 *
 * - don't forget to set config for location
 */
module.exports = () =>
{
    return listFiles( true ).then( startStaticFileServer );
};

/**
 * Requires
 */
const Path = require('path');
const Promise = require( 'bluebird' ).Promise;

const libraries = Path.join(__dirname, 'public');

const config = {
    name : 'Static File Server',
    server : {
         port: 3001
    },
    fileServerConnection : {
        connections: {
            routes: {
                files: {
                    relativeTo: libraries
                }
            }
        }
    }
};

/**
 * Initializes Hapi instance to serve static files
 */
function startStaticFileServer( directory )
{
    const Hapi = require('hapi');
    const Inert = require('inert');
    const fileServer = new Hapi.Server( config.fileServerConnection );

    fileServer.connection( config.server );
    fileServer.register(Inert, () => {});

    /**
     * Serves Files
     */
    fileServer.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: './',
                redirectToSlash: true,
                index: true
            }
        }
    } );

    /**
     * Lists files on homepage
     */
    fileServer.route({
        method: 'GET',
        path: '/',
        handler: ( request, reply ) =>
        {
            if ( !directory.isHtml )
            {
                console.log( JSON.stringify( directory.list ) );
                return reply( JSON.stringify( directory.list ) ).type( 'application/json' );
            }

            let html = [
                '<html>',
                '<head>',
                `<title>${config.name}</title>`,
                `<link rel="stylesheet" href="main.css">`,
                '</head>',
                '<body>',
                `${directory.list}`,
                '</body>',
                '</html>'
            ].join( '' );

            return reply( html );
        }
    } );

    fileServer.start((err) => {
        if (err) {
            console.log( err );
            throw err;
        }

        console.log( 'CDN Server Started : ' );
        console.log('Static File Server', fileServer.info.uri);
    });
}

/**
 * Retrieves a list of files and wraps with link tags for cdn navigation
 *
 * link tags : `<a href='/${item}'>${item}</a>`
 *
 * @returns {Promise}
 */
function listFiles( isHtml )
{
    const fs = require( 'fs' );

    if ( !isHtml )
    {
        return new Promise( ( resolve, reject ) =>
        {
            fs.readdir( libraries, ( err, files ) => {
                if ( err )
                {
                    reject( err );
                    return;
                }

                console.log( files );

                resolve( files );
            } );
        });
    }

    return new Promise( ( resolve, reject ) =>
    {
        let list = `<a href='/'><h4>my cdn : homepage</h4></a>`;

        fs.readdir( libraries, ( err, files ) => {
            if ( err )
            {
                reject( err );
                return;
            }

            files.forEach( ( item ) =>
            {
                list += `<a href='/${item}'>${item}</a>`
            } );

            resolve( { isHtml, list } );
        } );
    });
}


