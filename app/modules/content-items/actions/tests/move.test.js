// @flow

import * as t from '../../actionTypes';
import { contextTypes } from '../../model';
import type { VerticalContext } from '../../model';
import { move } from '../../actions';

describe(`move`, (): void => {

  it(`returns a contentItem MOVE action containing the passed props`, (): void => {
    const dummyId = 'abcdefghijklmnopqrst';
    const dummyNextContext: VerticalContext = {
      contextType: contextTypes.SUPER,
      contextItemId: 'opqrstuvwxyzabcdefgh',
    };
    const expectedAction: t.MoveAction = {
      type: t.MOVE,
      payload: {
        id: dummyId,
        nextContext: dummyNextContext,
      },
    };
    expect(move(dummyId, dummyNextContext)).toEqual(expectedAction);
  });

});
