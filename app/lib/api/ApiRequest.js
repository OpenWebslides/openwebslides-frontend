// @flow

import { DEFAULT_URL } from './constants';

import asyncFetch from './asyncFetch';
import type {
  Request,
  MethodType,
} from './model';

import { methodTypes } from './model';

const ApiRequest = (): Request => {
  const request: Request = {
    config: {
      // Request URL (base)
      url: DEFAULT_URL,

      // Request endpoint
      endpoint: '',

      // Request headers
      headers: {
        'Content-Type': 'application/vnd.api+json',
        Accept: 'application/vnd.api+json',
        Authorization: '',
      },

      // Request parameters
      parameters: {},

      // Request HTTP method
      method: 'GET',

      // Request body
      body: '',
    },
    setEndpoint: (endpoint: string): Request => {
      request.config.endpoint = endpoint;

      return request;
    },

    setMethod: (method: MethodType): Request => {
      request.config.method = method;

      return request;
    },

    addParameter: (parameter: string, value: string): Request => {
      request.config.parameters[parameter] = value;

      return request;
    },

    setBody: (body: string): Request => {
      request.config.body = body;

      return request;
    },

    // Execute HTTP request
    execute: (): string => {
      let url: string = `${request.config.url}${request.config.endpoint}`;

      if (Object.keys(request.config.parameters).length !== 0) {
        const query = Object.keys(request.config.parameters).map((k: string): string => {
          return `${encodeURIComponent(k)}=${encodeURIComponent(request.config.parameters[k])}`;
        }).join('&');

        url += `?${query}`;
      }

      const options: RequestOptions = {
        method: request.config.method,
        headers: request.config.headers,
      };

      if (request.config.body && request.config.method !== methodTypes.GET) {
        options.body = request.config.body;
      }

      return asyncFetch(url, options);
    },
  };

  return request;
};

export default ApiRequest;
