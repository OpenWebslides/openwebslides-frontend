// @flow

import * as t from '../../actionTypes';

import actions from '.';

describe(`signout`, (): void => {

  it(`returns a platform SIGNOUT action`, (): void => {
    const expectedAction: t.SignoutAction = { type: t.SIGNOUT };
    const actualAction = actions.signout();
    expect(actualAction).toEqual(expectedAction);
  });

});
