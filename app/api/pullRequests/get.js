// @flow

/**
 * GET on pull requests endpoint, retrieves a pull request
 *
 * API docs: https://openwebslides.github.io/documentation/#get-a-pull-request
 */

import ApiRequest, { httpMethods, type ApiResponseData } from 'lib/ApiConnection';

import { PULL_REQUESTS_ENDPOINT } from '../endpoints';

const get = (id: string, accessToken: string): Promise<ApiResponseData> => {
  return new ApiRequest(httpMethods.GET)
    .addPathSegment(PULL_REQUESTS_ENDPOINT)
    .addPathSegment(id)
    .setParameter('include', 'user,source,target')
    .setToken(accessToken)
    .execute();
};

export default get;
