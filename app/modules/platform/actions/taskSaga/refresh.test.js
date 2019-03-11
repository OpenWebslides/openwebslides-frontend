// @flow

import * as a from '../../actionTypes';

import actions from '.';

describe(`refresh`, (): void => {

  it(`returns a platform REFRESH action containing the passed props`, (): void => {
    const expectedAction: a.RefreshAction = {
      type: a.REFRESH,
      payload: {},
    };
    const actualAction = actions.refresh();
    expect(actualAction).toStrictEqual(expectedAction);
  });

});
