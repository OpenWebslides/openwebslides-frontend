// @flow

import { API_URL } from 'config/api';

import fetchApiResponseData from './helpers/fetchApiResponseData';
import * as m from './model';

// JSON API media type
const MEDIA_TYPE = 'application/vnd.api+json';

class ApiRequest {
  config: m.ApiRequestConfig = {
    url: API_URL,
    endpoint: '',
    resource: null,
    subEndpoint: null,
    subResource: null,
    headers: {
      'Content-Type': MEDIA_TYPE,
      Accept: MEDIA_TYPE,
    },
    parameters: {},
    method: m.httpMethods.GET,
    body: '',
  };

  setEndpoint = (endpoint: string): ApiRequest => {
    if (endpoint.startsWith('/')) {
      this.config.endpoint = endpoint;
    }
    else {
      this.config.endpoint = `/${endpoint}`;
    }

    return this;
  };

  setResource = (id: string): ApiRequest => {
    this.config.resource = id;

    return this;
  };

  setSubEndpoint = (subEndpoint: string): ApiRequest => {
    if (subEndpoint.startsWith('/')) {
      this.config.subEndpoint = subEndpoint;
    }
    else {
      this.config.subEndpoint = `/${subEndpoint}`;
    }

    return this;
  };

  setSubResource = (id: string): ApiRequest => {
    this.config.subResource = id;

    return this;
  };

  setHeader = (header: string, value: string): ApiRequest => {
    this.config.headers[header] = value;

    return this;
  };

  setParameter = (parameter: string, value: string): ApiRequest => {
    this.config.parameters[parameter] = value;

    return this;
  };

  setMethod = (method: m.HttpMethod): ApiRequest => {
    this.config.method = method;

    return this;
  };

  setBody = (body: string): ApiRequest => {
    this.config.body = body;

    return this;
  };

  setToken = (token: ?m.ApiToken): ApiRequest => {
    if (token && token.length !== 0) {
      this.config.headers.Authorization = `Bearer ${token}`;
    }
    else {
      delete this.config.headers.Authorization;
    }

    return this;
  };

  getUrl = (): string => {
    let url: string = `${this.config.url}${this.config.endpoint}`;

    if (this.config.resource) {
      url += `/${this.config.resource}`;

      if (this.config.subEndpoint) {
        url += `${this.config.subEndpoint}`;

        if (this.config.subResource) {
          url += `/${this.config.subResource}`;
        }
      }
    }

    if (Object.keys(this.config.parameters).length !== 0) {
      const query = Object.keys(this.config.parameters).map((k: string): string => {
        return `${encodeURIComponent(k)}=${encodeURIComponent(this.config.parameters[k])}`;
      }).join('&');

      url += `?${query}`;
    }

    return url;
  };

  getOptions = (): RequestOptions => {
    const options: RequestOptions = {
      method: this.config.method,
      headers: this.config.headers,
    };

    if (this.config.body && this.config.method !== m.httpMethods.GET) {
      options.body = this.config.body;
    }

    return options;
  };

  execute = (): Promise<m.ApiResponseData> => {
    return fetchApiResponseData(this.getUrl(), this.getOptions());
  };
}

export { MEDIA_TYPE };
export default ApiRequest;
