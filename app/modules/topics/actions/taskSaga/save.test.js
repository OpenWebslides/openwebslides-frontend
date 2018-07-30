// @flow

import * as a from '../../actionTypes';

import actions from '..';

describe(`save`, (): void => {

  it(`returns a SAVE action`, (): void => {
    const id = 'abcdefghij';
    const expectedAction: a.SaveContentAction = {
      type: a.SAVE,
      payload: {
        id,
      },
    };

    expect(actions.save(id)).toEqual(expectedAction);
  });

});
