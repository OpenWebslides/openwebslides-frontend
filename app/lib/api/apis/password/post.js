// @flow
/**
 * API docs: #TODO
 */

import * as m from '../../model';
import ApiRequest from '../../ApiRequest';
import { PASSWORD_ENDPOINT } from '../endpoints';

const post = (
  email: string,
): Promise<m.ApiResponseData> => {
  const request = new ApiRequest();

  const body = JSON.stringify({
    data: {
      type: 'passwords',
      attributes: {
        email,
      },
    },
  });

  request
    .setEndpoint(PASSWORD_ENDPOINT)
    .setMethod(m.httpMethods.POST)
    .setBody(body);

  return request.execute();
};

export default post;
