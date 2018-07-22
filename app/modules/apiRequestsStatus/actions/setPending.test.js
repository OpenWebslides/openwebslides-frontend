// @flow

import * as a from '../actionTypes';

import actions from '.';

describe(`setPending`, (): void => {

  it(`returns a SET_PENDING action`, (): void => {
    const dummyRequestId = 'foobar';
    const expectedAction: a.SetPendingAction = {
      type: a.SET_PENDING,
      payload: {
        requestId: dummyRequestId,
      },
    };
    const actualAction = actions.setPending(dummyRequestId);

    expect(actualAction).toEqual(expectedAction);
  });

});
