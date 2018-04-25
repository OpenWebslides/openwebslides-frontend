// @flow

import type { MethodType } from './methodTypes';
import { methodTypes } from './methodTypes';

export type Headers = {
  [name: string]: string,
};

export type Parameters = {
  [name: string]: string,
};

export type RequestConfig = {
  url: string,
  endpoint: string,
  headers: Headers,
  parameters: Parameters,
  method: MethodType,
  body: string,
};

export type Response = {
  // eslint-disable-next-line flowtype/no-weak-types
  +body: Object,
  +status: number,
  +token: ?string,
};

export type Request = {
  +config: RequestConfig,
  +setEndpoint: (endpoint: string) => Request,
  +setMethod: (method: MethodType) => Request,
  +setParameter: (parameter: string, value: string) => Request,
  +setHeader: (header: string, value: string) => Request,
  +setBody: (body: string) => Request,
  +setToken: (token: ?string) => Request,
  +execute: () => Promise<Response>,

  +getUrl: () => string,
  +getOptions: () => RequestOptions,
};

export {
  methodTypes,
};

export type {
  MethodType,
};
