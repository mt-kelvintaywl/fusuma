'use strict';

const server = require('../server/fileServer');
const { info } = require('../cli/log');

async function serverFilesForProd(config) {
  await server(config.internal.outputDirPath, config.build.publicPath, config.internal.port);
  info('start', `Serving on http://localhost:${config.internal.port}`);
}

module.exports = serverFilesForProd;
