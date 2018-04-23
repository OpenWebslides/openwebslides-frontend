// @flow

import {
  UnauthorizedApiError,
  ForbiddenApiError,
  ClientApiError,
  ServerApiError,
} from './errors';

const asyncFetch = async (url: string, options: RequestOptions): Promise<string> => {
  const response = await fetch(url, options);
  const { status } = response;

  switch (true) {
    case (status < 400): {
      return response.json();
    }
    case (status === 401):
      throw new UnauthorizedApiError();
    case (status === 403):
      throw new ForbiddenApiError();
    case (status === 422): {
      const responseBody = await response.json();
      throw new ClientApiError(responseBody.errors);
    }
    case (status > 500):
      throw new ServerApiError(response.statusText);
    default:
      throw new ClientApiError(response.statusText);
  }
};

export default asyncFetch;
