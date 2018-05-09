// @flow

import reducer from '../reducer';
import * as t from '../actionTypes';
import { statusTypes } from '../model';

describe(`reducer`, (): void => {

  it(`returns the initial state, when state parameter is undefined`, (): void => {
    const dummyAction = {
      type: t.SET_STATUS_ERROR,
      error: {
        message: `Flow will complain if the passed action isn't some kind of valid ApiAction.`,
      },
    };

    expect(reducer(undefined, dummyAction)).toEqual({});
  });

  it(`handles api SET_STATUS action on empty state`, (): void => {
    const prevState = {};

    const setStatusAction = {
      type: t.SET_STATUS,
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

    expect(reducer(prevState, setStatusAction)).toEqual(nextState);
  });

  it(`handles api SET_STATUS action on existing state`, (): void => {
    const prevState = {
      foobar: {
        status: statusTypes.PENDING,
      },
    };

    const setStatusAction = {
      type: t.SET_STATUS,
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

    expect(reducer(prevState, setStatusAction)).toEqual(nextState);
  });

});
