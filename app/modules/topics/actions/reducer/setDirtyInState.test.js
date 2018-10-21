// @flow

import * as a from '../../actionTypes';

import actions from '..';

describe(`setDirtyInState`, (): void => {

  let dummyId: string;
  let dummyDirty: boolean;

  beforeEach((): void => {
    dummyId = 'dummyId';
    dummyDirty = false;
  });

  it(`returns a topics SET_DIRTY_IN_STATE action containing the passed arguments`, (): void => {
    const expectedAction: a.SetDirtyInStateAction = {
      type: a.SET_DIRTY_IN_STATE,
      payload: {
        id: dummyId,
        dirty: dummyDirty,
      },
    };
    const actualAction = actions.setDirtyInState(dummyId, dummyDirty);

    expect(actualAction).toStrictEqual(expectedAction);
  });

});
