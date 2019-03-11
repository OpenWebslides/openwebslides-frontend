// @flow

import * as a from '../../actionTypes';

import actions from '..';

describe(`apiDeleteToken`, (): void => {

  it(`returns an API_DELETE_TOKEN action`, (): void => {
    const dummyRefreshToken = 'dummyRefreshToken';
    const expectedAction: a.ApiDeleteTokenAction = {
      type: a.API_DELETE_TOKEN,
      payload: {
        refreshToken: dummyRefreshToken,
      },
    };
    const actualAction = actions.apiDeleteToken(dummyRefreshToken);

    expect(actualAction).toStrictEqual(expectedAction);
  });

});
