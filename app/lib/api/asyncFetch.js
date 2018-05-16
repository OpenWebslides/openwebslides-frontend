// @flow

import UnauthorizedError from 'errors/api-errors/UnauthorizedError';
import ForbiddenError from 'errors/api-errors/ForbiddenError';
import ValidationError from 'errors/api-errors/ValidationError';
import ServerError from 'errors/api-errors/ServerError';
import ApiError from 'errors/ApiError';

import type { Response } from './model';

const asyncFetch = async (url: string, options: RequestOptions): Promise<Response> => {
  const response = await fetch(url, options);
  const { status } = response;

  switch (true) {
    case (status < 400): {
      const authHeader = response.headers.get('Authorization');

      // eslint-disable-next-line flowtype/no-weak-types
      return response.json().then((data: Object): Object => {
        return {
          token: (authHeader ? authHeader.slice(7) : null),
          body: data,
        };
      }).catch((error) => error);
    }
    case (status === 401):
      throw new UnauthorizedError();
    case (status === 403):
      throw new ForbiddenError();
    case (status === 422): {
      const responseBody = await response.json();
      throw new ValidationError(responseBody.errors);
    }
    case (status > 500):
      throw new ServerError(response.statusText);
    default:
      throw new ApiError(response.statusText);
  }
};

export default asyncFetch;
