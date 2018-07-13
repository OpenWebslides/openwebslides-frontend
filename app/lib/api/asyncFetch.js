// @flow

import {
  Http401UnauthorizedError,
  Http403ForbiddenError,
  Http422ValidationError,
  Http5xxServerError,
  UnexpectedHttpStatusError,
} from 'errors';

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
      throw new Http401UnauthorizedError();
    case (status === 403):
      throw new Http403ForbiddenError();
    case (status === 422): {
      const responseBody = await response.json();
      throw new Http422ValidationError(responseBody.errors);
    }
    case (status > 500):
      throw new Http5xxServerError(response.statusText);
    default:
      throw new UnexpectedHttpStatusError(response.statusText);
  }
};

export default asyncFetch;
