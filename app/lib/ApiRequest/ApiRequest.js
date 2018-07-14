// @flow
/* eslint-disable quote-props */

import _ from 'lodash';

import { API_URL } from 'config/api';
import { UnsupportedOperationError } from 'errors';

import fetchApiResponseData from './helpers/fetchApiResponseData';
import * as m from './model';

// JSON API media type
const MEDIA_TYPE = 'application/vnd.api+json';

const defaultConfig = {
  url: API_URL,
  pathSegments: [],
  headers: {
    'Content-Type': MEDIA_TYPE,
    'Accept': MEDIA_TYPE,
  },
  parameters: {},
  body: null,
};

class ApiRequest {
  config: m.ApiRequestConfig;

  constructor(method: m.HttpMethod): void {
    this.config = {
      ..._.cloneDeep(defaultConfig),
      method,
    };
  }

  addPathSegment = (segment: string): ApiRequest => {
    this.config.pathSegments.push(segment);
    return this;
  };

  setParameter = (parameter: string, value: string): ApiRequest => {
    this.config.parameters[parameter] = value;
    return this;
  };

  setHeader = (header: string, value: string): ApiRequest => {
    this.config.headers[header] = value;
    return this;
  };

  removeHeader = (header: string): ApiRequest => {
    this.config.headers = _.omit(this.config.headers, header);
    return this;
  };

  setBody = (body: string): ApiRequest => {
    if (this.config.method === m.httpMethods.GET) {
      throw new UnsupportedOperationError(`GET request cannot have a body.`);
    }

    this.config.body = body;
    return this;
  };

  setToken = (token: ?m.ApiToken): ApiRequest => {
    if (token) this.setHeader('Authorization', `Bearer ${token}`);
    else this.removeHeader('Authorization');

    return this;
  };

  getUrl = (): string => {
    if (this.config.pathSegments.length === 0) {
      throw new UnsupportedOperationError(`Must add at least one pathSegment.`);
    }

    // Concat the url and path
    let url: string = `${this.config.url}/${this.config.pathSegments.join('/')}`;

    // If there are parameters
    if (Object.keys(this.config.parameters).length !== 0) {
      // Concat the parameters into a query
      const query = Object.keys(this.config.parameters).map((k: string): string => {
        return `${encodeURIComponent(k)}=${encodeURIComponent(this.config.parameters[k])}`;
      }).join('&');

      // Append the query to the url
      url += `?${query}`;
    }

    return url;
  };

  getOptions = (): RequestOptions => {
    return {
      method: this.config.method,
      headers: this.config.headers,
      body: this.config.body,
    };
  };

  execute = (): Promise<m.ApiResponseData> => {
    return fetchApiResponseData(this.getUrl(), this.getOptions());
  };
}

export { MEDIA_TYPE, defaultConfig };
export default ApiRequest;
