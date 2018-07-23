// @flow

import { select } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

import { UnsupportedOperationError } from 'errors';

import actions from '../../actions';
import selectors from '../../selectors';

import { sagas } from '..';

describe(`signout`, (): void => {

  let dummyToken: string;

  beforeEach((): void => {
    dummyToken = 'foobarToken';
  });

  it(`selects the current user's token from the state and puts an apiDeleteToken action, then puts an setUserAuthInState(null) action`, (): void => {
    const dummyAction = actions.signout();

    return expectSaga(sagas.signout, dummyAction)
      .provide([
        [select(selectors.getUserAuth), { userId: 'dummyId', apiToken: dummyToken }],
      ])
      .put(actions.apiDeleteToken(dummyToken))
      .put(actions.setUserAuthInState(null))
      .run();
  });

  it(`throws an UnsupportedOperationError, when there is no user currently signed in`, async (): Promise<*> => {
    const dummyAction = actions.signout();

    // Suppress console.error from redux-saga $FlowFixMe
    console.error = jest.fn();
    await expect(
      expectSaga(sagas.signout, dummyAction)
        .provide([
          [select(selectors.getUserAuth), null],
        ])
        .run(),
    ).rejects.toBeInstanceOf(UnsupportedOperationError);
  });

});
