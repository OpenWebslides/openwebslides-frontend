// @flow

import { select } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

import { ObjectNotFoundError } from 'errors';
import { dummyTopicData } from 'lib/testResources';
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

  it(`gets the topic rootContentItemId from the state and puts a contentItems API_PATCH_ALL_BY_TOPIC_ID_AND_ROOT action`, (): void => {
    const dummyAction = actions.patchWithContent(dummyTopic.id);

    return expectSaga(sagas.patchWithContent, dummyAction)
      .provide([
        [select(selectors.getById, { id: dummyTopic.id }), dummyTopic],
      ])
      .put(contentItems.actions.apiPatchAllByTopicIdAndRoot(dummyTopic.id, dummyTopic.rootContentItemId))
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
        ])
        .run(),
    ).rejects.toBeInstanceOf(ObjectNotFoundError);
  });

});
