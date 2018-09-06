// @flow

import { dummyAsyncRequestData } from 'lib/testResources';

import * as a from '../../actionTypes';
import * as m from '../../model';

import actions from '.';

describe(`setInState`, (): void => {

  let dummyAsyncRequest: m.AsyncRequest;

  beforeEach((): void => {
    dummyAsyncRequest = { ...dummyAsyncRequestData.pendingAsyncRequest };
  });

  it(`returns a SET_IN_STATE action, when parameters are valid`, (): void => {
    const expectedAction: a.SetInStateAction = {
      type: a.SET_IN_STATE,
      payload: {
        asyncRequest: dummyAsyncRequest,
      },
    };
    const actualAction = actions.setInState(dummyAsyncRequest);

    expect(actualAction).toEqual(expectedAction);
  });

});
