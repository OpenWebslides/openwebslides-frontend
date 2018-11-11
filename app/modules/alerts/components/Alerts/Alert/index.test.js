// @flow

import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { push } from 'connected-react-router';

import { TOPIC_EDITOR_ROUTE } from 'config/routes';
import makeRoute from 'lib/makeRoute';
import { DummyProviders, dummyInitialState, dummyProviderProps, dummyAlertData, dummyTopicData, dummyUserData } from 'lib/testResources';
import topics from 'modules/topics';
import users from 'modules/users';

import * as m from '../../../model';

import Alert, { PureAlert } from '.';

describe(`Alert`, (): void => {

  let dummyTopic: topics.model.Topic;
  let dummyUser: users.model.User;
  let dummyUpdateAlert: m.UpdateAlert;
  let dummyState: any;
  let dummyDispatch: any;

  beforeEach((): void => {
    dummyTopic = { ...dummyTopicData.topic };
    dummyUser = { ...dummyUserData.user };
    dummyUpdateAlert = { ...dummyAlertData.updateAlert1, topicId: dummyTopic.id, userId: dummyUser.id };
    dummyState = {
      ...dummyInitialState,
      modules: {
        ...dummyInitialState.modules,
        alerts: {
          ...dummyInitialState.modules.alerts,
          byId: {
            [dummyUpdateAlert.id]: dummyUpdateAlert,
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

  it(`renders empty when the topic has an invalid type`, (): void => {
    const enzymeWrapper = shallow(
      <PureAlert
        {...dummyProviderProps.translatorProps}
        alert={{ ...dummyUpdateAlert, type: 'foo' }}
        user={dummyUser}
        topic={dummyTopic}
        fetchTopic={jest.fn()}
        fetchUser={jest.fn()}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(true);
  });

  describe(`update alerts`, (): void => {

    it(`renders without errors`, (): void => {
      const enzymeWrapper = shallow(
        <PureAlert
          {...dummyProviderProps.translatorProps}
          alert={dummyUpdateAlert}
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
          <Alert alert={dummyUpdateAlert} />
        </DummyProviders>,
      );

      expect(dummyDispatch).toHaveBeenCalledWith(topics.actions.fetch(dummyUpdateAlert.topicId));
    });

    it(`fetches the alert's associated user, when the user was not previously present in the state`, (): void => {
      dummyState.modules.users.byId = {};

      mount(
        <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
          <Alert alert={dummyUpdateAlert} />
        </DummyProviders>,
      );

      expect(dummyDispatch).toHaveBeenCalledWith(users.actions.fetch(dummyUpdateAlert.userId));
    });

    it(`renders the alert, when both the associated user and topic were previously present in the state`, (): void => {
      const enzymeWrapper = mount(
        <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
          <Alert alert={dummyUpdateAlert} />
        </DummyProviders>,
      );

      expect(enzymeWrapper.find('[data-test-id="alert"]').hostNodes()).toHaveLength(1);
    });

    it(`dispatches a PUSH action to the editor when the alert is clicked`, (): void => {
      const enzymeWrapper = mount(
        <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
          <Alert alert={dummyUpdateAlert} />
        </DummyProviders>,
      );

      enzymeWrapper.find('[data-test-id="alert"]').hostNodes().simulate('click');

      expect(dummyDispatch).toHaveBeenCalledWith(push(makeRoute(TOPIC_EDITOR_ROUTE, { topicId: dummyUpdateAlert.topicId })));
    });

  });

  describe(`pull request alert`, (): void => { /* TODO */ });

});
