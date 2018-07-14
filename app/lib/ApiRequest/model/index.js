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
  url: string,
  pathSegments: Array<string>,
  headers: ApiRequestHeaders,
  parameters: ApiRequestParameters,
  method: httpMethods.HttpMethod,
  body: ?string,
};

export type ApiResponseData = {
  +body: {},
  +status: number,
  +token: ?ApiToken,
};

export * from './httpMethods';
