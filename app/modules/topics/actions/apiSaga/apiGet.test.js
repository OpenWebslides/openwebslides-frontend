// @flow

import * as a from '../../actionTypes';

import actions from '..';

describe(`apiGet`, (): void => {

  let dummyId: string;

  beforeEach((): void => {
    dummyId = 'dummyId';
  });

  it(`returns a topics API_GET action containing the passed arguments`, (): void => {
    const expectedAction: a.ApiGetAction = {
      type: a.API_GET,
      payload: {
        id: dummyId,
      },
    };
    const actualAction = actions.apiGet(dummyId);

    expect(actualAction).toEqual(expectedAction);
  });

});

