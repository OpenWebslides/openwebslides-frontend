// @flow

/**
 * API docs: #TODO
 */

import ApiRequest, { httpMethods, type ApiResponseData } from 'lib/ApiRequest';

import { PASSWORD_ENDPOINT } from '../endpoints';

const postEmail = (email: string): Promise<ApiResponseData> => {
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

export default postEmail;
