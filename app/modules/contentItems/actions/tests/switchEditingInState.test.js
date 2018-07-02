// @flow

import UnsupportedOperationError from 'errors/implementation-errors/UnsupportedOperationError';

import * as t from '../../actionTypes';
import switchEditingInState from '../switchEditingInState';

describe(`switchEditingInState`, (): void => {

  it(`returns a contentItem SWITCH_EDITING_IN_STATE action containing the passed arguments`, (): void => {
    const dummyPrevId = 'abcdefghijklmnopqrst';
    const dummyNextId = 'uvwxyzabcdefghijklmn';
    const expectedAction: t.SwitchEditingInStateAction = {
      type: t.SWITCH_EDITING_IN_STATE,
      payload: {
        previousEditingItemId: dummyPrevId,
        nextEditingItemId: dummyNextId,
      },
    };
    expect(switchEditingInState(dummyPrevId, dummyNextId)).toEqual(expectedAction);
  });

  it(`converts undefined id values to NULL`, (): void => {
    const dummyPrevId = 'abcdefghijklmnopqrst';
    const dummyNextId = 'uvwxyzabcdefghijklmn';
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
    expect(switchEditingInState(undefined, dummyNextId)).toEqual(expectedAction1);
    expect(switchEditingInState(dummyPrevId, undefined)).toEqual(expectedAction2);
  });

  it(`throws an UnsupportedOperationError, when both ids are NULL`, (): void => {
    expect((): void => {
      switchEditingInState(null, null);
    }).toThrow(UnsupportedOperationError);
  });

});
