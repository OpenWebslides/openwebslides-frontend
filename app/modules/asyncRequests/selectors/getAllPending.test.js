// @flow

import _ from 'lodash';

import { dummyAsyncRequestData as dummyData } from 'lib/testResources';

import * as m from '../model';

import selectors from '.';

describe(`getAllPending`, (): void => {

  let dummyPendingRequest1: m.AsyncRequest;
  let dummyPendingRequest2: m.AsyncRequest;
  let dummySuccessRequest1: m.AsyncRequest;
  let dummyFailureRequest1: m.AsyncRequest;
  let dummyAsyncRequestsById: m.AsyncRequestsById;
  let dummyAsyncRequestsState: m.AsyncRequestsState;
  let dummyState: any;

  beforeEach((): void => {
    dummyPendingRequest1 = { ...dummyData.pendingAsyncRequest };
    dummyPendingRequest2 = { ...dummyData.pendingAsyncRequest2 };
    dummySuccessRequest1 = { ...dummyData.successAsyncRequest };
    dummyFailureRequest1 = { ...dummyData.failureAsyncRequest };
    dummyAsyncRequestsById = {
      [dummyPendingRequest1.id]: dummyPendingRequest1,
      [dummySuccessRequest1.id]: dummySuccessRequest1,
      [dummyPendingRequest2.id]: dummyPendingRequest2,
      [dummyFailureRequest1.id]: dummyFailureRequest1,
    };
    dummyAsyncRequestsState = { byId: dummyAsyncRequestsById, refreshing: false };
    dummyState = { modules: { asyncRequests: dummyAsyncRequestsState } };
  });

  it(`returns an array containing all requests that have the status PENDING, when there are pending requests in the state`, (): void => {
    const asyncRequests = selectors.getAllPending(dummyState);
    expect(asyncRequests).toStrictEqual([dummyPendingRequest1, dummyPendingRequest2]);
  });

  it(`returns an empty array, when there are no pending requests in the state`, (): void => {
    dummyState.modules.asyncRequests.byId = _.omit(dummyAsyncRequestsById, [dummyPendingRequest1.id, dummyPendingRequest2.id]);
    const asyncRequests = selectors.getAllPending(dummyState);
    expect(asyncRequests).toStrictEqual([]);
  });

});
