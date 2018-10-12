// @flow

import { dummyAsyncRequestData as dummyData } from 'lib/testResources';

import * as m from '../model';

import selectors from '.';

describe(`getAllById`, (): void => {

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

  it(`returns an object mapping all asyncRequest ids to their asyncRequests, when there are one or more asyncRequests in the state`, (): void => {
    const asyncRequestsById = selectors.getAllById(dummyState);
    expect(asyncRequestsById).toBe(dummyAsyncRequestsById);
  });

  it(`returns an empty object, when there are no asyncRequests in the state`, (): void => {
    const asyncRequestsById = selectors.getAllById(dummyEmptyState);
    expect(asyncRequestsById).toStrictEqual({});
  });

});
