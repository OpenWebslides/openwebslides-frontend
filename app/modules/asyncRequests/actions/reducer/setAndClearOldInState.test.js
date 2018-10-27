// @flow

import { dummyAsyncRequestData } from 'lib/testResources';

import * as a from '../../actionTypes';
import * as m from '../../model';

import actions from '.';

describe(`setAndClearOldInState`, (): void => {

  let dummyAsyncRequest: m.AsyncRequest;

  beforeEach((): void => {
    dummyAsyncRequest = { ...dummyAsyncRequestData.pendingAsyncRequest };
  });

  it(`returns a SET_AND_CLEAR_OLD_IN_STATE action, when parameters are valid`, (): void => {
    const expectedAction: a.SetAndClearOldInStateAction = {
      type: a.SET_AND_CLEAR_OLD_IN_STATE,
      payload: {
        asyncRequest: dummyAsyncRequest,
      },
    };
    const actualAction = actions.setAndClearOldInState(dummyAsyncRequest);

    expect(actualAction).toStrictEqual(expectedAction);
  });

});
