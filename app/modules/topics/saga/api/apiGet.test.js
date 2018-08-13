// @flow

import _ from 'lodash';
import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';

import api from 'api';
import { UnexpectedHttpResponseError } from 'errors';
import { dummyContentItemData } from 'lib/testResources';
import apiRequestsStatus from 'modules/apiRequestsStatus';
import contentItems from 'modules/contentItems';
// eslint-disable-next-line import/no-internal-modules
import generateId from 'modules/contentItems/lib/generateId'; // #TODO

import actions from '../../actions';
import * as a from '../../actionTypes';

import { sagas } from '..';

jest.mock('modules/contentItems/lib/generateId');

const { contentItemTypes, contextTypes } = contentItems.model;

describe(`apiGet`, (): void => {

  let dummyId: string;
  let dummyTitle: string;
  let dummyDescription: string;
  let dummyContent: $ReadOnlyArray<contentItems.model.ContentItem>;
  let dummyGeneratedId1: string;
  let dummyGeneratedId2: string;

  beforeEach((): void => {
    dummyId = 'dummyId';
    dummyTitle = 'The Title';
    dummyDescription = 'The description.';
    dummyContent = [
      { ...dummyContentItemData.rootContentItem, childItemIds: [dummyContentItemData.headingContentItem.id] },
      // $FlowFixMe could not decide which case to select; probably bug
      { ...dummyContentItemData.headingContentItem },
    ];
    dummyGeneratedId1 = 'dummyGeneratedId1';
    dummyGeneratedId2 = 'dummyGeneratedId2';
    (generateId: any)
      .mockReturnValueOnce(dummyGeneratedId1)
      .mockReturnValueOnce(dummyGeneratedId2);
  });

  it(`sends a GET request for the passed id to the topics endpoint, processes the response and puts the topic in the state`, (): void => {
    const dummyAction = actions.apiGet(dummyId);
    const dummyApiResponse = {
      status: 200,
      body: {
        data: {
          attributes: {
            title: dummyTitle,
            description: dummyDescription,
          },
        },
      },
    };
    const dummyContentResponse = {
      status: 200,
      body: {
        data: {
          attributes: {
            content: dummyContent,
          },
        },
      },
    };

    return expectSaga(sagas.apiGet, dummyAction)
      .provide([
        [call(api.topics.get, dummyId), dummyApiResponse],
        [call(api.topics.getContent, dummyId), dummyContentResponse],
      ])
      .call(api.topics.get, dummyId)
      .put(actions.setMultipleInState([{ id: dummyId, title: dummyTitle, description: dummyDescription, rootContentItemId: dummyContent[0].id, isContentFetched: false }]))
      .run();
  });

  it(`creates placeholder topic content, when the api returns empty content`, (): void => {
    const dummyAction = actions.apiGet(dummyId);
    const dummyApiResponse = {
      status: 200,
      body: {
        data: {
          attributes: {
            title: dummyTitle,
            description: dummyDescription,
          },
        },
      },
    };
    const dummyContentResponse = { status: 200, body: { data: { attributes: { content: [] } } } };

    return expectSaga(sagas.apiGet, dummyAction)
      .provide([
        [call(api.topics.get, dummyId), dummyApiResponse],
        [call(api.topics.getContent, dummyId), dummyContentResponse],
      ])
      .call(api.topics.get, dummyId)
      .put(actions.setMultipleInState([{ id: dummyId, title: dummyTitle, description: dummyDescription, rootContentItemId: dummyGeneratedId1, isContentFetched: false }]))
      .put(contentItems.actions.addToState(dummyGeneratedId1, contentItemTypes.ROOT, null, {}))
      .put(contentItems.actions.addToState(dummyGeneratedId2, contentItemTypes.HEADING, { contextType: contextTypes.PARENT, contextItemId: dummyGeneratedId1 }, { text: 'Placeholder' }))
      .run();
  });

  it(`sets its request status to PENDING and then sets its request status to SUCCESS, when the saga completes without errors`, (): void => {
    const dummyAction = actions.apiGet(dummyId);
    const dummyApiResponse = {
      status: 200,
      body: {
        data: {
          attributes: {
            title: dummyTitle,
            description: dummyDescription,
          },
        },
      },
    };
    const dummyContentResponse = {
      status: 200,
      body: {
        data: {
          attributes: {
            content: dummyContent,
          },
        },
      },
    };

    return expectSaga(sagas.apiGet, dummyAction)
      .provide([
        [call(api.topics.get, dummyId), dummyApiResponse],
        [call(api.topics.getContent, dummyId), dummyContentResponse],
      ])
      .put(apiRequestsStatus.actions.setPending(a.API_GET))
      .put(apiRequestsStatus.actions.setSuccess(a.API_GET))
      .run();
  });

  it(`sets its request status to PENDING and then sets its request status to FAILURE, when the api call fails`, (): void => {
    const dummyAction = actions.apiGet(dummyId);
    const dummyError = new Error('Boo!');

    return expectSaga(sagas.apiGet, dummyAction)
      .provide({
        call({ fn }: any, next: any): any {
          if (fn === api.topics.get) throw dummyError;
          else return next();
        },
      })
      .put(apiRequestsStatus.actions.setPending(a.API_GET))
      .put(apiRequestsStatus.actions.setFailure(a.API_GET, dummyError))
      .run();
  });

  it(`sets its request status to PENDING and then sets its request status to FAILURE, when the api response does not contain a body`, async (): Promise<mixed> => {
    const dummyAction = actions.apiGet(dummyId);
    const dummyApiResponse = { status: 200, body: null };
    const dummyContentResponse = {
      status: 200,
      body: {
        data: {
          attributes: {
            content: dummyContent,
          },
        },
      },
    };

    const result = await expectSaga(sagas.apiGet, dummyAction)
      .provide([
        [call(api.topics.get, dummyId), dummyApiResponse],
        [call(api.topics.getContent, dummyId), dummyContentResponse],
      ])
      .put(apiRequestsStatus.actions.setPending(a.API_GET))
      .put.actionType(apiRequestsStatus.actions.setFailure(a.API_GET, new UnexpectedHttpResponseError()).type)
      .run();

    expect(_.last(result.allEffects).PUT.action.payload.error).toBeInstanceOf(UnexpectedHttpResponseError);
  });

  it(`sets its request status to PENDING and then sets its request status to FAILURE, when the content api response does not contain a ROOT as the first item`, async (): Promise<mixed> => {
    const dummyAction = actions.apiGet(dummyId);
    const dummyApiResponse = {
      status: 200,
      body: {
        data: {
          attributes: {
            title: dummyTitle,
            description: dummyDescription,
          },
        },
      },
    };
    const dummyContentResponse = {
      status: 200,
      body: {
        data: {
          attributes: {
            content: [
              { ...dummyContentItemData.headingContentItem },
            ],
          },
        },
      },
    };

    const result = await expectSaga(sagas.apiGet, dummyAction)
      .provide([
        [call(api.topics.get, dummyId), dummyApiResponse],
        [call(api.topics.getContent, dummyId), dummyContentResponse],
      ])
      .put(apiRequestsStatus.actions.setPending(a.API_GET))
      .put.actionType(apiRequestsStatus.actions.setFailure(a.API_GET, new UnexpectedHttpResponseError()).type)
      .run();

    expect(_.last(result.allEffects).PUT.action.payload.error).toBeInstanceOf(UnexpectedHttpResponseError);
  });

});
