// @flow

import * as a from '../../actionTypes';

import actions from '.';

describe(`setRefreshingInState`, (): void => {

  it(`returns a SET_REFRESHING_IN_STATE action, when parameters are valid`, (): void => {
    const expectedAction: a.SetRefreshingInStateAction = {
      type: a.SET_REFRESHING_IN_STATE,
      payload: {
        refreshing: true,
      },
    };
    const actualAction = actions.setRefreshingInState(true);

    expect(actualAction).toStrictEqual(expectedAction);
  });

});
