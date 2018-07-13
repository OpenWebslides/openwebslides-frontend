// @flow

import type { Identifier } from 'types/model';
import { UnsupportedOperationError } from 'errors';

import * as t from '../actionTypes';

import actions from '.';

describe(`switchEditingInState`, (): void => {

  let dummyPrevId: Identifier;
  let dummyNextId: Identifier;

  beforeEach((): void => {
    dummyPrevId = 'abcdefghijklmnopqrst';
    dummyNextId = 'uvwxyzabcdefghijklmn';
  });

  it(`returns a contentItem SWITCH_EDITING_IN_STATE action containing the passed arguments`, (): void => {
    const expectedAction: t.SwitchEditingInStateAction = {
      type: t.SWITCH_EDITING_IN_STATE,
      payload: {
        previousEditingItemId: dummyPrevId,
        nextEditingItemId: dummyNextId,
      },
    };
    const actualAction = actions.switchEditingInState(dummyPrevId, dummyNextId);
    expect(actualAction).toEqual(expectedAction);
  });

  it(`converts undefined id values to NULL`, (): void => {
    const expectedAction1: t.SwitchEditingInStateAction = {
      type: t.SWITCH_EDITING_IN_STATE,
      payload: {
        previousEditingItemId: null,
        nextEditingItemId: dummyNextId,
      },
    };
    const expectedAction2: t.SwitchEditingInStateAction = {
      type: t.SWITCH_EDITING_IN_STATE,
      payload: {
        previousEditingItemId: dummyPrevId,
        nextEditingItemId: null,
      },
    };
    const actualAction1 = actions.switchEditingInState(undefined, dummyNextId);
    const actualAction2 = actions.switchEditingInState(dummyPrevId, undefined);
    expect(actualAction1).toEqual(expectedAction1);
    expect(actualAction2).toEqual(expectedAction2);
  });

  it(`throws an UnsupportedOperationError, when both ids are NULL`, (): void => {
    expect((): void => {
      actions.switchEditingInState(null, null);
    }).toThrow(UnsupportedOperationError);
  });

});
