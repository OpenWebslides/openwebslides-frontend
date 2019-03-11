// @flow

/* eslint-disable quote-props */

import _ from 'lodash';

import { API_URL, API_VERSION } from 'config/url';
import { InvalidArgumentError, UnsupportedOperationError } from 'errors';

import {
  httpMethods,
  type HttpMethod, type ApiRequestConfig, type ApiResponseData,
} from '../types';

import fetchApiResponseData from './fetchApiResponseData';

// JSON API media type
const JSONAPI_MEDIA_TYPE = 'application/vnd.api+json';

// Open Webslides API media type, including version parameter
const OWS_MEDIA_TYPE = `application/vnd.openwebslides+json; version="${API_VERSION}"`;

const defaultConfig = {
  apiUrl: API_URL,
  pathSegments: [],
  headers: {
    'Content-Type': JSONAPI_MEDIA_TYPE,
    'Accept': `${JSONAPI_MEDIA_TYPE}, ${OWS_MEDIA_TYPE}`,
  },
  parameters: {},
  body: null,
};

class ApiRequest {
  config: ApiRequestConfig;

  constructor(method: HttpMethod): void {
    this.config = {
      ..._.cloneDeep(defaultConfig),
      method,
    };
  }

  addPathSegment = (segment: string): ApiRequest => {
    const segmentWithoutSlashes = segment.replace(/^\//g, '');
    if (segmentWithoutSlashes === '') throw new InvalidArgumentError(`Cannot add an empty path segment.`);
    this.config.pathSegments = this.config.pathSegments.concat([segmentWithoutSlashes]);
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
    if (this.config.method === httpMethods.GET) {
      throw new UnsupportedOperationError(`GET request cannot have a body.`);
    }

    this.config.body = body;
    return this;
  };

  setToken = (token: ?string): ApiRequest => {
    if (token != null && token !== '') this.setHeader('Authorization', `Bearer ${token}`);
    else this.removeHeader('Authorization');

    return this;
  };

  getUrl = (): string => {
    if (this.config.pathSegments.length === 0) {
      throw new UnsupportedOperationError(`Must add at least one pathSegment.`);
    }

    // Concat the url and path
    let url: string = `${this.config.apiUrl}/${this.config.pathSegments.join('/')}`;

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

  execute = (): Promise<ApiResponseData> => {
    return fetchApiResponseData(this.getUrl(), this.getOptions());
  };
}

export { JSONAPI_MEDIA_TYPE, OWS_MEDIA_TYPE, defaultConfig };
export default ApiRequest;
