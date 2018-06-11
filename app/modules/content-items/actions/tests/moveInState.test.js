// @flow

import * as t from '../../actionTypes';
import { contextTypes } from '../../model';
import type { VerticalContext } from '../../model';
import { moveInState } from '../../actions';

describe(`moveInState`, (): void => {

  it(`returns a contentItem MOVE_IN_STATE action containing the passed props`, (): void => {
    const dummyId = 'abcdefghijklmnopqrst';
    const dummyNextContext: VerticalContext = {
      contextType: contextTypes.SUPER,
      contextItemId: 'opqrstuvwxyzabcdefgh',
    };
    const expectedAction: t.MoveInStateAction = {
      type: t.MOVE_IN_STATE,
      payload: {
        id: dummyId,
        nextContext: dummyNextContext,
      },
    };
    expect(moveInState(dummyId, dummyNextContext)).toEqual(expectedAction);
  });

});
