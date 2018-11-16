// @flow

/**
 * PATCH read on alerts endpoint, marks as read
 *
 * API documentation: https://openwebslides.github.io/documentation/#mark-alert-as-read
 */

import ApiRequest, { httpMethods, type ApiResponseData } from 'lib/ApiRequest';

import { ALERTS_ENDPOINT } from '../endpoints';

const patch = (id: string, read: boolean, token: string): Promise<ApiResponseData> => {
  const body = JSON.stringify({
    data: {
      type: 'alerts',
      id,
      attributes: {
        read,
      },
    },
  });

  return new ApiRequest(httpMethods.PATCH)
    .addPathSegment(ALERTS_ENDPOINT)
    .addPathSegment(id)
    .setBody(body)
    .setToken(token)
    .execute();
};

export default patch;
