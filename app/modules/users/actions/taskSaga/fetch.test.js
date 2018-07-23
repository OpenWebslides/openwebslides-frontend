// @flow

import * as a from '../../actionTypes';

import actions from '..';

describe(`fetch`, (): void => {

  it(`returns a FETCH action containing the passed arguments`, (): void => {
    const dummyUserId = 'dummyUserId';
    const expectedAction: a.FetchAction = {
      type: a.FETCH,
      payload: {
        id: dummyUserId,
      },
    };
    const actualAction = actions.fetch(dummyUserId);

    expect(actualAction).toEqual(expectedAction);
  });

});
