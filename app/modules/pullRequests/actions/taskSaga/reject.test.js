// @flow

import * as a from '../../actionTypes';

import actions from '..';

describe(`reject`, (): void => {

  let dummyId: string;
  let dummyFeedback: string;

  beforeEach((): void => {
    dummyId = 'dummyId';
    dummyFeedback = 'dummyFeedback';
  });

  it(`returns a pullRequests REJECT action containing the passed arguments`, (): void => {
    const expectedAction: a.RejectAction = {
      type: a.REJECT,
      payload: {
        id: dummyId,
        feedback: dummyFeedback,
      },
    };
    const actualAction = actions.reject(dummyId, dummyFeedback);

    expect(actualAction).toStrictEqual(expectedAction);
  });

});
