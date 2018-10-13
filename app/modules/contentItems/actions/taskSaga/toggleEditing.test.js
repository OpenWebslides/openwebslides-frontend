// @flow

import * as a from '../../actionTypes';

import actions from '.';

describe(`toggleEditing`, (): void => {

  let dummyId: string;

  beforeEach((): void => {
    dummyId = 'abcdefghijklmnopqrst';
  });

  it(`returns a contentItem TOGGLE_EDITING action containing the passed props`, (): void => {
    const expectedAction: a.ToggleEditingAction = {
      type: a.TOGGLE_EDITING,
      payload: {
        id: dummyId,
        isEditing: true,
      },
    };
    const actualAction = actions.toggleEditing(dummyId, true);
    expect(actualAction).toStrictEqual(expectedAction);
  });

  it(`does not set an isEditing prop in the action payload, when the isEditing argument was not set`, (): void => {
    const expectedAction: a.ToggleEditingAction = {
      type: a.TOGGLE_EDITING,
      payload: {
        id: dummyId,
      },
    };
    const actualAction = actions.toggleEditing(dummyId);
    expect(actualAction).toStrictEqual(expectedAction);
  });

});
