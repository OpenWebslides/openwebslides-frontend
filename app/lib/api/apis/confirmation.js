// @flow

import { methodTypes } from '../model';
import type { Response } from '../model';
import ApiRequest from '../ApiRequest';

import { CONFIRMATION_ENDPOINT } from './constants';

const post = (
  email: string,
): Promise<Response> => {
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
    .setMethod(methodTypes.POST)
    .setBody(body);

  return request.execute();
};

const ConfirmationApi = {
  post,
};

export default ConfirmationApi;
