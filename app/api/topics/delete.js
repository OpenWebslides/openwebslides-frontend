// @flow
/**
 * API docs: #TODO
 */

import type { Identifier } from 'types/model';
import ApiRequest, { httpMethods, type ApiResponseData, type ApiToken } from 'lib/ApiRequest';

import { TOPICS_ENDPOINT } from '../endpoints';

const deleteFunction = (id: Identifier, token: ApiToken): Promise<ApiResponseData> => {
  return new ApiRequest(httpMethods.DELETE)
    .addPathSegment(TOPICS_ENDPOINT)
    .addPathSegment(id)
    .setToken(token)
    .execute();
};

export default deleteFunction;
