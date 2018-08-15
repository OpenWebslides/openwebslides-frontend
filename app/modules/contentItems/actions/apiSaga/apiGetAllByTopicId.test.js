// @flow

import * as a from '../../actionTypes';

import actions from '..';

describe(`apiGetAllByTopicId`, (): void => {

  it(`returns an API_GET_ALL_BY_TOPIC_ID action containing the passed arguments`, (): void => {
    const dummyTopicId = 'abcdefghij';
    const expectedAction: a.ApiGetAllByTopicIdAction = {
      type: a.API_GET_ALL_BY_TOPIC_ID,
      payload: {
        topicId: dummyTopicId,
      },
    };
    const actualAction = actions.apiGetAllByTopicId(dummyTopicId);

    expect(actualAction).toEqual(expectedAction);
  });

});
