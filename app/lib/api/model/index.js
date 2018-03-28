// @flow

import type { MethodType } from './methodTypes';
import { methodTypes } from './methodTypes';

export type Headers = {
  +[name: string]: string,
};

export type Parameters = {
  +[name: string]: string,
};

export type RequestConfig = {
  +url: string,
  +endpoint: string,
  +headers: Headers,
  +parameters: Parameters,
  +method: MethodType,
  +body: {},
};

export type Request = {
  +config: RequestConfig,
  +setEndpoint: (endpoint: string) => Request,
  +setMethod: (method: MethodType) => Request,
  +addParameter: (parameter: string, value: string) => Request,
  +execute: () => Promise<*>,
};

export {
  methodTypes,
};

export type {
  MethodType,
};

export type ValidationErrors = {
  +[name: string]: string,
};
