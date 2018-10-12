// @flow

import { dummyAsyncRequestData as dummyData } from 'lib/testResources';

import * as m from '../model';

import selectors from '.';

describe(`getAll`, (): void => {

  let dummyAsyncRequest1: m.AsyncRequest;
  let dummyAsyncRequest2: m.AsyncRequest;
  let dummyAsyncRequestsById: m.AsyncRequestsById;
  let dummyAsyncRequestsState: m.AsyncRequestsState;
  let dummyState: any;
  let dummyEmptyState: any;

  beforeEach((): void => {
    dummyAsyncRequest1 = { ...dummyData.pendingAsyncRequest };
    dummyAsyncRequest2 = { ...dummyData.successAsyncRequest };
    dummyAsyncRequestsById = {
      [dummyAsyncRequest1.id]: dummyAsyncRequest1,
      [dummyAsyncRequest2.id]: dummyAsyncRequest2,
    };
    dummyAsyncRequestsState = { byId: dummyAsyncRequestsById };
    dummyState = { modules: { asyncRequests: dummyAsyncRequestsState } };
    dummyEmptyState = { modules: { asyncRequests: { byId: {} } } };
  });

  it(`returns an array containing all asyncRequests, when there are one or more asyncRequests in the state`, (): void => {
    const asyncRequests = selectors.getAll(dummyState);
    expect(asyncRequests).toStrictEqual([dummyAsyncRequest1, dummyAsyncRequest2]);
  });

  it(`returns an empty array, when there are no asyncRequests in the state`, (): void => {
    const asyncRequests = selectors.getAll(dummyEmptyState);
    expect(asyncRequests).toStrictEqual([]);
  });

});
