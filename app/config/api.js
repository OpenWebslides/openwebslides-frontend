// @flow

/**
 * Base API URL
 * @type {string}
 *
 * The base URL used for API calls. Defaults to the `owsdev` server, is overridden on
 * production runtime with the correct base URL configured for that server.
 * In development, it is also possible to use the API_URL environment variable.
 *
 * $ API_URL=http://localhost:3000/api yarn run dev-server
 *
 */
export const API_URL = window.API_URL || 'http://owsdev.ugent.be/api';

/**
 * Required API version
 * @type {string}
 *
 * The required version of the API running on the API server. It follows the semver schema,
 * and is matched on the server to provide the correct version. Specify a constraint if a
 * specific version is needed. Constraints are parsed using the Ruby guidelines:
 * https://guides.rubygems.org/patterns/#pessimistic-version-constraint
 *
 * Example valid values:
 * ~6.3, ~>6.3, >=6.3, <7
 *
 * ~>6 resolves to >= 6.0.0, < 7
 *    You require features that are already present in 6.0.0.
 *    You do not depend on any additional features added in a later 6.x release
 *
 * ~>6.2 resolves to >= 6.2.0, < 7
 *    You require features present in a specific minor release of 6.x.
 *    You do not depend on any additional features added in a later 6.x release.
 *
 * ~>6.2.3 resolves to >= 6.2.3, < 6.3
 *    You require features present in a specific minor release of 6.x.
 *    You require a specific bug fix or patch to be present.
 *    You require a feature in a later 6.x release not to be present
 *
 *  In most cases, specifying the ~> operator, and a major and minor versions should be adequate.
 *
 */
export const API_VERSION = '~>8';
