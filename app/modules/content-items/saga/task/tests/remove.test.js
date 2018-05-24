// @flow

import { expectSaga } from 'redux-saga-test-plan';
import NotYetImplementedError from 'errors/implementation-errors/NotYetImplementedError';

import * as t from '../../../actionTypes';

import removeSaga from '../remove';

describe(`removeSaga`, (): void => {

  it(`temporarily throws a NotYetImplementedError`, (): void => {
    const dummyRemoveAction: t.RemoveAction = {
      type: t.REMOVE,
      payload: {
        id: 'abcdefghijklmnopqrst',
      },
    };
    expect((): void => {
      expectSaga(removeSaga, dummyRemoveAction).run();
    }).toThrow(NotYetImplementedError);
  });

});
