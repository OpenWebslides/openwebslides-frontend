// @flow

import ApiRequest from './ApiRequest';

import * as model from './model/index';

import type {
  MethodType,
  Headers,
  Parameters,
  RequestConfig,
  Request,
} from './model';

const Api = {
  ApiRequest,
  model,
};

export type {
  MethodType,
  Headers,
  Parameters,
  RequestConfig,
  Request,
};

export default Api;
