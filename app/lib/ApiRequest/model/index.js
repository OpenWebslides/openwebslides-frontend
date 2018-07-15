// @flow

import * as httpMethods from './httpMethods';

export type ApiToken = string;

export type ApiRequestHeaders = {
  [name: string]: string,
};

export type ApiRequestParameters = {
  [name: string]: string,
};

export type ApiRequestConfig = {|
  method: httpMethods.HttpMethod,
  apiUrl: string, // Base api url
  pathSegments: Array<string>, // Endpoints, resource ids, ...
  parameters: ApiRequestParameters,
  headers: ApiRequestHeaders,
  body: ?string,
|};

export type ApiResponseData = {|
  // eslint-disable-next-line flowtype/no-weak-types
  +body: Object,
  +status: number,
  +token: ?ApiToken,
|};

export * from './httpMethods';
