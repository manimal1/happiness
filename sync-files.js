'use strict';

/**
 * Goal of File
 * Outputs html files to asset-server/public
 *
 * Should run before starting the view-server
 * Functionality needs some improvements, possibly using streams but works for now :)
 *
 * @type {renderFiles}
 */
const nunjucks = require('nunjucks');
const Path = require( 'path' );
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const appRoot = require('path').resolve();

const options = {
    path: `${appRoot}/view-server/pages`,
    outputPath: `${appRoot}/asset-server/public/`,
    data: '/data',
    inputExtension: /.tpl/,
    outputExtension: '.html',
    commonData: 'common.json'
};

nunjucks.configure(options.path);

module.exports = {
    renderFiles : renderFiles,
    printJSONFile : printJSONFile,
    listFiles : listFiles
};

function renderFiles() {
    return Promise.all([fs.readdirAsync(options.path), _getPageData()])
        .then((result) => _printTemplates(result[0], result[1]));
}

/**
 * Gets templates from /pages directory, combines templates with data
 *
 * @param {Array} files read in promise.all
 * @param {Object} data combined in _getPageData function
 */
function _printTemplates(files, data) {
    const commonData = {common: data.common};

    console.log( 'data' );
    console.log( data );

    files.forEach((filename) => {
        if (!filename.match(options.inputExtension)) {
            return;
        }

        const name = filename.split('.')[0];
        const pageData = Object.assign({}, commonData, {page: data[name]});
        const html = nunjucks.render(filename, pageData);

        // write to output file
        fs.writeFileAsync(options.outputPath + name + options.outputExtension, html);
    });
}

/**
 * Grabs json files from pages/data and combines into single object
 * - does not recursively search for data, reads only the one directory for now
 *
 * @returns {Promise.<combinedData>}
 */
function _getPageData() {
    const dataPath = options.path + options.data;
    const combinedData = {};

    return fs.readdirAsync(dataPath)
        .then(result => {
            result.forEach(filename => {
                let data = require(dataPath + '/' + filename);
                let key = filename.split('.')[0];
                combinedData[key] = data;
            });

            return combinedData;
        });
}

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

/**
 * Retrieves a list of files and wraps with link tags for cdn navigation
 *
 * link tags : `<a href='/${item}'>${item}</a>`
 *
 * @returns {Promise}
 */
function listFiles( isHtml )
{
    const libraries = Path.join( Path.resolve(), '/asset-server/public');

    if ( !isHtml )
    {
        return fs.readdirAsync( libraries );
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
