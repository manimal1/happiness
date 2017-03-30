'use strict';

const nunjucks = require('nunjucks');
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

/**
 * Grabs /pages/data and creates a data object to compile the templates to html
 * Outputs html files to asset-server/public
 *
 * Should run before starting the view-server
 * Functionality needs some improvements, possibly using streams but works for now :)
 *
 * @type {renderFiles}
 */
module.exports = renderFiles;

function renderFiles() {
    return Promise.all([fs.readdirAsync(options.path), getPageData()])
        .then((result) => printTemplates(result[0], result[1]));
}

/**
 * Gets templates from /pages directory, combines templates with data
 *
 * @param {Array} files read in promise.all
 * @param {Object} data combined in getPageData function
 */
function printTemplates(files, data) {
    const commonData = {common: data.common};

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
function getPageData() {
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

