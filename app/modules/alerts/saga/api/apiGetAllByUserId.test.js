// @flow

import _ from 'lodash';
import { expectSaga } from 'redux-saga-test-plan';
import { call, select } from 'redux-saga/effects';

import api from 'api';
import { UnexpectedHttpResponseError, UnsupportedOperationError } from 'errors';
import { dummyAlertData } from 'lib/testResources';
import platform from 'modules/platform';

import actions from '../../actions';
import * as m from '../../model';

import { apiAlertTypesMap, apiAlertPullRequestStateTypesMap } from './apiGetAllByUserId';

import { sagas } from '..';

describe(`apiGetAllByUserId`, (): void => {

  let dummyUserId: string;
  let dummyToken: string;
  let dummyUpdateAlert: m.UpdateAlert;
  let dummyPRSubmittedAlert: m.PullRequestAlert;

  beforeEach((): void => {
    dummyUserId = 'dummyUserId';
    dummyToken = 'dummyToken';
    dummyUpdateAlert = { ...dummyAlertData.updateAlert1 };
    dummyPRSubmittedAlert = { ...dummyAlertData.PRSubmittedAlert };
  });

  it(`sends a GET request to the alerts endpoint, processes the response and puts the alerts in the state`, (): void => {
    const dummyAction = actions.apiGetAllByUserId(dummyUserId);
    const dummyApiResponse = {
      status: 200,
      body: {
        data: [
          {
            id: dummyUpdateAlert.id,
            attributes: {
              alertType: _.findKey(apiAlertTypesMap, (alertType: string): boolean => alertType === dummyUpdateAlert.type),
              count: 3,
              read: false,
            },
            relationships: {
              user: { data: { id: dummyUpdateAlert.userId } },
              topic: { data: { id: dummyUpdateAlert.topicId } },
            },
            meta: { createdAt: dummyUpdateAlert.timestamp / 1000 },
          },
          {
            id: dummyPRSubmittedAlert.id,
            attributes: {
              alertType: _.findKey(apiAlertTypesMap, (alertType: string): boolean => alertType === dummyPRSubmittedAlert.type),
              state: _.findKey(apiAlertPullRequestStateTypesMap, (state: string): boolean => state === dummyPRSubmittedAlert.state),
              read: false,
            },
            relationships: {
              user: { data: { id: dummyPRSubmittedAlert.userId } },
              pullRequest: { data: { id: dummyPRSubmittedAlert.pullRequestId } },
              subject: { data: { id: dummyPRSubmittedAlert.subjectUserId } },
            },
            meta: { createdAt: dummyPRSubmittedAlert.timestamp / 1000 },
          },
        ],
      },
    };

    return expectSaga(sagas.apiGetAllByUserId, dummyAction)
      .provide([
        [select(platform.selectors.getUserAuth), { userId: dummyUserId, apiToken: dummyToken }],
        [call(api.alerts.getAllByUserId, dummyUserId, dummyToken), dummyApiResponse],
      ])
      .put(actions.setMultipleInState([dummyUpdateAlert, dummyPRSubmittedAlert]))
      .run();
  });

  it(`throws an UnexpectedHttpResponseError, when the api response does not contain a body`, async (): Promise<mixed> => {
    const dummyAction = actions.apiGetAllByUserId(dummyUserId);
    const dummyApiResponse = {
      status: 200,
      body: null,
    };

    // Suppress console.error from redux-saga $FlowFixMe
    console.error = jest.fn();
    await expect(
      expectSaga(sagas.apiGetAllByUserId, dummyAction)
        .provide([
          [select(platform.selectors.getUserAuth), { userId: dummyUserId, apiToken: dummyToken }],
          [call(api.alerts.getAllByUserId, dummyUserId, dummyToken), dummyApiResponse],
        ])
        .run(),
    ).rejects.toBeInstanceOf(UnexpectedHttpResponseError);
  });

  it(`throws an UnsupportedOperationError, when the api response contains an unsupported alert type`, async (): Promise<mixed> => {
    const dummyAction = actions.apiGetAllByUserId(dummyUserId);
    const dummyApiResponse = {
      status: 200,
      body: {

        data: [
          {
            id: dummyUpdateAlert.id,
            attributes: {
              alertType: 'unsupported_type',
              count: 3,
              read: false,
            },
            relationships: {
              user: { data: { id: dummyUpdateAlert.userId } },
              topic: { data: { id: dummyUpdateAlert.topicId } },
            },
            meta: { createdAt: dummyUpdateAlert.timestamp / 1000 },
          },
        ],
      },
    };

    // Suppress console.error from redux-saga $FlowFixMe
    console.error = jest.fn();
    await expect(
      expectSaga(sagas.apiGetAllByUserId, dummyAction)
        .provide([
          [select(platform.selectors.getUserAuth), { userId: dummyUserId, apiToken: dummyToken }],
          [call(api.alerts.getAllByUserId, dummyUserId, dummyToken), dummyApiResponse],
        ])
        .run(),
    ).rejects.toBeInstanceOf(UnsupportedOperationError);
  });

});
