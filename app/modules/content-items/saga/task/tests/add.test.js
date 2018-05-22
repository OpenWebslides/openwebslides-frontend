// @flow

import { expectSaga } from 'redux-saga-test-plan';
import NotYetImplementedError from 'errors/implementation-errors/NotYetImplementedError';

import * as t from '../../../actionTypes';
import { contentItemTypes } from '../../../model';

import addSaga from '../add';

describe(`addSaga`, (): void => {

  it(`temporarily throws a NotYetImplementedError`, (): void => {
    const dummyAddAction: t.AddAction = {
      type: t.ADD,
      payload: {
        id: 'abcdefghijklmnopqrst',
        type: contentItemTypes.ROOT,
        propsForType: {},
      },
    };
    expect((): void => {
      expectSaga(addSaga, dummyAddAction).run();
    }).toThrow(NotYetImplementedError);
  });

});
