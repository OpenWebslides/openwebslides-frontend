// @flow

/* eslint-disable flowtype/require-types-at-top */

const GET: 'GET' = 'GET';
const POST: 'POST' = 'POST';
const PATCH: 'PATCH' = 'PATCH';
const DELETE: 'DELETE' = 'DELETE';

export const httpMethods = {
  GET,
  POST,
  PATCH,
  DELETE,
};

export type HttpMethod = $Values<typeof httpMethods>;

// eslint-disable-next-line flowtype/require-exact-type
export type ApiRequestHeaders = {
  [name: string]: string,
};

// eslint-disable-next-line flowtype/require-exact-type
export type ApiRequestParameters = {
  [name: string]: string,
};

export type ApiRequestConfig = {|
  method: HttpMethod,
  apiUrl: string, // Base api url
  pathSegments: $ReadOnlyArray<string>, // Endpoints, resource ids, ...
  parameters: ApiRequestParameters,
  headers: ApiRequestHeaders,
  body: ?string,
|};

export type ApiResponseData = {|
  // eslint-disable-next-line flowtype/no-weak-types
  +body: ?Object,
  +status: number,
  +token: ?string,
|};
