// @flow

import * as m from '../model';

import selectors from '.';

describe(`getRequestStatusById`, (): void => {

  it(`returns the requestStatus for the passed requestId, when the passed requestId exists in the state`, (): void => {
    const dummyRequestStatus: m.RequestStatus = {
      status: m.statusTypes.PENDING,
    };
    const dummyState: any = { modules: { apiRequestsStatus: {
      existingId: dummyRequestStatus,
    } } };
    expect(selectors.getRequestStatusById(dummyState, { requestId: 'existingId' })).toBe(dummyRequestStatus);
  });

  it(`returns NULL, when the passed requestId does not exist in the state`, (): void => {
    const dummyRequestStatus: m.RequestStatus = {
      status: m.statusTypes.PENDING,
    };
    const dummyState: any = { modules: { apiRequestsStatus: {
      existingId: dummyRequestStatus,
    } } };
    expect(selectors.getRequestStatusById(dummyState, { requestId: 'invalidId' })).toBeNull();
  });

});
