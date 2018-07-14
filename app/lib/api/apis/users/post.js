// @flow
/**
 * API docs: https://openwebslides.github.io/documentation/#users-api
 */

import * as m from '../../model';
import ApiRequest from '../../ApiRequest';
import { USERS_ENDPOINT } from '../endpoints';

const post = (
  email: string,
  firstName: string,
  lastName: ?string,
  password: string,
  tosAccepted: boolean,
): Promise<m.ApiResponseData> => {
  const request = new ApiRequest();

  const body = JSON.stringify({
    data: {
      type: 'users',
      attributes: {
        email,
        firstName,
        lastName,
        password,
        tosAccepted,
      },
    },
  });

  request
    .setEndpoint(USERS_ENDPOINT)
    .setMethod(m.httpMethods.POST)
    .setBody(body);

  return request.execute();
};

export default post;
