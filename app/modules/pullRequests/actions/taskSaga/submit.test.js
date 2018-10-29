// @flow

import * as a from '../../actionTypes';

import actions from '..';

describe(`submit`, (): void => {

  let dummyMessage: string;
  let dummySourceTopicId: string;
  let dummyTargetTopicId: string;
  let dummyUserId: string;

  beforeEach((): void => {
    dummyMessage = 'dummyMessage';
    dummySourceTopicId = 'dummySourceTopicId';
    dummyTargetTopicId = 'dummyTargetTopicId';
    dummyUserId = 'dummyUserId';
  });

  it(`returns a pullRequests SUBMIT action containing the passed arguments`, (): void => {
    const expectedAction: a.SubmitAction = {
      type: a.SUBMIT,
      payload: {
        message: dummyMessage,
        sourceTopicId: dummySourceTopicId,
        targetTopicId: dummyTargetTopicId,
        userId: dummyUserId,
      },
    };
    const actualAction = actions.submit(dummyMessage, dummySourceTopicId, dummyTargetTopicId, dummyUserId);

    expect(actualAction).toStrictEqual(expectedAction);
  });

});
