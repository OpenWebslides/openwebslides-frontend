// @flow

import * as t from '../../actionTypes';
import { toggleEditing } from '../../actions';

describe(`toggleEditing`, (): void => {

  it(`returns a contentItem TOGGLE_EDITING action containing the passed props`, (): void => {
    const dummyId = 'abcdefghijklmnopqrst';
    const expectedAction: t.ToggleEditingAction = {
      type: t.TOGGLE_EDITING,
      payload: {
        id: dummyId,
        isEditing: true,
      },
    };
    expect(toggleEditing(dummyId, true)).toEqual(expectedAction);
  });

  it(`does not set an isEditing prop in the action payload, when the isEditing argument was not set`, (): void => {
    const dummyId = 'abcdefghijklmnopqrst';
    const expectedAction: t.ToggleEditingAction = {
      type: t.TOGGLE_EDITING,
      payload: {
        id: dummyId,
      },
    };
    expect(toggleEditing(dummyId)).toEqual(expectedAction);
  });

});
