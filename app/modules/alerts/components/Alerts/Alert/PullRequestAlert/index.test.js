// @flow

import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { push } from 'connected-react-router';

import { PULL_REQUEST_VIEW_ROUTE } from 'config/routes';
import makeRoute from 'lib/makeRoute';
import { DummyProviders, dummyInitialState, dummyAlertData, dummyTopicData, dummyUserData } from 'lib/testResources';
import topics from 'modules/topics';
import users from 'modules/users';

import actions from '../../../../actions';
import * as m from '../../../../model';

import PullRequestAlert, { PurePullRequestAlert } from '.';

describe(`PullRequestAlert`, (): void => {

  let dummyTopic: topics.model.Topic;
  let dummyUser: users.model.User;
  let dummyAlert: m.PullRequestAlert;
  let dummyState: any;
  let dummyDispatch: any;

  let dummyFetchTopic: any;
  let dummyFetchUser: any;
  let dummyOnClickAlert: any;

  beforeEach((): void => {
    dummyTopic = { ...dummyTopicData.topic };
    dummyUser = { ...dummyUserData.user };
    dummyAlert = { ...dummyAlertData.PRSubmittedAlert, topicId: dummyTopic.id, subjectUserId: dummyUser.id };
    dummyState = {
      ...dummyInitialState,
      modules: {
        ...dummyInitialState.modules,
        alerts: {
          ...dummyInitialState.modules.alerts,
          byId: {
            [dummyAlert.id]: dummyAlert,
          },
        },
        topics: {
          ...dummyInitialState.modules.topics,
          byId: {
            [dummyTopic.id]: dummyTopic,
          },
        },
        users: {
          ...dummyInitialState.modules.users,
          byId: {
            [dummyUser.id]: dummyUser,
          },
        },
      },
    };
    dummyDispatch = jest.fn();

    dummyFetchTopic = jest.fn();
    dummyFetchUser = jest.fn();
    dummyOnClickAlert = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PurePullRequestAlert
        alert={dummyAlert}
        user={dummyUser}
        topic={dummyTopic}
        fetchTopic={dummyFetchTopic}
        fetchUser={dummyFetchUser}
        onClickAlert={dummyOnClickAlert}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`fetches the alert's associated topic, when the topic was not previously present in the state`, (): void => {
    dummyState.modules.topics.byId = {};

    mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <PullRequestAlert alert={dummyAlert} />
      </DummyProviders>,
    );

    expect(dummyDispatch).toHaveBeenCalledWith(topics.actions.fetch(dummyAlert.topicId));
  });

  it(`fetches the alert's associated user, when the user was not previously present in the state`, (): void => {
    dummyState.modules.users.byId = {};

    mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <PullRequestAlert alert={dummyAlert} />
      </DummyProviders>,
    );

    expect(dummyDispatch).toHaveBeenCalledWith(users.actions.fetch(dummyAlert.subjectUserId));
  });

  it(`renders the alert, when the associated topic and user was previously present in the state`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <PullRequestAlert alert={dummyAlert} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="alert"]').hostNodes()).toHaveLength(1);
  });

  it(`renders the correct iconName for an alert with type PR_SUBMITTED`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <PullRequestAlert alert={{ ...dummyAlert, type: m.alertTypes.PR_SUBMITTED }} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('i').hostNodes().hasClass('question')).toBe(true);
  });

  it(`renders the correct iconName for an alert with type PR_ACCEPTED`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <PullRequestAlert alert={{ ...dummyAlert, type: m.alertTypes.PR_ACCEPTED }} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('i').hostNodes().hasClass('check')).toBe(true);
  });

  it(`renders the correct iconName for an alert with type PR_REJECTED`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <PullRequestAlert alert={{ ...dummyAlert, type: m.alertTypes.PR_REJECTED }} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('i').hostNodes().hasClass('times')).toBe(true);
  });

  it(`dispatches a MARK_AS_READ action, and a PUSH action to the pull request view page when an unread alert is clicked`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <PullRequestAlert alert={{ ...dummyAlert, read: false }} />
      </DummyProviders>,
    );

    enzymeWrapper.find('[data-test-id="alert"]').hostNodes().simulate('click');

    expect(dummyDispatch).toHaveBeenCalledWith(actions.markAsRead(dummyAlert.id));
    expect(dummyDispatch).toHaveBeenCalledWith(push(makeRoute(PULL_REQUEST_VIEW_ROUTE, { pullRequestId: dummyAlert.pullRequestId })));
  });

  it(`dispatches a PUSH action to the pull request view page when a read alert is clicked`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <PullRequestAlert alert={{ ...dummyAlert, read: true }} />
      </DummyProviders>,
    );

    enzymeWrapper.find('[data-test-id="alert"]').hostNodes().simulate('click');

    expect(dummyDispatch).toHaveBeenCalledWith(push(makeRoute(PULL_REQUEST_VIEW_ROUTE, { pullRequestId: dummyAlert.pullRequestId })));
  });

});
