// @flow

import * as a from '../../actionTypes';

import actions from '..';

describe(`submit`, (): void => {

  let dummyMessage: string;
  let dummyTopicId: string;
  let dummyUserId: string;

  beforeEach((): void => {
    dummyMessage = 'dummyMessage';
    dummyTopicId = 'dummyTopicId';
    dummyUserId = 'dummyUserId';
  });

  it(`returns a pullRequests SUBMIT action containing the passed arguments`, (): void => {
    const expectedAction: a.SubmitAction = {
      type: a.SUBMIT,
      payload: {
        message: dummyMessage,
        topicId: dummyTopicId,
        userId: dummyUserId,
      },
    };
    const actualAction = actions.submit(dummyMessage, dummyTopicId, dummyUserId);

    expect(actualAction).toStrictEqual(expectedAction);
  });

});
