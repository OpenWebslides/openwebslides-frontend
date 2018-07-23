// @flow

import * as a from '../actionTypes';
import * as m from '../model';

import reducer from '.';

describe(`setStatusInState`, (): void => {

  it(`adds a requestId and its requestStatus to the state, when the passed requestId does not yet exist in the state`, (): void => {
    const prevState: m.ApiRequestsStatusState = {
      existingId: {
        status: m.statusTypes.PENDING,
      },
    };
    const setStatusInStateAction: a.SetStatusInStateAction = {
      type: a.SET_STATUS_IN_STATE,
      payload: {
        requestId: 'newId',
        requestStatus: {
          status: m.statusTypes.PENDING,
        },
      },
    };
    const nextState = {
      existingId: {
        status: m.statusTypes.PENDING,
      },
      newId: {
        status: m.statusTypes.PENDING,
      },
    };
    const resultState = reducer(prevState, setStatusInStateAction);

    expect(resultState).toEqual(nextState);
    expect(resultState).not.toBe(prevState);
  });

  it(`replaces a requestStatus in the state, when the passed requestId already exists in the state`, (): void => {
    const prevState: m.ApiRequestsStatusState = {
      existingId: {
        status: m.statusTypes.PENDING,
      },
    };
    const setStatusInStateAction: a.SetStatusInStateAction = {
      type: a.SET_STATUS_IN_STATE,
      payload: {
        requestId: 'existingId',
        requestStatus: {
          status: m.statusTypes.SUCCESS,
          value: null,
        },
      },
    };
    const nextState: m.ApiRequestsStatusState = {
      existingId: {
        status: m.statusTypes.SUCCESS,
        value: null,
      },
    };
    const resultState = reducer(prevState, setStatusInStateAction);

    expect(resultState).toEqual(nextState);
    expect(resultState).not.toBe(prevState);
    expect(resultState.existingId).not.toBe(prevState.existingId);
  });

  it(`returns the state object unchanged, when the passed requestStatus is identical to the existing requestStatus for the passed requestId`, (): void => {
    const prevState: m.ApiRequestsStatusState = {
      existingId: {
        status: m.statusTypes.SUCCESS,
        value: { foo: 'bar' },
      },
    };
    const setStatusInStateAction: a.SetStatusInStateAction = {
      type: a.SET_STATUS_IN_STATE,
      payload: {
        requestId: 'existingId',
        requestStatus: {
          status: m.statusTypes.SUCCESS,
          value: { foo: 'bar' },
        },
      },
    };
    const resultState = reducer(prevState, setStatusInStateAction);

    expect(resultState).toBe(prevState);
  });

});
