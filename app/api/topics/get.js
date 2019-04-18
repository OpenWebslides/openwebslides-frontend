// @flow

/**
 * GET on topics endpoint, retrieves a topic
 *
 * API docs: https://openwebslides.github.io/documentation/#get-a-topic
 */

import ApiRequest, { httpMethods, type ApiResponseData } from 'lib/ApiConnection';

import { TOPICS_ENDPOINT } from '../endpoints';

const get = (id: string, accessToken: ?string): Promise<ApiResponseData> => {
  return new ApiRequest(httpMethods.GET)
    .addPathSegment(TOPICS_ENDPOINT)
    .addPathSegment(id)
    .setParameter('include', 'user,upstream,forks,incomingPullRequests,outgoingPullRequests,collaborators')
    .setToken(accessToken)
    .execute();
};

export default get;
