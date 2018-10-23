// @flow

import validate from 'lib/validate';

import * as a from '../../actionTypes';

import actions from '..';

describe(`apiPost`, (): void => {

  let dummyMessage: string;
  let dummyTopicId: string;
  let dummyUserId: string;

  beforeEach((): void => {
    dummyMessage = 'dummyMessage';
    dummyTopicId = 'dummyTopicId';
    dummyUserId = 'dummyUserId';
  });

  it(`returns a pullRequests API_POST action containing the passed arguments`, (): void => {
    const expectedAction: a.ApiPostAction = {
      type: a.API_POST,
      payload: {
        message: dummyMessage,
        topicId: dummyTopicId,
        userId: dummyUserId,
      },
    };
    const actualAction = actions.apiPost(dummyMessage, dummyTopicId, dummyUserId);

    expect(actualAction).toStrictEqual(expectedAction);
  });

  it(`calls validate.stringProps with the correct arguments and passes the result into the action`, (): void => {
    const dummyValidatedProps = { dummy: 'props' };
    validate.stringProps = jest.fn((): any => dummyValidatedProps);
    const actualAction = actions.apiPost(dummyMessage, dummyTopicId, dummyUserId);

    expect(validate.stringProps).toHaveBeenCalledWith(
      ['message', 'topicId', 'userId'],
      [],
      {
        message: dummyMessage,
        topicId: dummyTopicId,
        userId: dummyUserId,
      },
    );
    expect(actualAction.payload).toStrictEqual(dummyValidatedProps);
  });

});
