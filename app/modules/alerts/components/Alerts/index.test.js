// @flow

import * as React from 'react';
import { mount, shallow } from 'enzyme';
import moment from 'moment';

import { DummyProviders, dummyInitialState, dummyAlertData, dummyTopicData, dummyUserData } from 'lib/testResources';
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
    dummyAlert1 = { ...dummyAlertData.updateAlert1, timestamp: moment().subtract(14, 'days').valueOf(), topicId: dummyTopic.id, userId: dummyUser.id };
    dummyAlert2 = { ...dummyAlertData.PRSubmittedAlert, timestamp: moment().valueOf(), userId: dummyUser.id, subjectUserId: dummyUser.id };
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
        platform: { userAuth: { userId: dummyUser.id } },
      },
    };
    dummyDispatch = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const dummyHandleFetchAll = jest.fn();
    const enzymeWrapper = shallow(
      <PureAlerts
        sortedAlerts={[]}
        handleFetchAll={dummyHandleFetchAll}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders the alerts from the state sorted by timestamp in reverse order`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <Alerts />
      </DummyProviders>,
    );
    const AlertNodes = enzymeWrapper.find('Alert');

    expect(AlertNodes).toHaveLength(2);
    expect(AlertNodes.at(0).props().alert.id).toBe(dummyAlert2.id);
    expect(AlertNodes.at(1).props().alert.id).toBe(dummyAlert1.id);
  });

  it(`renders recent and earlier alerts in two different groups`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <Alerts />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('Alert')).toHaveLength(2);
    expect(enzymeWrapper.find('[data-test-id="alerts-menu-empty"]')).toHaveLength(0);
    // Length of the recent menu should be 2, because data-test-id is defined
    // on Dropdown.Item, which renders two HTML nodes with the passed data-test-id prop
    expect(enzymeWrapper.find('[data-test-id="alerts-menu-recent"]')).toHaveLength(2);
    // Length of the earlier menu should be 2, because data-test-id is defined
    // on Dropdown.Item, which renders two HTML nodes with the passed data-test-id prop
    expect(enzymeWrapper.find('[data-test-id="alerts-menu-earlier"]')).toHaveLength(2);
  });

  it(`does not render recent alerts if there are none`, (): void => {
    const dummyEarlierState = {
      ...dummyState,
      modules: {
        ...dummyState.modules,
        alerts: {
          ...dummyState.modules.alerts,
          byId: {
            [dummyAlert1.id]: { ...dummyAlert1, timestamp: moment().subtract(14, 'days').valueOf() },
            [dummyAlert2.id]: { ...dummyAlert2, timestamp: moment().subtract(14, 'days').valueOf() },
          },
        },
      },
    };

    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyEarlierState} dummyDispatch={dummyDispatch}>
        <Alerts />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('Alert')).toHaveLength(2);
    expect(enzymeWrapper.find('[data-test-id="alerts-menu-empty"]')).toHaveLength(0);
    expect(enzymeWrapper.find('[data-test-id="alerts-menu-recent"]')).toHaveLength(0);
    // Length of the earlier alerts menu should be 2, because data-test-id is defined
    // on Dropdown.Item, which renders two HTML nodes with the passed data-test-id prop
    expect(enzymeWrapper.find('[data-test-id="alerts-menu-earlier"]')).toHaveLength(2);
  });

  it(`does not render earlier alerts if there are none`, (): void => {
    const dummyRecentState = {
      ...dummyState,
      modules: {
        ...dummyState.modules,
        alerts: {
          ...dummyState.modules.alerts,
          byId: {
            [dummyAlert1.id]: { ...dummyAlert1, timestamp: moment().valueOf() },
            [dummyAlert2.id]: { ...dummyAlert2, timestamp: moment().valueOf() },
          },
        },
      },
    };

    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyRecentState} dummyDispatch={dummyDispatch}>
        <Alerts />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('Alert')).toHaveLength(2);
    expect(enzymeWrapper.find('[data-test-id="alerts-menu-empty"]')).toHaveLength(0);
    // Length of the recent alerts menu should be 2, because data-test-id is defined
    // on Dropdown.Item, which renders two HTML nodes with the passed data-test-id prop
    expect(enzymeWrapper.find('[data-test-id="alerts-menu-recent"]')).toHaveLength(2);
    expect(enzymeWrapper.find('[data-test-id="alerts-menu-earlier"]')).toHaveLength(0);
  });

  it(`renders an 'empty' message when there are no alerts`, (): void => {
    const dummyEmptyState = {
      ...dummyState,
      modules: {
        ...dummyState.modules,
        alerts: {
          ...dummyState.modules.alerts,
          byId: {},
        },
      },
    };

    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyEmptyState} dummyDispatch={dummyDispatch}>
        <Alerts />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('Alert')).toHaveLength(0);
    // Length of the 'empty' message should be 2, because data-test-id is defined
    // on Dropdown.Item, which renders two HTML nodes with the passed data-test-id prop
    expect(enzymeWrapper.find('[data-test-id="alerts-menu-empty"]')).toHaveLength(2);
    expect(enzymeWrapper.find('[data-test-id="alerts-menu-recent"]')).toHaveLength(0);
    expect(enzymeWrapper.find('[data-test-id="alerts-menu-earlier"]')).toHaveLength(0);
  });

  it(`renders the alerts from the state with 'unread' class if they are not marked as read`, (): void => {
    const dummyEarlierState = {
      ...dummyState,
      modules: {
        ...dummyState.modules,
        alerts: {
          ...dummyState.modules.alerts,
          byId: {
            [dummyAlert1.id]: { ...dummyAlert1, read: false },
            [dummyAlert2.id]: { ...dummyAlert2, read: false },
          },
        },
      },
    };

    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyEarlierState} dummyDispatch={dummyDispatch}>
        <Alerts />
      </DummyProviders>,
    );

    enzymeWrapper.find('[data-test-id="alerts-menu-alert"]').forEach((alertWrapper: any): void => {
      expect(alertWrapper.hasClass('unread')).toBe(true);
    });
  });

  it(`renders the alerts from the state without 'unread' class if they are marked as read`, (): void => {
    const dummyEarlierState = {
      ...dummyState,
      modules: {
        ...dummyState.modules,
        alerts: {
          ...dummyState.modules.alerts,
          byId: {
            [dummyAlert1.id]: { ...dummyAlert1, read: true },
            [dummyAlert2.id]: { ...dummyAlert2, read: true },
          },
        },
      },
    };

    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyEarlierState} dummyDispatch={dummyDispatch}>
        <Alerts />
      </DummyProviders>,
    );

    enzymeWrapper.find('[data-test-id="alerts-menu-alert"]').forEach((alertWrapper: any): void => {
      expect(alertWrapper.hasClass('unread')).toBe(false);
    });
  });

  it(`renders the unread dot when there are unread alerts`, (): void => {
    const dummyEarlierState = {
      ...dummyState,
      modules: {
        ...dummyState.modules,
        alerts: {
          ...dummyState.modules.alerts,
          byId: {
            [dummyAlert1.id]: { ...dummyAlert1, read: false },
            [dummyAlert2.id]: { ...dummyAlert2, read: true },
          },
        },
      },
    };

    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyEarlierState} dummyDispatch={dummyDispatch}>
        <Alerts />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="alerts-menu-unread-dot"]')).toHaveLength(1);
  });

  it(`does not render the unread dot when there are no unread alerts`, (): void => {
    const dummyEarlierState = {
      ...dummyState,
      modules: {
        ...dummyState.modules,
        alerts: {
          ...dummyState.modules.alerts,
          byId: {
            [dummyAlert1.id]: { ...dummyAlert1, read: true },
            [dummyAlert2.id]: { ...dummyAlert2, read: true },
          },
        },
      },
    };

    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyEarlierState} dummyDispatch={dummyDispatch}>
        <Alerts />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="alerts-menu-unread-dot"]')).toHaveLength(0);
  });

});
