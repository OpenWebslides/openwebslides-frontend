// @flow

import * as a from '../../actionTypes';

import actions from '..';

describe(`fetchAll`, (): void => {

  it(`returns an alerts FETCH_ALL action containing the passed arguments`, (): void => {
    const expectedAction: a.FetchAllAction = {
      type: a.FETCH_ALL,
      payload: {},
    };
    const actualAction = actions.fetchAll();

    expect(actualAction).toStrictEqual(expectedAction);
  });

});
