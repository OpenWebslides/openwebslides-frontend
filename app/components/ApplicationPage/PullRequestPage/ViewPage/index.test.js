// @flow

import _ from 'lodash';
import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { DummyProviders, dummyInitialState, dummyUserData, dummyPullRequestData, dummyTopicData, dummyProviderProps } from 'lib/testResources';
import users from 'modules/users';
import pullRequests from 'modules/pullRequests';

import ViewPage, { PureViewPage } from '.';

describe(`ViewPage`, (): void => {

  let dummyPullRequest: pullRequests.model.PullRequest;
  let dummyCurrentUser: users.model.User;
  let dummyState: any;
  let dummyDispatch: any;

  beforeEach((): void => {
    dummyPullRequest = { ...dummyPullRequestData.pullRequest };
    dummyCurrentUser = { ...dummyUserData.user };
    dummyState = {
      ...dummyInitialState,
      modules: {
        ...dummyInitialState.modules,
        platform: {
          ...dummyInitialState.modules.platform,
          userAuth: {
            userId: dummyCurrentUser.id,
            apiToken: 'foobarToken',
          },
        },
        users: {
          ...dummyInitialState.modules.users,
          byId: {
            [dummyCurrentUser.id]: dummyCurrentUser,
          },
        },
        pullRequests: {
          ...dummyInitialState.modules.pullRequests,
          byId: {
            [dummyPullRequest.id]: dummyPullRequest,
          },
        },
        topics: {
          ...dummyInitialState.modules.topics,
          byId: {
            [dummyPullRequest.sourceTopicId]: dummyTopicData.topic,
            [dummyPullRequest.targetTopicId]: dummyTopicData.topic,
          },
        },
      },
    };
    dummyDispatch = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const fixedRouterProps = _.set(_.cloneDeep(dummyProviderProps.routerProps), 'match.params.pullRequestId', dummyPullRequest.id);

    const enzymeWrapper = shallow(
      <PureViewPage {...fixedRouterProps} />,
    );

    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders no components when match.params.pullRequestId is NULL`, (): void => {
    const enzymeWrapper = shallow(
      <PureViewPage {...dummyProviderProps.routerProps} />,
    );

    // Cannot asset to be empty render, due to FetchWrapper
    expect(enzymeWrapper.find('[data-test-id="view-page"]').hostNodes()).toHaveLength(0);
  });

  it(`loads the current user, when the current user was not previously present in the state`, (): void => {
    const fixedRouterProps = _.set(_.cloneDeep(dummyProviderProps.routerProps), 'match.params.pullRequestId', dummyPullRequest.id);

    dummyState.modules.users.byId = {};

    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <ViewPage
          {...fixedRouterProps}
          pullRequestId={dummyPullRequest.id}
        />
      </DummyProviders>,
    );

    expect(dummyDispatch).toHaveBeenCalledWith(users.actions.fetch(dummyCurrentUser.id));
    expect(enzymeWrapper.find('[data-test-id="view-page"]').hostNodes()).toHaveLength(0);
  });

  it(`renders the pull request view, when the pull request was previously present in the state`, (): void => {
    const fixedRouterProps = _.set(_.cloneDeep(dummyProviderProps.routerProps), 'match.params.pullRequestId', dummyPullRequest.id);

    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <ViewPage
          {...fixedRouterProps}
          pullRequestId={dummyPullRequest.id}
        />
      </DummyProviders>,
    );

    // FIXME: Called two times by external components
    expect(dummyDispatch).toHaveBeenCalledTimes(2);
    expect(enzymeWrapper.find('[data-test-id="view-page"]').hostNodes()).toHaveLength(1);
  });

});
