// @flow

import * as a from '../../actionTypes';

import actions from '..';

describe(`removeTopicId`, (): void => {

  let dummyUserId: string;
  let dummyTopicId: string;

  beforeEach((): void => {
    dummyUserId = 'dummyUserId';
    dummyTopicId = 'dummyTopicId';
  });

  it(`returns a users REMOVE_TOPIC_ID action containing the passed arguments`, (): void => {
    const expectedAction: a.RemoveTopicIdAction = {
      type: a.REMOVE_TOPIC_ID,
      payload: {
        id: dummyUserId,
        topicId: dummyTopicId,
      },
    };
    const actualAction = actions.removeTopicId(dummyUserId, dummyTopicId);

    expect(actualAction).toEqual(expectedAction);
  });

});
