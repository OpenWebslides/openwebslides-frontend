// @flow

import * as a from '../actionTypes';

import actions from '.';

describe(`removeAndTogglePreviousItem`, (): void => {

  let dummyId: string;

  beforeEach((): void => {
    dummyId = 'abcdefghijklmnopqrst';
  });

  it(`returns a contentItem REMOVE_AND_TOGGLE_PREVIOUS_ITEM action containing the passed props`, (): void => {
    const expectedAction: a.RemoveAndTogglePreviousItemAction = {
      type: a.REMOVE_AND_TOGGLE_PREVIOUS_ITEM,
      payload: {
        id: dummyId,
      },
    };
    const actualAction = actions.removeAndTogglePreviousItem(dummyId);
    expect(actualAction).toEqual(expectedAction);
  });

});
