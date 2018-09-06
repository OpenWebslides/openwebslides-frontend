// @flow

import { dummyAsyncRequestData as dummyData } from 'lib/testResources';

import * as m from '../model';

import selectors from '.';

describe(`getById`, (): void => {

  let dummyAsyncRequest1: m.AsyncRequest;
  let dummyAsyncRequest2: m.AsyncRequest;
  let dummyAsyncRequestsById: m.AsyncRequestsById;
  let dummyAsyncRequestsState: m.AsyncRequestsState;
  let dummyState: any;

  beforeEach((): void => {
    dummyAsyncRequest1 = { ...dummyData.pendingAsyncRequest };
    dummyAsyncRequest2 = { ...dummyData.successAsyncRequest };
    dummyAsyncRequestsById = {
      [dummyAsyncRequest1.id]: dummyAsyncRequest1,
      [dummyAsyncRequest2.id]: dummyAsyncRequest2,
    };
    dummyAsyncRequestsState = { byId: dummyAsyncRequestsById };
    dummyState = { modules: { asyncRequests: dummyAsyncRequestsState } };
  });

  it(`returns the correct asyncRequest for the given id, when the given id is valid`, (): void => {
    const asyncRequest = selectors.getById(dummyState, { id: dummyAsyncRequest1.id });
    expect(asyncRequest).toBe(dummyAsyncRequest1);
  });

  it(`returns NULL, when the given id is invalid`, (): void => {
    const asyncRequest = selectors.getById(dummyState, { id: 'InvalidId' });
    expect(asyncRequest).toBeNull();
  });

});
