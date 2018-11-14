// @flow

import * as a from '../../actionTypes';

import actions from '..';

describe(`create`, (): void => {

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

  it(`returns a pullRequests CREATE action containing the passed arguments`, (): void => {
    const expectedAction: a.CreateAction = {
      type: a.CREATE,
      payload: {
        message: dummyMessage,
        sourceTopicId: dummySourceTopicId,
        targetTopicId: dummyTargetTopicId,
        userId: dummyUserId,
      },
    };
    const actualAction = actions.create(dummyMessage, dummySourceTopicId, dummyTargetTopicId, dummyUserId);

    expect(actualAction).toStrictEqual(expectedAction);
  });

});
