// @flow

import { expectSaga } from 'redux-saga-test-plan';

import * as t from '../../actionTypes';
import { contextTypes } from '../../model';

import moveSaga from './move';

describe(`moveSaga`, (): void => {

  it(`puts a moveInState action`, (): void => {
    const dummyMoveAction: t.MoveAction = {
      type: t.MOVE,
      payload: {
        id: 'abcdefghijklmnoprst',
        nextContext: {
          contextType: contextTypes.SUPER,
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
