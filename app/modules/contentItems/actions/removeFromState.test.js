// @flow

import type { Identifier } from 'types/model';

import * as t from '../actionTypes';

import actions from '.';

describe(`removeFromState`, (): void => {

  let dummyId: Identifier;

  beforeEach((): void => {
    dummyId = 'abcdefghijklmnopqrst';
  });

  it(`returns a contentItem REMOVE_FROM_STATE action containing the passed props`, (): void => {
    const expectedAction: t.RemoveFromStateAction = {
      type: t.REMOVE_FROM_STATE,
      payload: {
        id: dummyId,
      },
    };
    const actualAction = actions.removeFromState(dummyId);
    expect(actualAction).toEqual(expectedAction);
  });

});
