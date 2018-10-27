// @flow

import { dummyErrorData as dummyData } from 'lib/testResources';

import * as a from '../actionTypes';
import * as m from '../model';

import reducer from '.';

describe(`addToState`, (): void => {

  let dummyLoggedError1: m.LoggedError;
  let dummyLoggedError2: m.LoggedError;

  beforeEach((): void => {
    dummyLoggedError1 = { ...dummyData.dummyLoggedError };
    dummyLoggedError2 = { ...dummyData.dummyLoggedError2 };
  });

  it(`adds the passed LoggedError to the state`, (): void => {
    const prevState: m.ErrorsState = {
      log: [
        dummyLoggedError1,
      ],
    };
    const addToStateAction: a.AddToStateAction = {
      type: a.ADD_TO_STATE,
      payload: {
        loggedError: dummyLoggedError2,
      },
    };
    const nextState: m.ErrorsState = {
      log: [
        dummyLoggedError1,
        dummyLoggedError2,
      ],
    };
    const resultState = reducer(prevState, addToStateAction);

    expect(resultState).toStrictEqual(nextState);
    expect(resultState).not.toBe(prevState);
    expect(resultState.log).not.toBe(prevState.log);
  });

});
