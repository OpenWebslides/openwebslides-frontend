// @flow

import * as a from '../../actionTypes';

import actions from '..';

describe(`apiPostFork`, (): void => {

  let dummyId: string;

  beforeEach((): void => {
    dummyId = 'dummyId';
  });

  it(`returns a topics API_PostFork action containing the passed arguments`, (): void => {
    const expectedAction: a.ApiPostForkAction = {
      type: a.API_POST_FORK,
      payload: {
        id: dummyId,
      },
    };
    const actualAction = actions.apiPostFork(dummyId);

    expect(actualAction).toEqual(expectedAction);
  });

});

