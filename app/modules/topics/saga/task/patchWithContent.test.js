// @flow

import { select } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { dynamic } from 'redux-saga-test-plan/providers';

import { ObjectNotFoundError } from 'errors';
import { dummyTopicData } from 'lib/testResources';
import asyncRequests from 'modules/asyncRequests';
import contentItems from 'modules/contentItems';

import actions from '../../actions';
import * as m from '../../model';
import selectors from '../../selectors';

import { sagas } from '..';

describe(`patchWithContent`, (): void => {

  let dummyTopic: m.Topic;

  beforeEach((): void => {
    dummyTopic = { ...dummyTopicData.topic };
  });

  it(`gets the topic rootContentItemId from the state and puts a contentItems API_PATCH_ALL_BY_TOPIC_ID_AND_ROOT action, and a SET_DIRTY_IN_STATE action`, (): void => {
    const dummyAction = actions.patchWithContent(dummyTopic.id);

    return expectSaga(sagas.patchWithContent, dummyAction)
      .provide([
        [select(selectors.getById, { id: dummyTopic.id }), dummyTopic],
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === contentItems.actions.apiPatchAllByTopicIdAndRoot('dummy', 'dummy').type) ? null : next();
        })],
      ])
      .call(asyncRequests.lib.putAndReturn, contentItems.actions.apiPatchAllByTopicIdAndRoot(dummyTopic.id, dummyTopic.rootContentItemId))
      .put(actions.setDirtyInState(dummyTopic.id, false))
      .run();
  });

  it(`throws an ObjectNotFoundError, when the topic for the passed id could not be found`, async (): Promise<mixed> => {
    const dummyAction = actions.patchWithContent(dummyTopic.id);

    // Suppress console.error from redux-saga $FlowFixMe
    console.error = jest.fn();
    await expect(
      expectSaga(sagas.patchWithContent, dummyAction)
        .provide([
          [select(selectors.getById, { id: dummyTopic.id }), null],
          [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
            return (action.type === contentItems.actions.apiPatchAllByTopicIdAndRoot('dummy', 'dummy').type) ? null : next();
          })],
        ])
        .run(),
    ).rejects.toBeInstanceOf(ObjectNotFoundError);
  });

});
