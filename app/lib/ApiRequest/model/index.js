// @flow

import * as httpMethods from './httpMethods';

export type ApiToken = string;

export type ApiRequestHeaders = {
  [name: string]: string,
};

export type ApiRequestParameters = {
  [name: string]: string,
};

export type ApiRequestConfig = {
  url: string, // Request URL (base)
  endpoint: string, // Request endpoint
  resource: ?string, // Request resource ID
  subEndpoint: ?string, // Request nested endpoint
  subResource: ?string, // Request nested endpoint resource ID
  headers: ApiRequestHeaders,
  parameters: ApiRequestParameters,
  method: httpMethods.HttpMethod,
  body: string,
};

export type ApiResponseData = {
  +body: {},
  +status: number,
  +token: ?ApiToken,
};

export * from './httpMethods';
