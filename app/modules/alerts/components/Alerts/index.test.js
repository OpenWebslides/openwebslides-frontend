// @flow

import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { DummyProviders, dummyInitialState, dummyProviderProps, dummyAlertData, dummyTopicData, dummyUserData } from 'lib/testResources';
import topics from 'modules/topics';
import users from 'modules/users';

import * as m from '../../model';

import Alerts, { PureAlerts } from '.';

describe(`Alerts`, (): void => {

  let dummyTopic: topics.model.Topic;
  let dummyUser: users.model.User;
  let dummyAlert1: m.Alert;
  let dummyAlert2: m.Alert;
  let dummyState: any;
  let dummyDispatch: any;

  beforeEach((): void => {
    dummyTopic = { ...dummyTopicData.topic };
    dummyUser = { ...dummyUserData.user };
    dummyAlert1 = { ...dummyAlertData.updateAlert1, timestamp: 1, topicId: dummyTopic.id, userId: dummyUser.id };
    dummyAlert2 = { ...dummyAlertData.PRSubmittedAlert, timestamp: 2, userId: dummyUser.id, subjectUserId: dummyUser.id };
    dummyState = {
      ...dummyInitialState,
      modules: {
        ...dummyInitialState.modules,
        alerts: {
          ...dummyInitialState.modules.alerts,
          byId: {
            [dummyAlert1.id]: dummyAlert1,
            [dummyAlert2.id]: dummyAlert2,
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
    const dummyHandleFetchAll = jest.fn();
    const enzymeWrapper = shallow(
      <PureAlerts
        {...dummyProviderProps.translatorProps}
        sortedAlerts={[]}
        handleFetchAll={dummyHandleFetchAll}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders the AlertsItems from the state sorted by timestamp in reverse order`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <Alerts />
      </DummyProviders>,
    );
    const AlertNodes = enzymeWrapper.find('PureAlert');

    expect(AlertNodes).toHaveLength(2);
    expect(AlertNodes.at(0).props().alert.id).toBe(dummyAlert2.id);
    expect(AlertNodes.at(1).props().alert.id).toBe(dummyAlert1.id);
  });

});
