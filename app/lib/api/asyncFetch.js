// @flow

import {
  UnauthorizedApiError,
  ForbiddenApiError,
  ClientApiError,
  ServerApiError,
} from './errors';

import type { Response } from './model';

const asyncFetch = async (url: string, options: RequestOptions): Promise<Response> => {
  const response = await fetch(url, options);
  const { status } = response;

  switch (true) {
    case (status < 400): {
      const responseBody = response.json();

      const authHeader = response.headers.get('Authorization');
      const apiResponse: Response = {
        body: responseBody,
        status,
        token: authHeader ? authHeader.slice(7) : null,
      };

      return apiResponse;
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
