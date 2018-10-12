// @flow

import * as a from '../../actionTypes';

import actions from '..';

describe(`toggleContentFetchedInState`, (): void => {

  let dummyId: string;

  beforeEach((): void => {
    dummyId = 'dummyId';
  });

  it(`returns a topics TOGGLE_CONTENT_FETCHED_IN_STATE action containing the passed arguments`, (): void => {
    const expectedAction: a.ToggleContentFetchedInStateAction = {
      type: a.TOGGLE_CONTENT_FETCHED_IN_STATE,
      payload: {
        id: dummyId,
      },
    };
    const actualAction = actions.toggleContentFetchedInState(dummyId);

    expect(actualAction).toStrictEqual(expectedAction);
  });

});
