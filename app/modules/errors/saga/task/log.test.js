// @flow

import { advanceTo } from 'jest-date-mock';
import { expectSaga } from 'redux-saga-test-plan';

import actions from '../../actions';

import { taskSagas } from '.';

describe(`log`, (): void => {

  let dummyError: Error;
  let dummyTimestamp: number;

  beforeEach((): void => {
    dummyError = new Error('dummy');
    dummyTimestamp = 123456;

    advanceTo(dummyTimestamp);
  });

  it(`puts an errors ADD_TO_STATE action with a LoggedError containing the passed error object and the current timestamp`, (): void => {
    const dummyAction = actions.log(dummyError);

    // Suppress console.error output $FlowFixMe
    console.error = jest.fn();
    return expectSaga(taskSagas.log, dummyAction)
      .put(actions.addToState({
        errorObject: dummyError,
        timestamp: dummyTimestamp,
      }))
      .call(console.error, `${dummyError.constructor.name}: ${dummyError.message}`)
      .run();
  });

});
