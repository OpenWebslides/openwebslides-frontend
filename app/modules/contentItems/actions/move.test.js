// @flow

import * as a from '../actionTypes';
import * as m from '../model';

import actions from '.';

describe(`move`, (): void => {

  let dummyId: string;
  let dummyNextContext: m.VerticalContext;

  beforeEach((): void => {
    dummyId = 'abcdefghijklmnopqrst';
    dummyNextContext = {
      contextType: m.contextTypes.SUPER,
      contextItemId: 'opqrstuvwxyzabcdefgh',
    };
  });

  it(`returns a contentItem MOVE action containing the passed props`, (): void => {
    const expectedAction: a.MoveAction = {
      type: a.MOVE,
      payload: {
        id: dummyId,
        nextContext: dummyNextContext,
      },
    };
    const actualAction = actions.move(dummyId, dummyNextContext);
    expect(actualAction).toEqual(expectedAction);
  });

});
