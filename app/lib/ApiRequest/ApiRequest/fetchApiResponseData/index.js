// @flow

import {
  Http401UnauthorizedError,
  Http403ForbiddenError,
  Http422ValidationError,
  Http5xxServerError,
  NetworkError,
  UnexpectedHttpStatusError,
} from 'errors';

import { type ApiResponseData } from '../../types';

const extractTokenFromAuthHeader = (authHeader: ?string): ?string => {
  return (authHeader != null) ? authHeader.slice(7) : null;
};

const getDataFromResponse = async (response: Response): Promise<ApiResponseData> => {
  const responseText = await response.text();
  const responseBody = (responseText)
    ? JSON.parse(responseText)
    : null;

  return {
    body: responseBody,
    status: response.status,
    token: extractTokenFromAuthHeader(response.headers.get('Authorization')),
  };
};

const fetchApiResponseData = async (
  url: string,
  options: RequestOptions,
): Promise<ApiResponseData> => {
  let response: Response;

  try {
    response = await fetch(url, options);
  }
  catch (error) {
    throw new NetworkError(error.message);
  }

  const { status } = response;

  if (response.ok) {
    return getDataFromResponse(response);
  }
  else if (status === 401) {
    throw new Http401UnauthorizedError();
  }
  else if (status === 403) {
    throw new Http403ForbiddenError();
  }
  else if (status === 422) {
    const responseBody = await response.json();
    throw new Http422ValidationError(responseBody.errors);
  }
  else if (status >= 500) {
    throw new Http5xxServerError(response.statusText);
  }
  else {
    throw new UnexpectedHttpStatusError(response.statusText);
  }
};

export default fetchApiResponseData;
