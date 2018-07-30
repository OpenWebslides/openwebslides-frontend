// @flow

import * as a from '../../actionTypes';

import actions from '..';

describe(`load`, (): void => {

  it(`returns a LOAD action`, (): void => {
    const id = 'abcdefghij';
    const expectedAction: a.LoadContentAction = {
      type: a.LOAD,
      payload: {
        id,
      },
    };

    expect(actions.load(id)).toEqual(expectedAction);
  });

});
