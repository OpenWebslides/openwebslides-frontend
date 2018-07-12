// @flow

import { expectSaga } from 'redux-saga-test-plan';

import * as t from '../../actionTypes';
import * as m from '../../model';

import moveSaga from './move';

describe(`moveSaga`, (): void => {

  it(`puts a MOVE_IN_STATE action`, (): void => {
    const dummyMoveAction: t.MoveAction = {
      type: t.MOVE,
      payload: {
        id: 'abcdefghijklmnoprst',
        nextContext: {
          contextType: m.contextTypes.SUPER,
          contextItemId: 'uvwxyzabcdefghijklmn',
        },
      },
    };
    return expectSaga(moveSaga, dummyMoveAction)
      .put.like({
        action: {
          type: t.MOVE_IN_STATE,
          payload: {
            id: dummyMoveAction.payload.id,
            nextContext: dummyMoveAction.payload.nextContext,
          },
        },
      })
      .run();
  });

});
