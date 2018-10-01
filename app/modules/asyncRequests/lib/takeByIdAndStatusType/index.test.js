// @flow

import { expectSaga } from 'redux-saga-test-plan';

import actions from '../../actions';
import * as m from '../../model';

import lib from '..';

describe(`takeByIdAndStatusType`, (): void => {

  let dummyId: string;

  beforeEach((): void => {
    dummyId = 'dummyId';
  });

  it(`waits until a set[StatusType] action containing the requested ID is dispatched and returns it`, (): void => {
    const dummyNotMatchingTypeAction = actions.setInState({ id: dummyId, status: m.statusTypes.PENDING });
    const dummyNotMatchingStatusAction = actions.setFailure(dummyId, new Error());
    const dummyNotMatchingIdAction = actions.setPending('notMatchingId');
    const dummyMatchingAction = actions.setPending(dummyId);

    return expectSaga(lib.takeByIdAndStatusType, dummyId, m.statusTypes.PENDING)
      .dispatch(dummyNotMatchingTypeAction)
      .dispatch(dummyNotMatchingStatusAction)
      .dispatch(dummyNotMatchingIdAction)
      .dispatch(dummyMatchingAction)
      .returns(dummyMatchingAction)
      .run();
  });

});
