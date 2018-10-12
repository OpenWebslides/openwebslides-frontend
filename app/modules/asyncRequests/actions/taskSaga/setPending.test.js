// @flow

import * as a from '../../actionTypes';

import actions from '.';

describe(`setPending`, (): void => {

  it(`returns a SET_PENDING action`, (): void => {
    const dummyId = 'foobar';
    const expectedAction: a.SetPendingAction = {
      type: a.SET_PENDING,
      payload: {
        id: dummyId,
      },
    };
    const actualAction = actions.setPending(dummyId);

    expect(actualAction).toStrictEqual(expectedAction);
  });

});
