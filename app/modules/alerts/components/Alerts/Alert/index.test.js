// @flow

import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { DummyProviders, dummyInitialState, dummyProviderProps, dummyAlertData, dummyTopicData, dummyUserData } from 'lib/testResources';
import topics from 'modules/topics';
import users from 'modules/users';

import * as m from '../../../model';

import Alert from '.';

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
      <Alert
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
        <Alert
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

    it(`renders an UpdateAlert when the passed alert prop is an alert of type TOPIC_UPDATED`, (): void => {
      const enzymeWrapper = mount(
        <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
          <Alert alert={dummyUpdateAlert} />
        </DummyProviders>,
      );

      expect(enzymeWrapper.find('PureUpdateAlert')).toHaveLength(1);
    });

  });

  describe(`pull request alert`, (): void => { /* TODO */ });

});
