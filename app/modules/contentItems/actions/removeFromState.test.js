// @flow

import * as t from '../actionTypes';
import { removeFromState } from '../actions';

describe(`removeFromState`, (): void => {

  it(`returns a contentItem REMOVE_FROM_STATE action containing the passed props`, (): void => {
    const dummyId = 'abcdefghijklmnopqrst';
    const expectedAction: t.RemoveFromStateAction = {
      type: t.REMOVE_FROM_STATE,
      payload: {
        id: dummyId,
      },
    };
    expect(removeFromState(dummyId)).toEqual(expectedAction);
  });

});
