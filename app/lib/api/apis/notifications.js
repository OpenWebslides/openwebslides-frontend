// @flow

import { methodTypes } from '../model';
import type { Response } from '../model';
import ApiRequest from '../ApiRequest';

import { NOTIFICATIONS_ENDPOINT } from './constants';

const getAll = async (): Promise<Response> => {
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
  getAll,
};

export default NotificationsApi;
