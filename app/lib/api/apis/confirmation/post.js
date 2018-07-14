// @flow
/**
 * API docs: #TODO
 */

import * as m from '../../model';
import ApiRequest from '../../ApiRequest';
import { CONFIRMATION_ENDPOINT } from '../endpoints';

const post = (
  email: string,
): Promise<m.ApiResponseData> => {
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
    .setMethod(m.httpMethods.POST)
    .setBody(body);

  return request.execute();
};

export default post;
