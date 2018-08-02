// @flow

/**
 * POST email on password endpoint, requests sending a password reset email
 *
 * API documentation: https://openwebslides.github.io/documentation/#request-password-reset
 */

import ApiRequest, { httpMethods, type ApiResponseData } from 'lib/ApiRequest';

import { PASSWORD_ENDPOINT } from '../endpoints';

const post = (email: string): Promise<ApiResponseData> => {
  const body = JSON.stringify({
    data: {
      type: 'passwords',
      attributes: {
        email,
      },
    },
  });

  return new ApiRequest(httpMethods.POST)
    .addPathSegment(PASSWORD_ENDPOINT)
    .setBody(body)
    .execute();
};

export default post;
