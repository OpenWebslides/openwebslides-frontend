// @flow

import { NOTIFICATIONS_ENDPOINT } from './constants';

import { methodTypes } from '../model';
import type { Response } from '../model';

import ApiRequest from '../ApiRequest';

const fetch = async (): Promise<Response> => {
  const request = new ApiRequest();

  request
    .setEndpoint(NOTIFICATIONS_ENDPOINT)
    .setMethod(methodTypes.GET)
    .setParameter('sort', '-createdAt')
    .setParameter('page[limit]', '10')
    .setParameter('page[offset]', '0')
    .setParameter('include', 'user');

  return request.execute();
};

const NotificationsApi = {
  fetch,
};

export default NotificationsApi;
