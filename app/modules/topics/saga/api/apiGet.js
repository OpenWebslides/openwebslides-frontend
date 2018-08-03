// @flow

import { type Saga } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import api from 'api';
import { UnexpectedHttpResponseError } from 'errors';
import { type ApiResponseData } from 'lib/ApiRequest';
import apiRequestsStatus from 'modules/apiRequestsStatus';
import contentItems from 'modules/contentItems';
// eslint-disable-next-line import/no-internal-modules
import generateId from 'modules/contentItems/lib/generateId'; // #TODO

import actions from '../../actions';
import * as a from '../../actionTypes';
import * as m from '../../model';

const { contentItemTypes, contextTypes } = contentItems.model;

const createInitialTopicRoot = function* (rootContentItemId: string): Saga<void> {
  // #TODO move new rootContentItem generation to load saga
  yield put(contentItems.actions.addToState(
    rootContentItemId,
    contentItemTypes.ROOT,
    null,
    {},
  ));
  const headingContentItemId = generateId();
  yield put(contentItems.actions.addToState(
    headingContentItemId,
    contentItemTypes.HEADING,
    {
      contextType: contextTypes.PARENT,
      contextItemId: rootContentItemId,
    },
    {
      // #TODO prevent from being deleted
      text: 'Placeholder',
    },
  ));
  yield put(contentItems.actions.toggleEditing(headingContentItemId, true));
};

const apiGet = function* (action: a.ApiGetAction): Saga<void> {
  yield put(apiRequestsStatus.actions.setPending(action.type));

  try {
    const { id } = action.payload;
    const topicsResponseData: ApiResponseData = yield call(api.topics.get, id);
    // #TODO replace double request with setting rootContentItemId to NULL intially
    // and then getting it on topic load, after proper saga communication has been implemented
    // and it is possible for topics load saga to wait for contentItems apiGetAllByTopicId results
    const contentItemsResponseData: ApiResponseData = yield call(api.topics.getContent, id);
    if (topicsResponseData.body == null || contentItemsResponseData.body == null) {
      throw new UnexpectedHttpResponseError();
    }

    const rootContentItem = contentItemsResponseData.body.data.attributes.content[0];
    let rootContentItemId: string;

    if (rootContentItem == null) {
      rootContentItemId = generateId();
      yield call(createInitialTopicRoot, rootContentItemId);
    }
    else if (rootContentItem.type !== contentItemTypes.ROOT) {
      throw new UnexpectedHttpResponseError(`Corrupted topic content for topic with id ${id}.`);
    }
    else {
      rootContentItemId = rootContentItem.id;
    }

    const { attributes: topicAttributes } = topicsResponseData.body.data;
    const topic: m.Topic = {
      id,
      title: topicAttributes.title,
      description: topicAttributes.description,
      rootContentItemId,
    };

    yield put(actions.setMultipleInState([topic]));
    yield put(apiRequestsStatus.actions.setSuccess(action.type));
  }
  catch (error) {
    yield put(apiRequestsStatus.actions.setFailure(action.type, error));
  }
};

export default apiGet;
