// @flow

/**
 * GET on pull requests endpoint, retrieves a pull request
 *
 * API docs: https://openwebslides.github.io/documentation/#get-a-pull-request
 */

import ApiRequest, { httpMethods, type ApiResponseData } from 'lib/ApiRequest';

import { PULL_REQUESTS_ENDPOINT } from '../endpoints';

const get = (id: string): Promise<ApiResponseData> => {
  return new ApiRequest(httpMethods.GET)
    .addPathSegment(PULL_REQUESTS_ENDPOINT)
    .addPathSegment(id)
    .execute();
};

export default get;