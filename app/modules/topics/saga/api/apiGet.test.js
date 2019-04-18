// @flow

import _ from 'lodash';
import { expectSaga } from 'redux-saga-test-plan';
import { call, select } from 'redux-saga/effects';

import api from 'api';
import { UnexpectedHttpResponseError } from 'errors';
import platform from 'modules/platform';

import actions from '../../actions';
import * as m from '../../model';

import { apiAccessTypesToAccessTypesMap } from './apiGet';

import { sagas } from '..';

describe(`apiGet`, (): void => {

  let dummyId: string;
  let dummyTitle: string;
  let dummyDescription: string;
  let dummyAccess: m.AccessType;
  let dummyUserId: string;
  let dummyRootContentId: string;
  let dummyTimestamp: string;
  let dummyUpstreamTopicId: string;
  let dummyForkedTopicId1: string;
  let dummyForkedTopicId2: string;
  let dummyPullRequestId1: string;
  let dummyPullRequestId2: string;
  let dummyCollaboratorId1: string;
  let dummyCollaboratorId2: string;
  let dummyAccessToken: string;

  beforeEach((): void => {
    dummyId = 'dummyId';
    dummyTitle = 'The Title';
    dummyDescription = 'The description.';
    dummyAccess = m.accessTypes.PUBLIC;
    dummyUserId = 'dummyUserId';
    dummyRootContentId = 'dummyRootContentItemId';
    dummyTimestamp = '1546596490';
    dummyUpstreamTopicId = 'dummyUpstreamTopicId';
    dummyForkedTopicId1 = 'dummyForkedTopicId1';
    dummyForkedTopicId2 = 'dummyForkedTopicId2';
    dummyPullRequestId1 = 'dummyPullRequestId1';
    dummyPullRequestId2 = 'dummyPullRequestId2';
    dummyCollaboratorId1 = 'dummyCollaboratorId1';
    dummyCollaboratorId2 = 'dummyCollaboratorId2';
    dummyAccessToken = 'dummyAccessToken';
  });

  it(`sends an unauthorized GET request for the passed id to the topics endpoint, processes the response and puts the topic in the state when there is no currently signed in user`, (): void => {
    const dummyAction = actions.apiGet(dummyId);
    const dummyApiResponse = {
      status: 200,
      body: {
        data: {
          attributes: {
            title: dummyTitle,
            description: dummyDescription,
            access: _.findKey(apiAccessTypesToAccessTypesMap, (topicType: string): boolean => topicType === dummyAccess),
            rootContentItemId: dummyRootContentId,
            hasOpenPullRequest: false,
          },
          relationships: {
            user: { data: { id: dummyUserId } },
            upstream: { data: null },
            forks: { data: [] },
            incomingPullRequests: { data: [] },
            outgoingPullRequests: { data: [] },
            collaborators: { data: [] },
          },
          meta: {
            updatedAt: dummyTimestamp,
          },
        },
      },
    };

    return expectSaga(sagas.apiGet, dummyAction)
      .provide([
        [select(platform.selectors.getUserAuth), null],
        [call(api.topics.get, dummyId, null), dummyApiResponse],
      ])
      .call(api.topics.get, dummyId, null)
      .put(actions.setMultipleInState([{ id: dummyId, title: dummyTitle, description: dummyDescription, access: dummyAccess, userId: dummyUserId, rootContentItemId: dummyRootContentId, hasOpenPullRequest: false, timestamp: Number(dummyTimestamp) * 1000, upstreamTopicId: null, forkedTopicIds: [], incomingPullRequestIds: [], outgoingPullRequestIds: [], collaboratorUserIds: [], isContentFetched: false, isDirty: false }]))
      .run();
  });

  it(`sends an authorized GET request for the passed id to the topics endpoint, processes the response and puts the topic in the state when there is a currently signed in user`, (): void => {
    const dummyAction = actions.apiGet(dummyId);
    const dummyApiResponse = {
      status: 200,
      body: {
        data: {
          attributes: {
            title: dummyTitle,
            description: dummyDescription,
            access: _.findKey(apiAccessTypesToAccessTypesMap, (topicType: string): boolean => topicType === dummyAccess),
            rootContentItemId: dummyRootContentId,
            hasOpenPullRequest: false,
          },
          relationships: {
            user: { data: { id: dummyUserId } },
            upstream: { data: null },
            forks: { data: [] },
            incomingPullRequests: { data: [] },
            outgoingPullRequests: { data: [] },
            collaborators: { data: [] },
          },
          meta: {
            updatedAt: dummyTimestamp,
          },
        },
      },
    };

    return expectSaga(sagas.apiGet, dummyAction)
      .provide([
        [select(platform.selectors.getUserAuth), { accessToken: dummyAccessToken }],
        [call(api.topics.get, dummyId, dummyAccessToken), dummyApiResponse],
      ])
      .call(api.topics.get, dummyId, dummyAccessToken)
      .put(actions.setMultipleInState([{ id: dummyId, title: dummyTitle, description: dummyDescription, access: dummyAccess, userId: dummyUserId, rootContentItemId: dummyRootContentId, hasOpenPullRequest: false, timestamp: Number(dummyTimestamp) * 1000, upstreamTopicId: null, forkedTopicIds: [], incomingPullRequestIds: [], outgoingPullRequestIds: [], collaboratorUserIds: [], isContentFetched: false, isDirty: false }]))
      .run();
  });

  it(`sends a GET request for the passed id to the topics endpoint, processes the response and puts the topic in the state when there is a upstream`, (): void => {
    const dummyAction = actions.apiGet(dummyId);
    const dummyApiResponse = {
      status: 200,
      body: {
        data: {
          attributes: {
            title: dummyTitle,
            description: dummyDescription,
            access: _.findKey(apiAccessTypesToAccessTypesMap, (topicType: string): boolean => topicType === dummyAccess),
            rootContentItemId: dummyRootContentId,
            hasOpenPullRequest: false,
          },
          relationships: {
            user: { data: { id: dummyUserId } },
            upstream: { data: { id: dummyUpstreamTopicId } },
            forks: { data: [] },
            incomingPullRequests: { data: [] },
            outgoingPullRequests: { data: [] },
            collaborators: { data: [] },
          },
          meta: {
            updatedAt: dummyTimestamp,
          },
        },
      },
    };

    return expectSaga(sagas.apiGet, dummyAction)
      .provide([
        [select(platform.selectors.getUserAuth), null],
        [call(api.topics.get, dummyId, null), dummyApiResponse],
      ])
      .call(api.topics.get, dummyId, null)
      .put(actions.setMultipleInState([{ id: dummyId, title: dummyTitle, description: dummyDescription, access: dummyAccess, userId: dummyUserId, rootContentItemId: dummyRootContentId, hasOpenPullRequest: false, timestamp: Number(dummyTimestamp) * 1000, upstreamTopicId: dummyUpstreamTopicId, forkedTopicIds: [], incomingPullRequestIds: [], outgoingPullRequestIds: [], collaboratorUserIds: [], isContentFetched: false, isDirty: false }]))
      .run();
  });

  it(`sends a GET request for the passed id to the topics endpoint, processes the response and puts the topic in the state when there are forks`, (): void => {
    const dummyAction = actions.apiGet(dummyId);
    const dummyApiResponse = {
      status: 200,
      body: {
        data: {
          attributes: {
            title: dummyTitle,
            description: dummyDescription,
            access: _.findKey(apiAccessTypesToAccessTypesMap, (topicType: string): boolean => topicType === dummyAccess),
            rootContentItemId: dummyRootContentId,
            hasOpenPullRequest: false,
          },
          relationships: {
            user: { data: { id: dummyUserId } },
            upstream: { data: null },
            forks: { data: [
              { type: 'topics', id: dummyForkedTopicId1 },
              { type: 'topics', id: dummyForkedTopicId2 },
            ] },
            incomingPullRequests: { data: [] },
            outgoingPullRequests: { data: [] },
            collaborators: { data: [] },
          },
          meta: {
            updatedAt: dummyTimestamp,
          },
        },
      },
    };

    return expectSaga(sagas.apiGet, dummyAction)
      .provide([
        [select(platform.selectors.getUserAuth), null],
        [call(api.topics.get, dummyId, null), dummyApiResponse],
      ])
      .call(api.topics.get, dummyId, null)
      .put(actions.setMultipleInState([{ id: dummyId, title: dummyTitle, description: dummyDescription, access: dummyAccess, userId: dummyUserId, rootContentItemId: dummyRootContentId, hasOpenPullRequest: false, timestamp: Number(dummyTimestamp) * 1000, upstreamTopicId: null, forkedTopicIds: [dummyForkedTopicId1, dummyForkedTopicId2], incomingPullRequestIds: [], outgoingPullRequestIds: [], collaboratorUserIds: [], isContentFetched: false, isDirty: false }]))
      .run();
  });

  it(`sends a GET request for the passed id to the topics endpoint, processes the response and puts the topic in the state when there are incoming pull requests`, (): void => {
    const dummyAction = actions.apiGet(dummyId);
    const dummyApiResponse = {
      status: 200,
      body: {
        data: {
          attributes: {
            title: dummyTitle,
            description: dummyDescription,
            access: _.findKey(apiAccessTypesToAccessTypesMap, (topicType: string): boolean => topicType === dummyAccess),
            rootContentItemId: dummyRootContentId,
            hasOpenPullRequest: false,
          },
          relationships: {
            user: { data: { id: dummyUserId } },
            upstream: { data: null },
            forks: { data: [] },
            incomingPullRequests: { data: [
              { type: 'pullRequests', id: dummyPullRequestId1 },
              { type: 'pullRequests', id: dummyPullRequestId2 },
            ] },
            outgoingPullRequests: { data: [] },
            collaborators: { data: [] },
          },
          meta: {
            updatedAt: dummyTimestamp,
          },
        },
      },
    };

    return expectSaga(sagas.apiGet, dummyAction)
      .provide([
        [select(platform.selectors.getUserAuth), null],
        [call(api.topics.get, dummyId, null), dummyApiResponse],
      ])
      .call(api.topics.get, dummyId, null)
      .put(actions.setMultipleInState([{ id: dummyId, title: dummyTitle, description: dummyDescription, access: dummyAccess, userId: dummyUserId, rootContentItemId: dummyRootContentId, hasOpenPullRequest: false, timestamp: Number(dummyTimestamp) * 1000, upstreamTopicId: null, forkedTopicIds: [], incomingPullRequestIds: [dummyPullRequestId1, dummyPullRequestId2], outgoingPullRequestIds: [], collaboratorUserIds: [], isContentFetched: false, isDirty: false }]))
      .run();
  });

  it(`sends a GET request for the passed id to the topics endpoint, processes the response and puts the topic in the state when there are outgoing pull requests`, (): void => {
    const dummyAction = actions.apiGet(dummyId);
    const dummyApiResponse = {
      status: 200,
      body: {
        data: {
          attributes: {
            title: dummyTitle,
            description: dummyDescription,
            access: _.findKey(apiAccessTypesToAccessTypesMap, (topicType: string): boolean => topicType === dummyAccess),
            rootContentItemId: dummyRootContentId,
            hasOpenPullRequest: false,
          },
          relationships: {
            user: { data: { id: dummyUserId } },
            upstream: { data: null },
            forks: { data: [] },
            incomingPullRequests: { data: [] },
            outgoingPullRequests: { data: [
              { type: 'pullRequests', id: dummyPullRequestId2 },
              { type: 'pullRequests', id: dummyPullRequestId1 },
            ] },
            collaborators: { data: [] },
          },
          meta: {
            updatedAt: dummyTimestamp,
          },
        },
      },
    };

    return expectSaga(sagas.apiGet, dummyAction)
      .provide([
        [select(platform.selectors.getUserAuth), null],
        [call(api.topics.get, dummyId, null), dummyApiResponse],
      ])
      .call(api.topics.get, dummyId, null)
      .put(actions.setMultipleInState([{ id: dummyId, title: dummyTitle, description: dummyDescription, access: dummyAccess, userId: dummyUserId, rootContentItemId: dummyRootContentId, hasOpenPullRequest: false, timestamp: Number(dummyTimestamp) * 1000, upstreamTopicId: null, forkedTopicIds: [], incomingPullRequestIds: [], outgoingPullRequestIds: [dummyPullRequestId2, dummyPullRequestId1], collaboratorUserIds: [], isContentFetched: false, isDirty: false }]))
      .run();
  });

  it(`sends a GET request for the passed id to the topics endpoint, processes the response and puts the topic in the state when there are collaborators`, (): void => {
    const dummyAction = actions.apiGet(dummyId);
    const dummyApiResponse = {
      status: 200,
      body: {
        data: {
          attributes: {
            title: dummyTitle,
            description: dummyDescription,
            access: _.findKey(apiAccessTypesToAccessTypesMap, (topicType: string): boolean => topicType === dummyAccess),
            rootContentItemId: dummyRootContentId,
            hasOpenPullRequest: false,
          },
          relationships: {
            user: { data: { id: dummyUserId } },
            upstream: { data: null },
            forks: { data: [] },
            incomingPullRequests: { data: [] },
            outgoingPullRequests: { data: [] },
            collaborators: { data: [
              { type: 'users', id: dummyCollaboratorId1 },
              { type: 'users', id: dummyCollaboratorId2 },
            ] },
          },
          meta: {
            updatedAt: dummyTimestamp,
          },
        },
      },
    };

    return expectSaga(sagas.apiGet, dummyAction)
      .provide([
        [select(platform.selectors.getUserAuth), null],
        [call(api.topics.get, dummyId, null), dummyApiResponse],
      ])
      .call(api.topics.get, dummyId, null)
      .put(actions.setMultipleInState([{ id: dummyId, title: dummyTitle, description: dummyDescription, access: dummyAccess, userId: dummyUserId, rootContentItemId: dummyRootContentId, hasOpenPullRequest: false, timestamp: Number(dummyTimestamp) * 1000, upstreamTopicId: null, forkedTopicIds: [], incomingPullRequestIds: [], outgoingPullRequestIds: [], collaboratorUserIds: [dummyCollaboratorId1, dummyCollaboratorId2], isContentFetched: false, isDirty: false }]))
      .run();
  });

  it(`throws an UnexpectedHttpResponseError, when the api response does not contain a body`, async (): Promise<void> => {
    const dummyAction = actions.apiGet(dummyId);
    const dummyApiResponse = { status: 200, body: null };

    // Suppress console.error from redux-saga $FlowFixMe
    console.error = jest.fn();
    await expect(
      expectSaga(sagas.apiGet, dummyAction)
        .provide([
          [select(platform.selectors.getUserAuth), null],
          [call(api.topics.get, dummyId, null), dummyApiResponse],
        ])
        .run(),
    ).rejects.toBeInstanceOf(UnexpectedHttpResponseError);
  });

});
