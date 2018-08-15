// @flow

import _ from 'lodash';
import { select } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

import { UnsupportedOperationError } from 'errors';
import { dummyUserData } from 'lib/testResources';

import actions from '../../actions';
import * as m from '../../model';
import selectors from '../../selectors';

import { sagas } from '..';

describe(`removeTopicId`, (): void => {

  let dummyTopicId: string;
  let dummyTopicIds: $ReadOnlyArray<string>;
  let dummyUser: m.User;

  beforeEach((): void => {
    dummyTopicId = 'dummyNewTopicId';
    dummyTopicIds = [dummyTopicId, 'existingTopicId2'];
    dummyUser = { ...dummyUserData.user, topicIds: dummyTopicIds };
  });

  it(`puts an EDIT_TOPIC_IDS_IN_STATE action containing the user's previous topic ids with the passed topicId removed from it`, (): void => {
    const dummyAction = actions.removeTopicId(dummyUser.id, dummyTopicId);

    return expectSaga(sagas.removeTopicId, dummyAction)
      .provide([
        [select(selectors.getById, { id: dummyUser.id }), dummyUser],
      ])
      .put(actions.editTopicIdsInState(dummyUser.id, _.without(dummyTopicIds, dummyTopicId)))
      .run();
  });

  it(`throws an UnsupportedOperationError, when attempting to remove a non-existing topicId`, async (): Promise<mixed> => {
    const dummyAction = actions.removeTopicId(dummyUser.id, 'InvalidTopicId');

    // Suppress console.error from redux-saga $FlowFixMe
    console.error = jest.fn();
    await expect(
      expectSaga(sagas.removeTopicId, dummyAction)
        .provide([
          [select(selectors.getById, { id: dummyUser.id }), dummyUser],
        ])
        .run(),
    ).rejects.toBeInstanceOf(UnsupportedOperationError);
  });

});
