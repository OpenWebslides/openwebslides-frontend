// @flow

import { expectSaga } from 'redux-saga-test-plan';
import NotYetImplementedError from 'errors/implementation-errors/NotYetImplementedError';

import * as t from '../../../actionTypes';

import moveSaga from '../move';

describe(`moveSaga`, (): void => {

  it(`temporarily throws a NotYetImplementedError`, (): void => {
    const dummyMoveAction: t.MoveAction = {
      type: t.MOVE,
      payload: {
        id: 'abcdefghijklmnopqrst',
      },
    };
    expect((): void => {
      expectSaga(moveSaga, dummyMoveAction).run();
    }).toThrow(NotYetImplementedError);
  });

});
