// @flow

import * as a from '../actionTypes';
import * as m from '../model';

import reducer from '.';

describe(`setRefreshingInState`, (): void => {

  it(`set refreshing in the state when the passed refreshing is not equal to the current state`, (): void => {
    const prevState: m.AsyncRequestsState = {
      byId: {},
      refreshing: false,
    };
    const setRefreshingInStateAction: a.SetRefreshingInStateAction = {
      type: a.SET_REFRESHING_IN_STATE,
      payload: {
        refreshing: true,
      },
    };
    const nextState: m.AsyncRequestsState = {
      byId: {},
      refreshing: true,
    };
    const resultState = reducer(prevState, setRefreshingInStateAction);

    expect(resultState).toStrictEqual(nextState);
    expect(resultState).not.toBe(prevState);
  });

  it(`returns the state object unchanged, when the passed refreshing is equal to the current state`, (): void => {
    const prevState: m.AsyncRequestsState = {
      byId: {},
      refreshing: false,
    };
    const setRefreshingInStateAction: a.SetRefreshingInStateAction = {
      type: a.SET_REFRESHING_IN_STATE,
      payload: {
        refreshing: false,
      },
    };
    const resultState = reducer(prevState, setRefreshingInStateAction);

    expect(resultState).toStrictEqual(prevState);
    expect(resultState).toBe(prevState);
  });

});
