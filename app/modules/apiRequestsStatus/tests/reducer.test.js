// @flow

import reducer from '../reducer';
import * as t from '../actionTypes';
import { statusTypes } from '../model';

describe(`reducer`, (): void => {

  it(`returns the initial state, when state parameter is undefined`, (): void => {
    const dummyAction: any = {
      type: 'DUMMY_ACTION',
    };

    expect(reducer(undefined, dummyAction)).toEqual({});
  });

  it(`handles api SET_STATUS action on empty state`, (): void => {
    const prevState = {};

    const setStatusAction = {
      type: t.SET_STATUS_IN_STATE,
      payload: {
        request: 'foobar',
        status: statusTypes.SUCCESS,
      },
    };

    const nextState = {
      foobar: {
        status: statusTypes.SUCCESS,
      },
    };

    const resultState = reducer(prevState, setStatusAction);
    expect(resultState).toEqual(nextState);
    expect(resultState).not.toBe(prevState);
  });

  it(`handles api SET_STATUS action on existing state`, (): void => {
    const prevState = {
      foobar: {
        status: statusTypes.PENDING,
      },
    };

    const setStatusAction = {
      type: t.SET_STATUS_IN_STATE,
      payload: {
        request: 'foobar',
        status: statusTypes.SUCCESS,
      },
    };

    const nextState = {
      foobar: {
        status: statusTypes.SUCCESS,
      },
    };

    const resultState = reducer(prevState, setStatusAction);
    expect(resultState).toEqual(nextState);
    expect(resultState).not.toBe(prevState);
  });

});