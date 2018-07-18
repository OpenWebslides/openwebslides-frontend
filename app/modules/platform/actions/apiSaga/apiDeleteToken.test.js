// @flow

import * as t from '../../actionTypes';

import actions from '..';

describe(`apiDeleteToken`, (): void => {

  it(`returns an API_DELETE_TOKEN action`, (): void => {
    const dummyToken = 'foobarToken';
    const expectedAction: t.ApiDeleteTokenAction = {
      type: t.API_DELETE_TOKEN,
      payload: {
        token: dummyToken,
      },
    };
    const actualAction = actions.apiDeleteToken(dummyToken);

    expect(actualAction).toEqual(expectedAction);
  });

});
