// @flow
/**
 * API docs: #TODO
 */

import ApiRequest, { httpMethods, type ApiResponseData } from 'lib/ApiRequest';

import { CONFIRMATION_ENDPOINT } from '../endpoints';

const post = (
  email: string,
): Promise<ApiResponseData> => {
  const request = new ApiRequest();

  const body = JSON.stringify({
    data: {
      type: 'confirmations',
      attributes: {
        email,
      },
    },
  });

  request
    .setEndpoint(CONFIRMATION_ENDPOINT)
    .setMethod(httpMethods.POST)
    .setBody(body);

  return request.execute();
};

export default post;
