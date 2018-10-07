// @flow

import * as a from '../../actionTypes';

import actions from '..';

describe(`forkTopic`, (): void => {

  let dummyUserId: string;
  let dummyTopicId: string;

  beforeEach((): void => {
    dummyUserId = 'dummyUserId';
    dummyTopicId = 'dummyTopicId';
  });

  it(`returns a users FORK_TOPIC action containing the passed arguments`, (): void => {
    const expectedAction: a.ForkTopicAction = {
      type: a.FORK_TOPIC,
      payload: {
        id: dummyUserId,
        topicId: dummyTopicId,
      },
    };
    const actualAction = actions.forkTopic(dummyUserId, dummyTopicId);

    expect(actualAction).toEqual(expectedAction);
  });

});
