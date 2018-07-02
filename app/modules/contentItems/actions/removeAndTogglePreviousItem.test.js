// @flow

import * as t from '../actionTypes';
import { removeAndTogglePreviousItem } from '../actions';

describe(`removeAndTogglePreviousItem`, (): void => {

  it(`returns a contentItem REMOVE_AND_TOGGLE_PREVIOUS_ITEM action containing the passed props`, (): void => {
    const dummyId = 'abcdefghijklmnopqrst';
    const expectedAction: t.RemoveAndTogglePreviousItemAction = {
      type: t.REMOVE_AND_TOGGLE_PREVIOUS_ITEM,
      payload: {
        id: dummyId,
      },
    };
    expect(removeAndTogglePreviousItem(dummyId)).toEqual(expectedAction);
  });

});
