// @flow

import * as a from '../../actionTypes';

import actions from '..';

describe(`removeFromState`, (): void => {

  let dummyId: string;

  beforeEach((): void => {
    dummyId = 'abcdefghij';
  });

  it(`returns a topic REMOVE_FROM_STATE action containing the passed arguments`, (): void => {
    const expectedAction: a.RemoveFromStateAction = {
      type: a.REMOVE_FROM_STATE,
      payload: {
        id: dummyId,
      },
    };
    const actualAction = actions.removeFromState(dummyId);

    expect(actualAction).toEqual(expectedAction);
  });

});
