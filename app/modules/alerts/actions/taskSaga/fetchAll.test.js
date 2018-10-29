// @flow

import * as a from '../../actionTypes';

import actions from '..';

describe(`fetchAll`, (): void => {

  let dummyUserId: string;

  beforeEach((): void => {
    dummyUserId = 'dummyUserId';
  });

  it(`returns a feedItems FETCH_ALL action containing the passed arguments`, (): void => {
    const expectedAction: a.FetchAllAction = {
      type: a.FETCH_ALL,
      payload: {
        userId: dummyUserId,
      },
    };
    const actualAction = actions.fetchAll(dummyUserId);

    expect(actualAction).toStrictEqual(expectedAction);
  });

});
