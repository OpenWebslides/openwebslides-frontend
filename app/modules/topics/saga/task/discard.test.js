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

describe(`discard`, (): void => {

  let dummyTopic: m.Topic;
  let dummyDirtyTopic: m.Topic;

  beforeEach((): void => {
    dummyTopic = { ...dummyTopicData.topic };
    dummyDirtyTopic = { ...dummyTopicData.topic, isDirty: true };
  });

  it(`puts a content items REMOVE_FROM_STATE, a topics REMOVE_FROM_STATE action and a topics FETCH action`, (): void => {
    const dummyAction = actions.discard(dummyDirtyTopic.id);

    return expectSaga(sagas.discard, dummyAction)
      .provide([
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.FETCH) ? null : next();
        })],
        [select(selectors.getById, { id: dummyDirtyTopic.id }), dummyDirtyTopic],
      ])
      .put(contentItems.actions.removeFromState(dummyDirtyTopic.rootContentItemId))
      .put(actions.removeFromState(dummyDirtyTopic.id))
      .call(asyncRequests.lib.putAndReturn, actions.fetch(dummyDirtyTopic.id))
      .run();
  });

  it(`throws an ObjectNotFoundError, when the topic for the passed id could not be found`, async (): Promise<mixed> => {
    const dummyAction = actions.discard(dummyTopic.id);

    // Suppress console.error from redux-saga $FlowFixMe
    console.error = jest.fn();
    await expect(
      expectSaga(sagas.discard, dummyAction)
        .provide([
          [select(selectors.getById, { id: dummyTopic.id }), null],
        ])
        .run(),
    ).rejects.toBeInstanceOf(ObjectNotFoundError);
  });

});
