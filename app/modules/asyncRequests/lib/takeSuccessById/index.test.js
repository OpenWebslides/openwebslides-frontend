// @flow

import { expectSaga } from 'redux-saga-test-plan';

import actions from '../../actions';
import * as m from '../../model';

import lib from '..';

describe(`takeSuccessById`, (): void => {

  let dummyId: string;
  let dummyValue: string;

  beforeEach((): void => {
    dummyId = 'dummyId';
    dummyValue = 'dummyValue';
  });

  it(`waits until a setFailure action containing the requested ID is dispatched and returns its value`, (): void => {
    const dummyNotMatchingTypeAction = actions.setInState({ id: dummyId, status: m.statusTypes.SUCCESS, value: 'notTheCorrectValue' });
    const dummyNotMatchingIdAction = actions.setSuccess('notMatchingId', 'notTheCorrectValue');
    const dummyMatchingAction = actions.setSuccess(dummyId, dummyValue);

    return expectSaga(lib.takeSuccessById, dummyId)
      .dispatch(dummyNotMatchingTypeAction)
      .dispatch(dummyNotMatchingIdAction)
      .dispatch(dummyMatchingAction)
      .returns(dummyValue)
      .run();
  });

});
