// @flow

import { call, select } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

import api from 'api';
import { UnsupportedOperationError } from 'errors';
import { dummyContentItemData as dummyData } from 'lib/testResources';
import platform from 'modules/platform';

import actions from '../../actions';
import * as m from '../../model';

import { sagas } from '..';

describe(`apiPatchAllByTopicIdAndRoot`, (): void => {

  let dummyParagraph: m.ParagraphContentItem;
  let dummyHeading: m.HeadingContentItem;
  let dummyRoot: m.RootContentItem;
  let dummyContentItemsState: m.ContentItemsState;
  let dummyState: any;
  let dummyTopicId: string;
  let dummyTopicContentItems: $ReadOnlyArray<m.ContentItem>;
  let dummyMessage: string;
  let dummyToken: string;

  beforeEach((): void => {
    dummyParagraph = { ...dummyData.paragraphContentItem };
    dummyHeading = { ...dummyData.headingContentItem, subItemIds: [dummyParagraph.id] };
    dummyRoot = { ...dummyData.rootContentItem, childItemIds: [dummyHeading.id] };
    dummyContentItemsState = {
      byId: {
        [dummyRoot.id]: dummyRoot,
        [dummyHeading.id]: dummyHeading,
        [dummyParagraph.id]: dummyParagraph,
        [dummyData.rootContentItem2.id]: { ...dummyData.rootContentItem2 },
      },
    };
    dummyState = { modules: { contentItems: dummyContentItemsState } };
    dummyTopicId = 'dummyTopicId';
    // $FlowFixMe couldn't decide which case to select; probable bug
    dummyTopicContentItems = [dummyRoot, dummyHeading, dummyParagraph];
    dummyMessage = 'This is a dummy message';
    dummyToken = 'foobarToken';
  });

  it(`creates an array of topic contentItems and sends a PATCH request containing these contentItems to the topics endpoint`, (): void => {
    const dummyAction = actions.apiPatchAllByTopicIdAndRoot(dummyTopicId, dummyRoot.id, dummyMessage);
    const dummyApiResponse = { status: 204 };

    return expectSaga(sagas.apiPatchAllByTopicIdAndRoot, dummyAction)
      .withState(dummyState)
      .provide([
        [select(platform.selectors.getUserAuth), { userId: 'dummyId', apiToken: dummyToken }],
        [call(api.topics.patchContent, dummyTopicId, dummyTopicContentItems, dummyMessage, dummyToken), dummyApiResponse],
      ])
      .call(api.topics.patchContent, dummyTopicId, dummyTopicContentItems, dummyMessage, dummyToken)
      .run();
  });

  it(`throws an UnsupportedOperationError, when there is no currently signed in user`, async (): Promise<void> => {
    const dummyAction = actions.apiPatchAllByTopicIdAndRoot(dummyTopicId, dummyRoot.id, dummyMessage);
    const dummyApiResponse = { status: 204 };

    // Suppress console.error from redux-saga $FlowFixMe
    console.error = jest.fn();
    await expect(
      expectSaga(sagas.apiPatchAllByTopicIdAndRoot, dummyAction)
        .withState(dummyState)
        .provide([
          [select(platform.selectors.getUserAuth), null],
          [call(api.topics.patchContent, dummyTopicId, dummyTopicContentItems, dummyMessage, dummyToken), dummyApiResponse],
        ])
        .run(),
    ).rejects.toBeInstanceOf(UnsupportedOperationError);
  });

});
