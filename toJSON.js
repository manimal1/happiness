/**
 * Write a file handler that prints to json
 * - for converting objects to json quickly
 */

const defaultConfig =  { file : 'filename.json', encoding : 'utf8' };
const fs = require('fs');
const Path = require( 'path' );
const appRoot = Path.resolve();
const staticData = Path.join( appRoot, '/views/data/' );

printJSONFile();

/**
 * Utility to print object to Json
 *
 * - lets get a colorful logger installed at some point : winston, something with chalk
 *
 * @param config
 * @param toPrint
 */
function printJSONFile( config, toPrint )
{
    config = config || defaultConfig;
    toPrint = toPrint || { hello : 'world' };

    console.log( JSON.stringify( toPrint ) );
    console.log( 'OutPut File : ', config.file );

    return fs.writeFileSync( config.file, JSON.stringify( toPrint) );
}
