// @flow

import { dummyErrorData as dummyData } from 'lib/testResources';

import * as a from '../../actionTypes';
import * as m from '../../model';

import actions from '..';

describe(`addToState`, (): void => {

  let dummyLoggedError: m.LoggedError;

  beforeEach((): void => {
    dummyLoggedError = { ...dummyData.dummyLoggedError };
  });

  it(`returns a errors ADD_TO_STATE action containing the passed arguments`, (): void => {
    const expectedAction: a.AddToStateAction = {
      type: a.ADD_TO_STATE,
      payload: {
        loggedError: dummyLoggedError,
      },
    };
    const actualAction = actions.addToState(dummyLoggedError);

    expect(actualAction).toStrictEqual(expectedAction);
  });

});
