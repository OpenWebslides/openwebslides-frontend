// @flow

import * as a from '../../actionTypes';

import actions from '..';

describe(`apiPatchAllByTopicIdAndRoot`, (): void => {

  it(`returns an API_PATCH_ALL_BY_TOPIC_ID_AND_ROOT action containing the passed arguments`, (): void => {
    const dummyTopicId = 'abcdefghij';
    const dummyRootContentItemId = 'klmnopqrstuvwxyzabcd';
    const expectedAction: a.ApiPatchAllByTopicIdAndRootAction = {
      type: a.API_PATCH_ALL_BY_TOPIC_ID_AND_ROOT,
      payload: {
        topicId: dummyTopicId,
        rootContentItemId: dummyRootContentItemId,
      },
    };
    const actualAction = actions.apiPatchAllByTopicIdAndRoot(dummyTopicId, dummyRootContentItemId);

    expect(actualAction).toStrictEqual(expectedAction);
  });

});
