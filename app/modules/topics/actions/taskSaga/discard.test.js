// @flow

import * as a from '../../actionTypes';

import actions from '..';

describe(`discard`, (): void => {

  let dummyId: string;

  beforeEach((): void => {
    dummyId = 'dummyId';
  });

  it(`returns a topics DISCARD action containing the passed arguments`, (): void => {
    const expectedAction: a.DiscardAction = {
      type: a.DISCARD,
      payload: {
        id: dummyId,
      },
    };
    const actualAction = actions.discard(dummyId);

    expect(actualAction).toStrictEqual(expectedAction);
  });

});
