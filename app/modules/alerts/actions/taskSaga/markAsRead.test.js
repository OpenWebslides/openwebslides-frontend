// @flow

import * as a from '../../actionTypes';

import actions from '..';

describe(`markAsRead`, (): void => {

  let dummyId: string;

  beforeEach((): void => {
    dummyId = 'dummyId';
  });

  it(`returns an alerts MARK_AS_READ action containing the passed arguments`, (): void => {
    const expectedAction: a.MarkAsReadAction = {
      type: a.MARK_AS_READ,
      payload: {
        id: dummyId,
      },
    };
    const actualAction = actions.markAsRead(dummyId);

    expect(actualAction).toStrictEqual(expectedAction);
  });

});
