// @flow

/**
 * PATCH confirmationToken on confirmation endpoint, confirms an account
 *
 * API documentation: https://openwebslides.github.io/documentation/#confirm-account
 */

import ApiRequest, { httpMethods, type ApiResponseData } from 'lib/ApiConnection';

import { CONFIRMATION_ENDPOINT } from '../endpoints';

const patch = (confirmationToken: string): Promise<ApiResponseData> => {
  const body = JSON.stringify({
    data: {
      type: 'confirmations',
      attributes: {
        confirmationToken,
      },
    },
  });

  return new ApiRequest(httpMethods.PATCH)
    .addPathSegment(CONFIRMATION_ENDPOINT)
    .setBody(body)
    .execute();
};

export default patch;
