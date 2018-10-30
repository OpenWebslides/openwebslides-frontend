// @flow

import { type Saga } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';

import api from 'api';
import { UnexpectedHttpResponseError, UnsupportedOperationError } from 'errors';
import { type ApiResponseData } from 'lib/ApiRequest';
import platform from 'modules/platform';

import actions from '../../actions';
import * as a from '../../actionTypes';
import * as m from '../../model';

const apiAlertTypesMap = {
  update: m.alertTypes.UPDATE,
  pullRequest: m.alertTypes.PULL_REQUEST,
};

const apiAlertPullRequestStateTypesMap = {
  submitted: m.pullRequestStateTypes.SUBMITTED,
  accepted: m.pullRequestStateTypes.ACCEPTED,
  rejected: m.pullRequestStateTypes.REJECTED,
};

const apiGetAllByUserId = function* (action: a.ApiGetAllByUserIdAction): Saga<void> {
  const { userId } = action.payload;
  const userAuth: ?platform.model.UserAuth = yield select(platform.selectors.getUserAuth);
  if (userAuth == null) throw new UnsupportedOperationError(`Not signed in.`);

  const responseData: ApiResponseData = yield call(
    api.alerts.getAllByUserId, userId, userAuth.apiToken,
  );
  if (responseData.body == null) throw new UnexpectedHttpResponseError();

  // eslint-disable-next-line flowtype/no-weak-types
  const data = responseData.body.data.map((item: Object): m.Alert => {
    const alertType = apiAlertTypesMap[item.attributes.type];

    const commonProps = {
      id: item.id,
      userId: item.relationships.user.data.id,
      timestamp: Number(item.meta.createdAt) * 1000,
      type: alertType,
    };

    if (alertType === m.alertTypes.UPDATE) {
      return {
        ...commonProps,
        topicId: item.relationships.topic.data.id,
        count: item.attributes.count,
      };
    }
    else if (alertType === m.alertTypes.PULL_REQUEST) {
      return {
        ...commonProps,
        pullRequestId: item.relationships.pullRequest.data.id,
        subjectUserId: item.relationships.subject.data.id,
        state: apiAlertPullRequestStateTypesMap[item.attributes.state],
      };
    }
    else {
      throw new UnexpectedHttpResponseError(`wat`);
    }
  });

  yield put(actions.setMultipleInState(data));
};

export { apiAlertTypesMap, apiAlertPullRequestStateTypesMap };
export default apiGetAllByUserId;
