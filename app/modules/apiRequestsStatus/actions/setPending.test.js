// @flow

import * as t from '../actionTypes';

import actions from '.';

describe(`setPending`, (): void => {

  it(`returns a SET_PENDING action`, (): void => {
    const dummyRequestId = 'foobar';
    const expectedAction: t.SetPendingAction = {
      type: t.SET_PENDING,
      payload: {
        requestId: dummyRequestId,
      },
    };
    const actualAction = actions.setPending(dummyRequestId);

    expect(actualAction).toEqual(expectedAction);
  });

});
