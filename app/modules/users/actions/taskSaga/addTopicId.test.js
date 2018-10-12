// @flow

import * as a from '../../actionTypes';

import actions from '..';

describe(`addTopicId`, (): void => {

  let dummyUserId: string;
  let dummyTopicId: string;

  beforeEach((): void => {
    dummyUserId = 'dummyUserId';
    dummyTopicId = 'dummyTopicId';
  });

  it(`returns a users ADD_TOPIC_ID action containing the passed arguments`, (): void => {
    const expectedAction: a.AddTopicIdAction = {
      type: a.ADD_TOPIC_ID,
      payload: {
        id: dummyUserId,
        topicId: dummyTopicId,
      },
    };
    const actualAction = actions.addTopicId(dummyUserId, dummyTopicId);

    expect(actualAction).toStrictEqual(expectedAction);
  });

});
