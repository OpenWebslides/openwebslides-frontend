// @flow

import * as a from '../../actionTypes';

import actions from '..';

describe(`editTopicIdsInState`, (): void => {

  let dummyUserId: string;
  let dummyTopicIds: $ReadOnlyArray<string>;

  beforeEach((): void => {
    dummyUserId = 'dummyUserId';
    dummyTopicIds = ['dummyTopic1Id, dummyTopic2Id'];
  });

  it(`returns a users EDIT_TOPIC_IDS_IN_STATE action containing the passed arguments`, (): void => {
    const expectedAction: a.EditTopicIdsInStateAction = {
      type: a.EDIT_TOPIC_IDS_IN_STATE,
      payload: {
        id: dummyUserId,
        topicIds: dummyTopicIds,
      },
    };
    const actualAction = actions.editTopicIdsInState(dummyUserId, dummyTopicIds);

    expect(actualAction).toEqual(expectedAction);
  });

});
