// @flow

import * as t from '../actionTypes';
import { contextTypes } from '../model';
import type { VerticalContext } from '../model';

import actions from '.';

describe(`moveInState`, (): void => {

  let dummyId: string;
  let dummyNextContext: VerticalContext;

  beforeEach((): void => {
    dummyId = 'abcdefghijklmnopqrst';
    dummyNextContext = {
      contextType: contextTypes.SUPER,
      contextItemId: 'opqrstuvwxyzabcdefgh',
    };
  });

  it(`returns a contentItem MOVE_IN_STATE action containing the passed props`, (): void => {
    const expectedAction: t.MoveInStateAction = {
      type: t.MOVE_IN_STATE,
      payload: {
        id: dummyId,
        nextContext: dummyNextContext,
      },
    };
    const actualAction = actions.moveInState(dummyId, dummyNextContext);
    expect(actualAction).toEqual(expectedAction);
  });

});
