// @flow

import * as a from '../../actionTypes';

import actions from '.';

describe(`refresh`, (): void => {

  it(`returns a platform REFRESH action containing the passed props`, (): void => {
    const dummyEmail = 'dummyEmail';
    const expectedAction: a.RefreshAction = {
      type: a.REFRESH,
      payload: {
        email: dummyEmail,
      },
    };
    const actualAction = actions.refresh(dummyEmail);
    expect(actualAction).toStrictEqual(expectedAction);
  });

});
