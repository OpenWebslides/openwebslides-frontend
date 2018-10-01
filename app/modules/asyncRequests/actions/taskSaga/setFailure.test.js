// @flow

import * as a from '../../actionTypes';

import actions from '.';

describe(`setFailure`, (): void => {

  it(`returns a SET_FAILURE action`, (): void => {
    const dummyId = 'foobar';
    const dummyError = new Error('dummyMessage');
    const expectedAction: a.SetFailureAction = {
      type: a.SET_FAILURE,
      payload: {
        id: dummyId,
        error: dummyError,
      },
    };
    const actualAction = actions.setFailure(dummyId, dummyError);

    expect(actualAction).toEqual(expectedAction);
  });

});
