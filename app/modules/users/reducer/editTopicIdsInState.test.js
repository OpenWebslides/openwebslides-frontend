// @flow

import { ObjectNotFoundError } from 'errors';
import { dummyUserData } from 'lib/testResources';

import * as a from '../actionTypes';
import * as m from '../model';

import reducer from '.';

describe(`editTopicIdsInStateAction`, (): void => {

  let dummyUser1: m.User;
  let dummyUser2: m.User;
  let dummyTopicIds: $ReadOnlyArray<string>;

  beforeEach((): void => {
    dummyUser1 = { ...dummyUserData.user };
    dummyUser2 = { ...dummyUserData.user2 };
    dummyTopicIds = ['dummyTopic1Id', 'dummyTopic2.id'];
  });

  it(`replaces the topicIds in the state for the user with the passed id`, (): void => {
    const prevState: m.UsersState = {
      byId: {
        [dummyUser1.id]: { ...dummyUser1, topicIds: ['oldTopic1Id', 'oldTopic2Id'] },
        [dummyUser2.id]: dummyUser2,
      },
    };
    const editTopicIdsInStateAction: a.EditTopicIdsInStateAction = {
      type: a.EDIT_TOPIC_IDS_IN_STATE,
      payload: {
        id: dummyUser1.id,
        topicIds: dummyTopicIds,
      },
    };
    const nextState: m.UsersState = {
      byId: {
        [dummyUser1.id]: { ...dummyUser1, topicIds: dummyTopicIds },
        [dummyUser2.id]: dummyUser2,
      },
    };
    const resultState = reducer(prevState, editTopicIdsInStateAction);

    expect(resultState).toStrictEqual(nextState);
    expect(resultState).not.toBe(prevState);
    expect(resultState.byId).not.toBe(prevState.byId);
    expect(resultState.byId[dummyUser1.id]).not.toBe(prevState.byId[dummyUser1.id]);
    expect(resultState.byId[dummyUser1.id].topicIds).not.toBe(prevState.byId[dummyUser1.id].topicIds);
  });

  it(`returns the state object unchanged, when the passed topicIds are identical to the existing ones`, (): void => {
    const prevState: m.UsersState = {
      byId: {
        [dummyUser1.id]: { ...dummyUser1, topicIds: [...dummyTopicIds] },
        [dummyUser2.id]: dummyUser2,
      },
    };
    const editTopicIdsInStateAction: a.EditTopicIdsInStateAction = {
      type: a.EDIT_TOPIC_IDS_IN_STATE,
      payload: {
        id: dummyUser1.id,
        topicIds: dummyTopicIds,
      },
    };
    const resultState = reducer(prevState, editTopicIdsInStateAction);

    expect(resultState).toStrictEqual(prevState);
    expect(resultState).toBe(prevState);
    expect(resultState.byId).toBe(prevState.byId);
    expect(resultState.byId[dummyUser1.id]).toBe(prevState.byId[dummyUser1.id]);
    expect(resultState.byId[dummyUser1.id].topicIds).toBe(prevState.byId[dummyUser1.id].topicIds);
  });

  it(`throws an ObjectNotFoundError, when the passed id is invalid`, (): void => {
    const prevState: m.UsersState = {
      byId: {
        [dummyUser1.id]: { ...dummyUser1, topicIds: ['oldTopic1Id', 'oldTopic2Id'] },
        [dummyUser2.id]: dummyUser2,
      },
    };
    const editTopicIdsInStateAction: a.EditTopicIdsInStateAction = {
      type: a.EDIT_TOPIC_IDS_IN_STATE,
      payload: {
        id: 'InvalidId',
        topicIds: dummyTopicIds,
      },
    };

    expect((): void => {
      reducer(prevState, editTopicIdsInStateAction);
    }).toThrow(ObjectNotFoundError);
  });

});
