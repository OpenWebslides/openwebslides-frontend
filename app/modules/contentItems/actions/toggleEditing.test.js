// @flow

import type { Identifier } from 'types/model';

import * as t from '../actionTypes';

import actions from '.';

describe(`toggleEditing`, (): void => {

  let dummyId: Identifier;

  beforeEach((): void => {
    dummyId = 'abcdefghijklmnopqrst';
  });

  it(`returns a contentItem TOGGLE_EDITING action containing the passed props`, (): void => {
    const expectedAction: t.ToggleEditingAction = {
      type: t.TOGGLE_EDITING,
      payload: {
        id: dummyId,
        isEditing: true,
      },
    };
    const actualAction = actions.toggleEditing(dummyId, true);
    expect(actualAction).toEqual(expectedAction);
  });

  it(`does not set an isEditing prop in the action payload, when the isEditing argument was not set`, (): void => {
    const expectedAction: t.ToggleEditingAction = {
      type: t.TOGGLE_EDITING,
      payload: {
        id: dummyId,
      },
    };
    const actualAction = actions.toggleEditing(dummyId);
    expect(actualAction).toEqual(expectedAction);
  });

});
