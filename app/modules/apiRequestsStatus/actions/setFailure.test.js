// @flow

import * as a from '../actionTypes';

import actions from '.';

describe(`setFailure`, (): void => {

  it(`returns a SET_FAILURE action`, (): void => {
    const dummyRequestId = 'foobar';
    const dummyError = new Error('dummyMessage');
    const expectedAction: a.SetFailureAction = {
      type: a.SET_FAILURE,
      payload: {
        requestId: dummyRequestId,
        error: dummyError,
      },
    };
    const actualAction = actions.setFailure(dummyRequestId, dummyError);

    expect(actualAction).toEqual(expectedAction);
  });

});
