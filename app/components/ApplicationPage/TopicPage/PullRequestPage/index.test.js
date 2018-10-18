// @flow

import _ from 'lodash';
import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { DummyProviders, dummyTopicData, dummyUserData, dummyProviderProps } from 'lib/testResources';
import users from 'modules/users';
import topics from 'modules/topics';

import PullRequestPage, { PurePullRequestPage } from '.';
import {CorruptedInternalStateError} from '../../../../errors'

describe(`PullRequestPage`, (): void => {

  let dummyTopic: topics.model.Topic;
  let dummyCurrentUser: users.model.User;
  let dummyState: any;

  beforeEach((): void => {
    dummyTopic = { ...dummyTopicData.topic };
    dummyCurrentUser = { ...dummyUserData.user };

    dummyState = {
      modules: {
        asyncRequests: { byId: {} },
        platform: {
          userAuth: {
            userId: dummyCurrentUser.id,
            apiToken: 'foobarToken',
          },
        },
        users: {
          byId: {
            [dummyCurrentUser.id]: dummyCurrentUser,
          },
        },
        topics: {
          byId: {
            [dummyTopic.id]: dummyTopic,
          },
        },
      },
      flash: { messages: [] },
    };
  });

  it(`renders without errors`, (): void => {
    const fixedRouterProps = _.set(_.cloneDeep(dummyProviderProps.routerProps), 'match.params.topicId', dummyTopic.id);

    const enzymeWrapper = shallow(
      <PurePullRequestPage
        {...fixedRouterProps}
      />,
    );

    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`does not render with currentUserId NULL, when there is no current user`, (): void => {
    const fixedRouterProps = _.set(_.cloneDeep(dummyProviderProps.routerProps), 'match.params.topicId', dummyTopic.id);
    dummyState.modules.platform.userAuth = null;

    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState}>
        <PullRequestPage {...fixedRouterProps} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find(`PurePullRequestPage`).props().currentUserId).toBeNull();
  });

  it(`renders NULL when match.params.id is NULL`, (): void => {
    const enzymeWrapper = shallow(
      <PurePullRequestPage {...dummyProviderProps.routerProps} />,
    );

    expect(enzymeWrapper.isEmptyRender()).toBe(true);
  });

  it(`throws a CorruptedInternalStateError when handleSubmitPullRequest is called while currentUserId is NULL`, (): void => {
    const fixedRouterProps = _.set(_.cloneDeep(dummyProviderProps.routerProps), 'match.params.topicId', dummyTopic.id);

    const enzymeWrapper = shallow(
      <PurePullRequestPage
        {...fixedRouterProps}
        currentUserId={null}
      />,
    );

    expect((): void => {
      enzymeWrapper.instance().handleSubmitPullRequest('dummyTopicId');
    }).toThrow(CorruptedInternalStateError);
  });

});
