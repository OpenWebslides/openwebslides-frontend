// @flow

import * as a from '../../actionTypes';

import actions from '..';

describe(`accept`, (): void => {

  let dummyId: string;
  let dummyFeedback: string;

  beforeEach((): void => {
    dummyId = 'dummyId';
    dummyFeedback = 'dummyFeedback';
  });

  it(`returns a pullRequests ACCEPT action containing the passed arguments`, (): void => {
    const expectedAction: a.AcceptAction = {
      type: a.ACCEPT,
      payload: {
        id: dummyId,
        feedback: dummyFeedback,
      },
    };
    const actualAction = actions.accept(dummyId, dummyFeedback);

    expect(actualAction).toStrictEqual(expectedAction);
  });

});
