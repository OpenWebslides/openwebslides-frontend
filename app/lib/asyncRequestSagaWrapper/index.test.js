// @flow

import { type Saga } from 'redux-saga';
import { expectSaga } from 'redux-saga-test-plan';

import { type SagaAction } from 'types/actions';
import generateRandomString from 'lib/generateRandomString';
import asyncRequests from 'modules/asyncRequests';

import asyncRequestSagaWrapper from '.';

jest.mock('lib/generateRandomString');

describe(`asyncRequestSagaWrapper`, (): void => {

  let dummyRandomString: string;

  beforeEach((): void => {
    dummyRandomString = 'supposedToBeRandom';
    (generateRandomString: any).mockReturnValue(dummyRandomString);
  });

  it(`sets the request's asyncRequests status to PENDING, calls the passed saga and then sets the request's asyncRequests status to SUCCESS, when the passed saga completes without errors`, (): void => {
    const dummyReturnValue = 'dummyReturnValue';
    // eslint-disable-next-line require-yield
    const dummySaga = function* (action: SagaAction): Saga<string> {
      return dummyReturnValue;
    };
    const dummyAction = { type: 'dummy', asyncRequestId: 'dummyId' };

    return expectSaga(asyncRequestSagaWrapper, dummySaga, dummyAction)
      .put(asyncRequests.actions.setPending(dummyAction.asyncRequestId))
      .call(dummySaga, dummyAction)
      .put(asyncRequests.actions.setSuccess(dummyAction.asyncRequestId, dummyReturnValue))
      .run();
  });

  it(`sets the request's asyncRequests status to PENDING, calls the passed saga and then sets the request's asyncRequests status to FAILURE, when the passed saga throws an error`, (): void => {
    const dummyError = new Error('dummyError');
    // eslint-disable-next-line require-yield
    const dummySaga = function* (action: SagaAction): Saga<void> {
      throw dummyError;
    };
    const dummyAction = { type: 'dummy', asyncRequestId: 'dummyId' };

    return expectSaga(asyncRequestSagaWrapper, dummySaga, dummyAction)
      .put(asyncRequests.actions.setPending(dummyAction.asyncRequestId))
      .call(dummySaga, dummyAction)
      .put(asyncRequests.actions.setFailure(dummyAction.asyncRequestId, dummyError))
      .run();
  });

  it(`generates a random asyncRequestId, when no existing asyncRequestId is set on the action`, (): void => {
    // eslint-disable-next-line require-yield
    const dummySaga = function* (action: SagaAction): Saga<void> {
      // placeholder
    };
    const dummyAction = { type: 'dummy' };

    return expectSaga(asyncRequestSagaWrapper, dummySaga, dummyAction)
      .put(asyncRequests.actions.setPending(`${dummyAction.type}-${dummyRandomString}`))
      .run();
  });

});
