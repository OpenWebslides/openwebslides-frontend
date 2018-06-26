// @flow

import reducer from '../reducer';
import * as t from '../actionTypes';
import type { HistoryState } from '../model';

describe(`reducer`, (): void => {
  it(`handles history SET_IN_STATE action`, (): void => {
    const prevState: HistoryState = {
      location: null,
    };

    const setInStateAction: t.SetInStateAction = {
      type: t.SET_IN_STATE,
      payload: {
        location: '/foobar',
      },
    };

    const nextState: HistoryState = {
      location: '/foobar',
    };

    const resultState = reducer(prevState, setInStateAction);

    expect(resultState).toEqual(nextState);
    expect(resultState).not.toEqual(prevState);
  });
});
