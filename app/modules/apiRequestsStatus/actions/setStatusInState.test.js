// @flow

import { InvalidArgumentError } from 'errors';

import * as t from '../actionTypes';
import * as m from '../model';

import actions from '.';

describe(`setStatusInState`, (): void => {

  let dummyRequestStatus: m.RequestStatus;

  beforeEach((): void => {
    dummyRequestStatus = {
      status: m.statusTypes.FAILURE,
      error: new Error('dummyMessage'),
    };
  });

  it(`returns a SET_STATUS_IN_STATE action, when parameters are valid`, (): void => {
    const dummyRequestId = 'foobar';
    const expectedAction: t.SetStatusInStateAction = {
      type: t.SET_STATUS_IN_STATE,
      payload: {
        requestId: dummyRequestId,
        requestStatus: dummyRequestStatus,
      },
    };
    const actualAction: t.SetStatusInStateAction = actions.setStatusInState(dummyRequestId, dummyRequestStatus);

    expect(actualAction).toEqual(expectedAction);
  });

  it(`throws an InvalidArgumentError, when the requestId is an empty string`, (): void => {
    expect(() => actions.setStatusInState('', dummyRequestStatus)).toThrow(InvalidArgumentError);
  });

});
