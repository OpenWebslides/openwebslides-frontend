// @flow

import * as a from '../../actionTypes';

import actions from '..';

describe(`markAsReadInState`, (): void => {

  let dummyId: string;

  beforeEach((): void => {
    dummyId = 'dummyId';
  });

  it(`returns an alerts MARK_AS_READ_IN_STATE action containing the passed arguments`, (): void => {
    const expectedAction: a.MarkAsReadInStateAction = {
      type: a.MARK_AS_READ_IN_STATE,
      payload: {
        id: dummyId,
      },
    };
    const actualAction = actions.markAsReadInState(dummyId);

    expect(actualAction).toStrictEqual(expectedAction);
  });

});
