// @flow

/**
 * POST on users endpoint, create a new user
 *
 * API docs: https://openwebslides.github.io/documentation/#users-api
 */

import ApiRequest, { httpMethods, type ApiResponseData } from 'lib/ApiRequest';

import { USERS_ENDPOINT } from '../endpoints';

const post = (
  email: string,
  name: string,
  password: string,
  tosAccepted: boolean,
  age: ?number,
  gender: ?string,
  role: ?string,
  country: ?string,
): Promise<ApiResponseData> => {
  const body = JSON.stringify({
    data: {
      type: 'users',
      attributes: {
        email,
        name,
        password,
        tosAccepted,
        age,
        gender,
        role,
        country,
      },
    },
  });

  return new ApiRequest(httpMethods.POST)
    .addPathSegment(USERS_ENDPOINT)
    .setBody(body)
    .execute();
};

export default post;
