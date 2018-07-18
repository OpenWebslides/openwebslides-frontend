// @flow

import * as t from '../../actionTypes';

import actions from '..';

describe(`apiPostPassword`, (): void => {

  it(`returns an API_POST_PASSWORD action containing the passed arguments`, (): void => {
    const dummyEmail = 'test@test.be';
    const expectedAction: t.ApiPostPasswordAction = {
      type: t.API_POST_PASSWORD,
      payload: {
        email: dummyEmail,
      },
    };
    const actualAction = actions.apiPostPassword(dummyEmail);

    expect(actualAction).toEqual(expectedAction);
  });

});
