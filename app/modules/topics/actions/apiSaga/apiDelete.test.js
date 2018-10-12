// @flow

import * as a from '../../actionTypes';

import actions from '..';

describe(`apiDelete`, (): void => {

  let dummyId: string;

  beforeEach((): void => {
    dummyId = 'dummyId';
  });

  it(`returns a topics API_DELETE action containing the passed arguments`, (): void => {
    const expectedAction: a.ApiDeleteAction = {
      type: a.API_DELETE,
      payload: {
        id: dummyId,
      },
    };
    const actualAction = actions.apiDelete(dummyId);

    expect(actualAction).toStrictEqual(expectedAction);
  });

});

