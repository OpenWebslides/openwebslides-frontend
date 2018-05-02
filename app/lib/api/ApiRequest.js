// @flow

import { API_URL, MEDIA_TYPE } from './constants';

import asyncFetch from './asyncFetch';
import type {
  Request,
  Response,
  MethodType,
} from './model';

import { methodTypes } from './model';

const ApiRequest = (): Request => {
  const request: Request = {
    config: {
      // Request URL (base)
      url: API_URL,

      // Request endpoint
      endpoint: '',

      // Request resource ID
      resource: null,

      // Request nested endpoint
      subEndpoint: null,

      // Request nested endpoint resource ID
      subResource: null,

      // Request headers
      headers: {
        'Content-Type': MEDIA_TYPE,
        Accept: MEDIA_TYPE,
      },

      // Request parameters
      parameters: {},

      // Request HTTP method
      method: methodTypes.GET,

      // Request body
      body: '',
    },

    setEndpoint: (endpoint: string): Request => {
      if (endpoint.startsWith('/')) {
        request.config.endpoint = endpoint;
      }
      else {
        request.config.endpoint = `/${endpoint}`;
      }

      return request;
    },

    setResource: (id: string): Request => {
      request.config.resource = id;

      return request;
    },

    setSubEndpoint: (subEndpoint: string): Request => {
      if (subEndpoint.startsWith('/')) {
        request.config.subEndpoint = subEndpoint;
      }
      else {
        request.config.subEndpoint = `/${subEndpoint}`;
      }

      return request;
    },

    setSubResource: (id: string): Request => {
      request.config.subResource = id;

      return request;
    },

    setParameter: (parameter: string, value: string): Request => {
      request.config.parameters[parameter] = value;

      return request;
    },

    setHeader: (header: string, value: string): Request => {
      request.config.headers[header] = value;

      return request;
    },

    setMethod: (method: MethodType): Request => {
      request.config.method = method;

      return request;
    },

    setBody: (body: string): Request => {
      request.config.body = body;

      return request;
    },

    setToken: (token: ?string): Request => {
      if (token && token.length !== 0) {
        request.config.headers.Authorization = `Bearer ${token}`;
      }
      else {
        delete request.config.headers.Authorization;
      }

      return request;
    },

    // Execute HTTP request
    execute: (): Promise<Response> => {
      return asyncFetch(request.getUrl(), request.getOptions());
    },

    getUrl: (): string => {
      let url: string = `${request.config.url}${request.config.endpoint}`;

      if (request.config.resource) {
        url += `/${request.config.resource}`;

        if (request.config.subEndpoint) {
          url += `${request.config.subEndpoint}`;

          if (request.config.subResource) {
            url += `/${request.config.subResource}`;
          }
        }
      }

      if (Object.keys(request.config.parameters).length !== 0) {
        const query = Object.keys(request.config.parameters).map((k: string): string => {
          return `${encodeURIComponent(k)}=${encodeURIComponent(request.config.parameters[k])}`;
        }).join('&');

        url += `?${query}`;
      }

      return url;
    },

    getOptions: (): RequestOptions => {
      const options: RequestOptions = {
        method: request.config.method,
        headers: request.config.headers,
      };

      if (request.config.body && request.config.method !== methodTypes.GET) {
        options.body = request.config.body;
      }

      return options;
    },
  };

  return request;
};

export default ApiRequest;
