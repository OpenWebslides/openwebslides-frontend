/* eslint-disable */

const { setup: setupDevServer } = require('jest-dev-server');

module.exports = async function globalSetup() {
  await setupDevServer({
    // The command to start the dev server.
    // #TODO change this to owsqas as soon as it is working again.
    command: `yarn run dev-server --env.API_URL=http://owsdev.ugent.be/api --env.APP_URL=http://owsdev.ugent.be`,
    // Timeout if the dev server hasn't finished starting up within 1 minute.
    launchTimeout: 60000,
    // Print dev server output to the console.
    debug: true,
    // Check this protocol://host:port to see if the dev server has finished starting up.
    protocol: 'http',
    host: 'localhost',
    port: 8080,
  });
  // Your global setup
};
