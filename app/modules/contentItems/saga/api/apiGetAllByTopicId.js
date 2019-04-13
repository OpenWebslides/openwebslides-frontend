// @flow

import { type Saga } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';

import { UnexpectedHttpResponseError } from 'errors';
import api from 'api';
import { type ApiResponseData } from 'lib/ApiConnection';
import platform from 'modules/platform';

import actions from '../../actions';
import * as a from '../../actionTypes';
import * as m from '../../model';

const apiGetAllByTopicId = function* (action: a.ApiGetAllByTopicIdAction): Saga<void> {
  const { topicId } = action.payload;
  const userAuth: ?platform.model.UserAuth = yield select(platform.selectors.getUserAuth);
  const accessToken = (userAuth != null) ? userAuth.accessToken : null;

  const responseData: ApiResponseData = yield call(api.topics.getContent, topicId, accessToken);
  if (responseData.body == null) throw new UnexpectedHttpResponseError();
  const { attributes } = responseData.body.data;

  // TODO: validate response

  const contentItems: $ReadOnlyArray<m.ContentItem> = attributes.content;

  // Backwards compatibility measure;
  // automatically rename the ROOT childItemIds into subItemIds when a legacy topic is loaded.
  contentItems.forEach((contentItem: m.ContentItem): void => {
    if (
      contentItem.type === m.contentItemTypes.ROOT
      // This is intentional since it is a backwards compatibility issue:
      // $FlowFixMe property is missing on ContentItem
      && contentItem.childItemIds != null
    ) {
      /* eslint-disable no-param-reassign */
      contentItem.subItemIds = contentItem.childItemIds;
      delete contentItem.childItemIds;
      /* eslint-enable */
    }
  });

  yield put(actions.setMultipleInState(contentItems));
};

export default apiGetAllByTopicId;
