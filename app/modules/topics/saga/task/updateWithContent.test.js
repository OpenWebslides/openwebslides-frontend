// @flow

import { select } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { dynamic } from 'redux-saga-test-plan/providers';

import { ObjectNotFoundError } from 'errors';
import asyncRequests from 'modules/asyncRequests';
import { dummyTopicData } from 'lib/testResources';
import contentItems from 'modules/contentItems';

import actions from '../../actions';
import * as a from '../../actionTypes';
import * as m from '../../model';
import selectors from '../../selectors';

import { sagas } from '..';

describe(`updateWithContent`, (): void => {

  let dummyTopic: m.Topic;
  let dummyTitle: string;
  let dummyDescription: string;

  beforeEach((): void => {
    dummyTopic = { ...dummyTopicData.topic };
    dummyTitle = 'dummyTitle';
    dummyDescription = 'dummyDescription';
  });

  it(`puts a topics API_PATCH action, a API_PATCH_ALL_BY_TOPIC_ID_AND_ROOT, a FETCH action, and a SET_DIRTY_IN_STATE action when title or description are specified`, (): void => {
    const dummyAction = actions.updateWithContent(dummyTopic.id, dummyTitle, dummyDescription);

    return expectSaga(sagas.updateWithContent, dummyAction)
      .provide([
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.API_PATCH) ? null : next();
        })],
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.FETCH) ? null : next();
        })],
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === contentItems.actions.apiPatchAllByTopicIdAndRoot('dummy', 'dummy').type) ? null : next();
        })],
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.FETCH) ? null : next();
        })],
        [select(selectors.getById, { id: dummyTopic.id }), dummyTopic],
      ])
      .call(asyncRequests.lib.putAndReturn, actions.apiPatch(dummyTopic.id, dummyTitle, dummyDescription))
      .call(asyncRequests.lib.putAndReturn, actions.fetch(dummyTopic.id))
      .call(asyncRequests.lib.putAndReturn, contentItems.actions.apiPatchAllByTopicIdAndRoot(dummyTopic.id, dummyTopic.rootContentItemId))
      .put(actions.setDirtyInState(dummyTopic.id, false))
      .run();
  });

  it(`puts a topics API_PATCH_ALL_BY_TOPIC_ID_AND_ROOT action, and a SET_DIRTY_IN_STATE action when neither title nor description are specified`, (): void => {
    const dummyAction = actions.updateWithContent(dummyTopic.id);

    return expectSaga(sagas.updateWithContent, dummyAction)
      .provide([
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === contentItems.actions.apiPatchAllByTopicIdAndRoot('dummy', 'dummy').type) ? null : next();
        })],
        [select(selectors.getById, { id: dummyTopic.id }), dummyTopic],
      ])
      .call(asyncRequests.lib.putAndReturn, contentItems.actions.apiPatchAllByTopicIdAndRoot(dummyTopic.id, dummyTopic.rootContentItemId))
      .put(actions.setDirtyInState(dummyTopic.id, false))
      .run();
  });

  it(`throws an ObjectNotFoundError, when the topic for the passed id could not be found`, async (): Promise<mixed> => {
    const dummyAction = actions.updateWithContent(dummyTopic.id);

    // Suppress console.error from redux-saga $FlowFixMe
    console.error = jest.fn();
    await expect(
      expectSaga(sagas.updateWithContent, dummyAction)
        .provide([
          [select(selectors.getById, { id: dummyTopic.id }), null],
        ])
        .run(),
    ).rejects.toBeInstanceOf(ObjectNotFoundError);
  });

});
