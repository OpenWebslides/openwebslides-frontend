// @flow

import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { DummyProviders, dummyInitialState, dummyAlertData, dummyTopicData, dummyUserData } from 'lib/testResources';
import topics from 'modules/topics';
import users from 'modules/users';

import * as m from '../../../model';

import Alert from '.';

describe(`Alert`, (): void => {

  let dummyTopic: topics.model.Topic;
  let dummyUser: users.model.User;
  let dummyUpdateAlert: m.UpdateAlert;
  let dummyPullRequestAlert: m.PullRequestAlert;
  let dummyForkedAlert: m.ForkedAlert;
  let dummyState: any;
  let dummyDispatch: any;

  beforeEach((): void => {
    dummyTopic = { ...dummyTopicData.topic };
    dummyUser = { ...dummyUserData.user };
    dummyUpdateAlert = { ...dummyAlertData.updateAlert1, topicId: dummyTopic.id, userId: dummyUser.id };
    dummyPullRequestAlert = { ...dummyAlertData.PRSubmittedAlert, topicId: dummyTopic.id, userId: dummyUser.id };
    dummyForkedAlert = { ...dummyAlertData.forkedAlert, topicId: dummyTopic.id, userId: dummyUser.id };
    dummyState = {
      ...dummyInitialState,
      modules: {
        ...dummyInitialState.modules,
        alerts: {
          ...dummyInitialState.modules.alerts,
          byId: {
            [dummyUpdateAlert.id]: dummyUpdateAlert,
            [dummyPullRequestAlert.id]: dummyPullRequestAlert,
            [dummyForkedAlert.id]: dummyForkedAlert,
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
      // $FlowFixMe intentional invalid type
      <Alert alert={{ ...dummyUpdateAlert, type: 'foo' }} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(true);
  });

  describe(`update alerts`, (): void => {

    it(`renders without errors`, (): void => {
      const enzymeWrapper = shallow(
        <Alert alert={dummyUpdateAlert} />,
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

  describe(`pull request alerts`, (): void => {

    it(`renders without errors`, (): void => {
      const enzymeWrapper = shallow(
        <Alert alert={dummyPullRequestAlert} />,
      );
      expect(enzymeWrapper.isEmptyRender()).toBe(false);
    });

    it(`renders a PullRequestAlert when the passed alert prop is an alert of type PR_SUBMITTED`, (): void => {
      const enzymeWrapper = mount(
        <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
          <Alert alert={{ ...dummyPullRequestAlert, type: m.alertTypes.PR_SUBMITTED }} />
        </DummyProviders>,
      );

      expect(enzymeWrapper.find('PurePullRequestAlert')).toHaveLength(1);
    });

    it(`renders a PullRequestAlert when the passed alert prop is an alert of type PR_ACCEPTED`, (): void => {
      const enzymeWrapper = mount(
        <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
          <Alert alert={{ ...dummyPullRequestAlert, type: m.alertTypes.PR_ACCEPTED }} />
        </DummyProviders>,
      );

      expect(enzymeWrapper.find('PurePullRequestAlert')).toHaveLength(1);
    });

    it(`renders a PullRequestAlert when the passed alert prop is an alert of type PR_REJECTED`, (): void => {
      const enzymeWrapper = mount(
        <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
          <Alert alert={{ ...dummyPullRequestAlert, type: m.alertTypes.PR_REJECTED }} />
        </DummyProviders>,
      );

      expect(enzymeWrapper.find('PurePullRequestAlert')).toHaveLength(1);
    });

  });

  describe(`forked alerts`, (): void => {

    it(`renders without errors`, (): void => {
      const enzymeWrapper = shallow(
        <Alert alert={dummyForkedAlert} />,
      );
      expect(enzymeWrapper.isEmptyRender()).toBe(false);
    });

    it(`renders an ForkedAlert when the passed alert prop is an alert of type TOPIC_FORKED`, (): void => {
      const enzymeWrapper = mount(
        <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
          <Alert alert={dummyForkedAlert} />
        </DummyProviders>,
      );

      expect(enzymeWrapper.find('PureForkedAlert')).toHaveLength(1);
    });

  });

});
