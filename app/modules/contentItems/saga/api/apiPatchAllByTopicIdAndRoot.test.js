// @flow

import _ from 'lodash';
import { call, select } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

import api from 'api';
import { UnsupportedOperationError } from 'errors';
import { dummyContentItemData as dummyData } from 'lib/testResources';
import apiRequestsStatus from 'modules/apiRequestsStatus';
import platform from 'modules/platform';

import actions from '../../actions';
import * as a from '../../actionTypes';
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
    dummyToken = 'foobarToken';
  });

  it(`creates an array of topic contentItems and sends a PATCH request containing these contentItems to the topics endpoint`, (): void => {
    const dummyAction = actions.apiPatchAllByTopicIdAndRoot(dummyTopicId, dummyRoot.id);
    const dummyApiResponse = { status: 204 };

    return expectSaga(sagas.apiPatchAllByTopicIdAndRoot, dummyAction)
      .withState(dummyState)
      .provide([
        [select(platform.selectors.getUserAuth), { userId: 'dummyId', apiToken: dummyToken }],
        [call(api.topics.patchContent, dummyTopicId, dummyTopicContentItems, dummyToken), dummyApiResponse],
      ])
      .call(api.topics.patchContent, dummyTopicId, dummyTopicContentItems, dummyToken)
      .run();
  });

  it(`sets its request status to PENDING and then sets its request status to SUCCESS, when the saga completes without errors`, (): void => {
    const dummyAction = actions.apiPatchAllByTopicIdAndRoot(dummyTopicId, dummyRoot.id);
    const dummyApiResponse = { status: 204 };

    return expectSaga(sagas.apiPatchAllByTopicIdAndRoot, dummyAction)
      .withState(dummyState)
      .provide([
        [select(platform.selectors.getUserAuth), { userId: 'dummyId', apiToken: dummyToken }],
        [call(api.topics.patchContent, dummyTopicId, dummyTopicContentItems, dummyToken), dummyApiResponse],
      ])
      .put(apiRequestsStatus.actions.setPending(a.API_PATCH_ALL_BY_TOPIC_ID_AND_ROOT))
      .put(apiRequestsStatus.actions.setSuccess(a.API_PATCH_ALL_BY_TOPIC_ID_AND_ROOT))
      .run();
  });

  it(`sets its request status to PENDING and then sets its request status to FAILURE, when the api call fails`, (): void => {
    const dummyAction = actions.apiPatchAllByTopicIdAndRoot(dummyTopicId, dummyRoot.id);
    const dummyError = new Error('Boo!');

    return expectSaga(sagas.apiPatchAllByTopicIdAndRoot, dummyAction)
      .withState(dummyState)
      .provide({
        select({ selector }: any, next: any): any {
          if (selector === platform.selectors.getUserAuth) return { userId: 'dummyId', apiToken: dummyToken };
          else return next();
        },
        call({ fn }: any, next: any): any {
          if (fn === api.topics.patchContent) throw dummyError;
          else return next();
        },
      })
      .put(apiRequestsStatus.actions.setPending(a.API_PATCH_ALL_BY_TOPIC_ID_AND_ROOT))
      .put(apiRequestsStatus.actions.setFailure(a.API_PATCH_ALL_BY_TOPIC_ID_AND_ROOT, dummyError))
      .run();
  });

  it(`sets its request status to FAILURE, when there is no currently signed in user`, async (): Promise<mixed> => {
    const dummyAction = actions.apiPatchAllByTopicIdAndRoot(dummyTopicId, dummyRoot.id);
    const dummyApiResponse = { status: 204 };

    const result = await expectSaga(sagas.apiPatchAllByTopicIdAndRoot, dummyAction)
      .withState(dummyState)
      .provide([
        [select(platform.selectors.getUserAuth), null],
        [call(api.topics.patchContent, dummyTopicId, dummyTopicContentItems, dummyToken), dummyApiResponse],
      ])
      .put(apiRequestsStatus.actions.setPending(a.API_PATCH_ALL_BY_TOPIC_ID_AND_ROOT))
      .put.actionType(apiRequestsStatus.actions.setFailure(a.API_PATCH_ALL_BY_TOPIC_ID_AND_ROOT, new Error()).type)
      .run();

    expect(_.last(result.allEffects).PUT.action.payload.error).toBeInstanceOf(UnsupportedOperationError);
  });

});
