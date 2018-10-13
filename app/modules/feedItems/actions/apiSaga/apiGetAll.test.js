// @flow

import * as a from '../../actionTypes';

import actions from '..';

describe(`apiGetAll`, (): void => {

  it(`returns a feedItems API_GET_ALL action containing the passed arguments`, (): void => {
    const expectedAction: a.ApiGetAllAction = {
      type: a.API_GET_ALL,
      payload: {},
    };
    const actualAction = actions.apiGetAll();

    expect(actualAction).toStrictEqual(expectedAction);
  });

});
