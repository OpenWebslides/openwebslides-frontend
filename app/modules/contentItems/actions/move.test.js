// @flow

import type { Identifier } from 'types/model';

import * as t from '../actionTypes';
import { contextTypes } from '../model';
import type { VerticalContext } from '../model';

import actions from '.';

describe(`move`, (): void => {

  let dummyId: Identifier;
  let dummyNextContext: VerticalContext;

  beforeEach((): void => {
    dummyId = 'abcdefghijklmnopqrst';
    dummyNextContext = {
      contextType: contextTypes.SUPER,
      contextItemId: 'opqrstuvwxyzabcdefgh',
    };
  });

  it(`returns a contentItem MOVE action containing the passed props`, (): void => {
    const expectedAction: t.MoveAction = {
      type: t.MOVE,
      payload: {
        id: dummyId,
        nextContext: dummyNextContext,
      },
    };
    const actualAction = actions.move(dummyId, dummyNextContext);
    expect(actualAction).toEqual(expectedAction);
  });

});
