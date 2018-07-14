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
  url: string,
  pathSegments: Array<string>,
  parameters: ApiRequestParameters,
  headers: ApiRequestHeaders,
  body: ?string,
|};

export type ApiResponseData = {|
  +body: {},
  +status: number,
  +token: ?ApiToken,
|};

export * from './httpMethods';
