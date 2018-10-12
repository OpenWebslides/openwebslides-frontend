// @flow

import * as a from '../../actionTypes';

import actions from '.';

describe(`signout`, (): void => {

  it(`returns a platform SIGNOUT action`, (): void => {
    const expectedAction: a.SignoutAction = {
      type: a.SIGNOUT,
      payload: {},
    };
    const actualAction = actions.signout();
    expect(actualAction).toStrictEqual(expectedAction);
  });

});
