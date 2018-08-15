// @flow

import * as a from '../../actionTypes';

import actions from '..';

describe(`toggleContentFetched`, (): void => {

  let dummyId: string;

  beforeEach((): void => {
    dummyId = 'dummyId';
  });

  it(`returns a topics TOGGLE_CONTENT_FETCHED action containing the passed arguments`, (): void => {
    const expectedAction: a.ToggleContentFetchedAction = {
      type: a.TOGGLE_CONTENT_FETCHED,
      payload: {
        id: dummyId,
      },
    };
    const actualAction = actions.toggleContentFetched(dummyId);

    expect(actualAction).toEqual(expectedAction);
  });

});
