// @flow

import * as a from '../../actionTypes';

import actions from '.';

describe(`remove`, (): void => {

  let dummyId: string;

  beforeEach((): void => {
    dummyId = 'abcdefghijklmnopqrst';
  });

  it(`returns a contentItem REMOVE action containing the passed props`, (): void => {
    const expectedAction: a.RemoveAction = {
      type: a.REMOVE,
      payload: {
        id: dummyId,
      },
    };
    const actualAction = actions.remove(dummyId);
    expect(actualAction).toEqual(expectedAction);
  });

});
