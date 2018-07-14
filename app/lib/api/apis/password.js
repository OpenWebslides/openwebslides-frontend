// @flow

import * as m from '../model';
import ApiRequest from '../ApiRequest';

import { PASSWORD_ENDPOINT } from './constants';

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
    .setMethod(m.methodTypes.POST)
    .setBody(body);

  return request.execute();
};

const PasswordApi = {
  post,
};

export default PasswordApi;
