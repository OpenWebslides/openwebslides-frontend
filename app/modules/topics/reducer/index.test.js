// @flow

import reducer, { initialState } from '.';

describe(`reducer`, (): void => {

  it(`returns the initial state, when state parameter is undefined`, (): void => {
    const dummyAction: any = {
      type: 'DUMMY_ACTION',
    };
    expect(reducer(undefined, dummyAction)).toEqual(initialState);
  });

});
