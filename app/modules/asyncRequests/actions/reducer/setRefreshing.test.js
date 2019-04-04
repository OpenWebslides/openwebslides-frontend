// @flow

import * as a from '../../actionTypes';

import actions from '.';

describe(`setRefreshing`, (): void => {

  it(`returns a SET_REFRESHING action, when parameters are valid`, (): void => {
    const expectedAction: a.SetRefreshingAction = {
      type: a.SET_REFRESHING,
      payload: {
        refreshing: true,
      },
    };
    const actualAction = actions.setRefreshing(true);

    expect(actualAction).toStrictEqual(expectedAction);
  });

});
