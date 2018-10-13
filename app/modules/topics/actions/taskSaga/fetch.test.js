// @flow

import * as a from '../../actionTypes';

import actions from '..';

describe(`fetch`, (): void => {

  let dummyId: string;

  beforeEach((): void => {
    dummyId = 'dummyId';
  });

  it(`returns a topics FETCH action containing the passed arguments`, (): void => {
    const expectedAction: a.FetchAction = {
      type: a.FETCH,
      payload: {
        id: dummyId,
      },
    };
    const actualAction = actions.fetch(dummyId);

    expect(actualAction).toStrictEqual(expectedAction);
  });

});
