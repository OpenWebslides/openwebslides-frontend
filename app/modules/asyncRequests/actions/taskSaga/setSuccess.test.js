// @flow

import * as a from '../../actionTypes';

import actions from '.';

describe(`setSuccess`, (): void => {

  it(`returns a SET_SUCCESS action`, (): void => {
    const dummyId = 'foobar';
    const dummyValue = { foo: 'bar' };
    const expectedAction: a.SetSuccessAction = {
      type: a.SET_SUCCESS,
      payload: {
        id: dummyId,
        value: dummyValue,
      },
    };
    const actualAction = actions.setSuccess(dummyId, dummyValue);

    expect(actualAction).toEqual(expectedAction);
  });

  it(`converts UNDEFINED value argument to NULL`, (): void => {
    const dummyId = 'foobar';
    const expectedAction: a.SetSuccessAction = {
      type: a.SET_SUCCESS,
      payload: {
        id: dummyId,
        value: null,
      },
    };
    const actualAction = actions.setSuccess(dummyId);

    expect(actualAction).toEqual(expectedAction);
  });

});
