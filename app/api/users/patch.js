// @flow

/**
 * PATCH on users endpoint, updates a user
 *
 * API documentation: https://openwebslides.github.io/documentation/#update-a-user
 */

import ApiRequest, { httpMethods, type ApiResponseData } from 'lib/ApiConnection';

import { USERS_ENDPOINT } from '../endpoints';

const patch = (
  id: string,
  name: ?string,
  locale: ?string,
  alertEmails: ?boolean,
  currentPassword: ?string,
  password: ?string,
  accessToken: string,
): Promise<ApiResponseData> => {
  const body = JSON.stringify({
    data: {
      type: 'users',
      id,
      attributes: {
        name,
        locale,
        alertEmails,
        currentPassword,
        password,
      },
    },
  });

  return new ApiRequest(httpMethods.PATCH)
    .addPathSegment(USERS_ENDPOINT)
    .addPathSegment(id)
    .setBody(body)
    .setToken(accessToken)
    .execute();
};

export default patch;
