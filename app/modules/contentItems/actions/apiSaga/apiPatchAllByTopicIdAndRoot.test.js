// @flow

import * as a from '../../actionTypes';

import actions from '..';

describe(`apiPatchAllByTopicIdAndRoot`, (): void => {

  it(`returns an API_PATCH_ALL_BY_TOPIC_ID_AND_ROOT action containing the passed arguments`, (): void => {
    const dummyTopicId = 'abcdefghij';
    const dummyRootContentItemId = 'klmnopqrstuvwxyzabcd';
    const dummyMessage = 'This is a dummy message';
    const expectedAction: a.ApiPatchAllByTopicIdAndRootAction = {
      type: a.API_PATCH_ALL_BY_TOPIC_ID_AND_ROOT,
      payload: {
        topicId: dummyTopicId,
        rootContentItemId: dummyRootContentItemId,
        message: dummyMessage,
      },
    };
    const actualAction = actions.apiPatchAllByTopicIdAndRoot(dummyTopicId, dummyRootContentItemId, dummyMessage);

    expect(actualAction).toStrictEqual(expectedAction);
  });

});
