// @flow

import { ClientApiError, ServerApiError, ValidationError } from './errors';

const asyncFetch = async (url, config) => {
  const response = await fetch(url, config);
  const { statusText, status } = response;
  let responseBody;

  switch (status) {
    case 400:
    case 401:
    case 403:
      throw new ClientApiError(statusText, status);
    case 422:
      responseBody = await response.json();
      throw new ValidationError(statusText, status, responseBody.errors);
    case 500:
    case 501:
    case 502:
    case 503:
    case 504:
    case 505:
      throw new ServerApiError(statusText, status);
    default:
      return response;
  }
};

export default asyncFetch;
