// @flow

import * as a from '../../actionTypes';

import actions from '..';

describe(`removeTopic`, (): void => {

  let dummyUserId: string;
  let dummyTopicId: string;

  beforeEach((): void => {
    dummyUserId = 'dummyUserId';
    dummyTopicId = 'dummyTopicId';
  });

  it(`returns a users REMOVE_TOPIC action containing the passed arguments`, (): void => {
    const expectedAction: a.RemoveTopicAction = {
      type: a.REMOVE_TOPIC,
      payload: {
        id: dummyUserId,
        topicId: dummyTopicId,
      },
    };
    const actualAction = actions.removeTopic(dummyUserId, dummyTopicId);

    expect(actualAction).toStrictEqual(expectedAction);
  });

});
