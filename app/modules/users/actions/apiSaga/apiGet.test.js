// @flow

import * as a from '../../actionTypes';

import actions from '..';

describe(`apiGet`, (): void => {

  it(`returns an API_GET action containing the passed arguments`, (): void => {
    const dummyUserId = 'dummyUserId';
    const expectedAction: a.ApiGetAction = {
      type: a.API_GET,
      payload: {
        id: dummyUserId,
      },
    };
    const actualAction = actions.apiGet(dummyUserId);

    expect(actualAction).toStrictEqual(expectedAction);
  });

});
