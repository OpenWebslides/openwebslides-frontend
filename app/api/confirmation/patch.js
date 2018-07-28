// @flow

/**
 * PATCH confirmationToken on confirmation endpoint, confirms an account
 */

import ApiRequest, { httpMethods, type ApiResponseData } from 'lib/ApiRequest';

import { CONFIRMATION_ENDPOINT } from '../endpoints';

const patch = (confirmationToken: string): Promise<ApiResponseData> => {
  const body = JSON.stringify({
    data: {
      id: '',
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
