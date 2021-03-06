// @flow

/**
 * POST email on confirmation endpoint, requests resending a confirmation email
 *
 * API documentation: https://openwebslides.github.io/documentation/#request-resend-confirmation-instructions
 */

import ApiRequest, { httpMethods, type ApiResponseData } from 'lib/ApiConnection';

import { CONFIRMATION_ENDPOINT } from '../endpoints';

const post = (email: string): Promise<ApiResponseData> => {
  const body = JSON.stringify({
    data: {
      type: 'confirmations',
      attributes: {
        email,
      },
    },
  });

  return new ApiRequest(httpMethods.POST)
    .addPathSegment(CONFIRMATION_ENDPOINT)
    .setBody(body)
    .execute();
};

export default post;
