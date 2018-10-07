// @flow

import * as a from '../../actionTypes';

import actions from '..';

describe(`fork`, (): void => {

  let dummyId: string;

  beforeEach((): void => {
    dummyId = 'dummyId';
  });

  it(`returns a topics FORK action containing the passed arguments`, (): void => {
    const expectedAction: a.ForkAction = {
      type: a.FORK,
      payload: {
        id: dummyId,
      },
    };
    const actualAction = actions.fork(dummyId);

    expect(actualAction).toEqual(expectedAction);
  });

});
