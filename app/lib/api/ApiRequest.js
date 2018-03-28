// @flow

import { DEFAULT_URL } from './constants';

import asyncFetch from './asyncFetch';
import type {
  Request,
  RequestConfig,
  MethodType,
} from './model';

const ApiRequest = (): Request => {
  const request: Request = {};

  /**
   * Properties
   *
   * */
  request.config = {
    // Request URL (base)
    url: DEFAULT_URL,

    // Request endpoint
    endpoint: '',

    // Request headers
    headers: {
      'Content-Type': 'application/vnd.api+json',
      Accept: 'application/vnd.api+json',
      Authorization: null,
    },

    // Request parameters
    parameters: {},

    // Request HTTP method
    method: 'GET',

    // Request body
    body: {},
  };

  /**
   * Methods
   *
   * */
  request.setEndpoint = (endpoint: string): Request => {
    request.config.endpoint = endpoint;

    return request;
  };

  request.setMethod = (method: MethodType): Request => {
    request.config.method = method;

    return request;
  };

  request.addParameter = (parameter: string, value: string): Request => {
    request.config.parameters[parameter] = value;

    return request;
  };

  // Execute HTTP request
  request.execute = async (): Promise<*> => {
    let url: string = `${request.config.url}${request.config.endpoint}`;

    if (request.config.parameters) {
      const query = Object.keys(request.config.parameters).map((k: string): string => {
        return `${encodeURIComponent(k)}=${encodeURIComponent(request.config.parameters[k])}`;
      }).join('&');

      url += `?${query}`;
    }

    const options: RequestConfig = {
      method: request.config.method,
      headers: request.config.headers,
      url: request.config.url,
      body: request.config.body,
      mode: 'no-cors',
    };

    return asyncFetch(url, options);
  };

  return request;
};

export default ApiRequest;
