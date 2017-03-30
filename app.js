/**
 * App Starts a cdn at localhost:3001
 *
 * - asset-server has a static file viewer : go to //localhost:3001
 * - view-server is configured to //localhost:3000
 * - view-server is configured to look for assets at //localhost:3001/ for its files under pages/data/common
 */
const assetServer = require( './asset-server' );
const viewServer = require( './view-server' );

viewServer.exportTemplates()
    .then( viewServer.startServer )
    .then( assetServer );
