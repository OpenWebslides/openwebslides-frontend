// @flow

import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { DummyProviders, dummyInitialState, dummyProviderProps, dummyAlertData, dummyTopicData, dummyUserData } from 'lib/testResources';
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
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PurePullRequestAlert
        {...dummyProviderProps.translatorProps}
        alert={dummyAlert}
        user={dummyUser}
        topic={dummyTopic}
        fetchTopic={jest.fn()}
        fetchUser={jest.fn()}
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

  it(`dispatches a MARK_AS_READ action when an unread alert is clicked`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <PullRequestAlert alert={{ ...dummyAlert, read: false }} />
      </DummyProviders>,
    );

    enzymeWrapper.find('[data-test-id="alert"]').hostNodes().simulate('click');

    expect(dummyDispatch).toHaveBeenCalledWith(actions.markAsRead(dummyAlert.id));
  });

  it(`does not dispatch anything when a read alert is clicked`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <PullRequestAlert alert={{ ...dummyAlert, read: true }} />
      </DummyProviders>,
    );

    enzymeWrapper.find('[data-test-id="alert"]').hostNodes().simulate('click');

    expect(dummyDispatch).not.toHaveBeenCalled();
  });

});
