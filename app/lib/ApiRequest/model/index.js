// @flow

import * as httpMethods from './httpMethods';

export type Headers = {
  [name: string]: string,
};

export type Parameters = {
  [name: string]: string,
};

export type ApiRequestConfig = {
  url: string, // Request URL (base)
  endpoint: string, // Request endpoint
  resource: ?string, // Request resource ID
  subEndpoint: ?string, // Request nested endpoint
  subResource: ?string, // Request nested endpoint resource ID
  headers: Headers,
  parameters: Parameters,
  method: httpMethods.HttpMethod,
  body: string,
};

export type Token = string;

export type ApiResponseData = {
  +body: {},
  +status: number,
  +token: ?Token,
};

export * from './httpMethods';
