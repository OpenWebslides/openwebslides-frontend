// @flow

import * as t from '../actionTypes';

import actions from '.';

describe(`setSuccess`, (): void => {

  it(`returns a SET_SUCCESS action`, (): void => {
    const dummyRequestId = 'foobar';
    const dummyValue = { foo: 'bar' };
    const expectedAction: t.SetSuccessAction = {
      type: t.SET_SUCCESS,
      payload: {
        requestId: dummyRequestId,
        value: dummyValue,
      },
    };
    const actualAction = actions.setSuccess(dummyRequestId, dummyValue);

    expect(actualAction).toEqual(expectedAction);
  });

  it(`converts UNDEFINED value argument to NULL`, (): void => {
    const dummyRequestId = 'foobar';
    const expectedAction: t.SetSuccessAction = {
      type: t.SET_SUCCESS,
      payload: {
        requestId: dummyRequestId,
        value: null,
      },
    };
    const actualAction = actions.setSuccess(dummyRequestId);

    expect(actualAction).toEqual(expectedAction);
  });

});
