// @flow

import { DEFAULT_URL, METHODS } from './constants';

import asyncFetch from './asyncFetch';

const ApiRequest = () => {
  const that = {};

  /**
   * Properties
   *
   * */

  // Request URL (base)
  that.url = DEFAULT_URL;

  // Request endpoint
  that.endpoint = null;

  // Request headers
  that.headers = {
    'Content-Type': 'application/vnd.api+json',
    'Accept': 'application/vnd.api+json',
    'Authorization': null,
  };

  // Request parameters
  that.parameters = {};

  // Request HTTP method
  that.method = METHODS.GET;

  // Request body
  that.body = {};

  /**
   * Methods
   *
   * */

  that.setEndpoint = (endpoint) => {
    that.endpoint = endpoint;

    return that;
  };

  that.setMethod = (method) => {
    that.method = method;

    return that;
  };

  that.addParameter = (parameter, value) => {
    that.parameters[parameter] = value;

    return that;
  };

  // Execute HTTP request
  that.execute = async () => {
    let url = that.url + that.endpoint;

    if (that.parameters) {
      const query = Object.keys(that.parameters).map((k) => {
        return encodeURIComponent(k) + '=' + encodeURIComponent(that.parameters[k])
      }).join('&');

      url += `?${query}`;
    }

    const config = {
      headers: that.headers,
      method: that.method,
      body: that.body,
    };

    return asyncFetch(url, config);
  };

  return that;
};

export default ApiRequest;
