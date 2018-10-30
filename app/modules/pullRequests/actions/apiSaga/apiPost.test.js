// @flow

import validate from 'lib/validate';

import * as a from '../../actionTypes';

import actions from '..';

describe(`apiPost`, (): void => {

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

  it(`returns a pullRequests API_POST action containing the passed arguments`, (): void => {
    const expectedAction: a.ApiPostAction = {
      type: a.API_POST,
      payload: {
        message: dummyMessage,
        sourceTopicId: dummySourceTopicId,
        targetTopicId: dummyTargetTopicId,
        userId: dummyUserId,
      },
    };
    const actualAction = actions.apiPost(dummyMessage, dummySourceTopicId, dummyTargetTopicId, dummyUserId);

    expect(actualAction).toStrictEqual(expectedAction);
  });

  it(`calls validate.stringProps with the correct arguments and passes the result into the action`, (): void => {
    const dummyValidatedProps = { dummy: 'props' };
    validate.stringProps = jest.fn((): any => dummyValidatedProps);
    const actualAction = actions.apiPost(dummyMessage, dummySourceTopicId, dummyTargetTopicId, dummyUserId);

    expect(validate.stringProps).toHaveBeenCalledWith(
      ['message'],
      [],
      {
        message: dummyMessage,
        sourceTopicId: dummySourceTopicId,
        targetTopicId: dummyTargetTopicId,
        userId: dummyUserId,
      },
    );
    expect(actualAction.payload).toStrictEqual(dummyValidatedProps);
  });

});
