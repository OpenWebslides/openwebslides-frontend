// @flow

import * as m from '../model';
import ApiRequest from '../ApiRequest';

import { CONFIRMATION_ENDPOINT } from './constants';

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
    .setMethod(m.methodTypes.POST)
    .setBody(body);

  return request.execute();
};

const ConfirmationApi = {
  post,
};

export default ConfirmationApi;
