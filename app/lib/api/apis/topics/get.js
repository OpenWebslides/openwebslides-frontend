// @flow
/**
 * API docs: #TODO
 */

import type { Identifier } from 'types/model';

import * as m from '../../model';
import ApiRequest from '../../ApiRequest';
import { TOPICS_ENDPOINT } from '../endpoints';

const get = async (id: Identifier): Promise<m.ApiResponseData> => {
  const request = new ApiRequest();

  request
    .setEndpoint(TOPICS_ENDPOINT)
    .setMethod(m.methodTypes.GET)
    .setResource(id)
    .setParameter('include', 'user');

  return request.execute();
};

export default get;
