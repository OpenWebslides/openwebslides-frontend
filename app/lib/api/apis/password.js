// @flow

import { methodTypes } from '../model';
import type { Response } from '../model';
import ApiRequest from '../ApiRequest';

import { PASSWORD_ENDPOINT } from './constants';

const post = (
  email: string,
): Promise<Response> => {
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
    .setMethod(methodTypes.POST)
    .setBody(body);

  return request.execute();
};

const PasswordApi = {
  post,
};

export default PasswordApi;
