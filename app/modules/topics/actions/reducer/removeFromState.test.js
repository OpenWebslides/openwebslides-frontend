// @flow

import * as a from '../../actionTypes';

import actions from '..';

describe(`removeFromState`, (): void => {

  it(`returns a topic REMOVE_FROM_STATE action, when parameters are valid`, (): void => {
    const id = 'abcdefghij';
    const expectedAction: a.RemoveFromStateAction = {
      type: a.REMOVE_FROM_STATE,
      payload: {
        id,
      },
    };

    expect(actions.removeFromState(id)).toEqual(expectedAction);
  });

});
