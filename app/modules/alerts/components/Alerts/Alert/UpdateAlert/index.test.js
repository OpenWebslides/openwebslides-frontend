// @flow

import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { push } from 'connected-react-router';

import { TOPIC_EDITOR_ROUTE } from 'config/routes';
import makeRoute from 'lib/makeRoute';
import { DummyProviders, dummyInitialState, dummyAlertData, dummyTopicData } from 'lib/testResources';
import topics from 'modules/topics';

import actions from '../../../../actions';
import * as m from '../../../../model';

import UpdateAlert, { PureUpdateAlert } from '.';

describe(`UpdateAlert`, (): void => {

  let dummyTopic: topics.model.Topic;
  let dummyAlert: m.UpdateAlert;
  let dummyState: any;
  let dummyDispatch: any;

  beforeEach((): void => {
    dummyTopic = { ...dummyTopicData.topic };
    dummyAlert = { ...dummyAlertData.updateAlert1, topicId: dummyTopic.id };
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
      },
    };
    dummyDispatch = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureUpdateAlert
        alert={dummyAlert}
        topic={dummyTopic}
        fetchTopic={jest.fn()}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`fetches the alert's associated topic, when the topic was not previously present in the state`, (): void => {
    dummyState.modules.topics.byId = {};

    mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <UpdateAlert alert={dummyAlert} />
      </DummyProviders>,
    );

    expect(dummyDispatch).toHaveBeenCalledWith(topics.actions.fetch(dummyAlert.topicId));
  });

  it(`renders the alert, when the associated topic was previously present in the state`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <UpdateAlert alert={dummyAlert} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="alert"]').hostNodes()).toHaveLength(1);
  });

  it(`dispatches a MARK_AS_READ action, and a PUSH action to the editor when an unread alert is clicked`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <UpdateAlert alert={{ ...dummyAlert, read: false }} />
      </DummyProviders>,
    );

    enzymeWrapper.find('[data-test-id="alert"]').hostNodes().simulate('click');

    expect(dummyDispatch).toHaveBeenCalledWith(actions.markAsRead(dummyAlert.id));
    expect(dummyDispatch).toHaveBeenCalledWith(push(makeRoute(TOPIC_EDITOR_ROUTE, { topicId: dummyAlert.topicId })));
  });

  it(`dispatches a PUSH action to the editor when a read alert is clicked`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <UpdateAlert alert={{ ...dummyAlert, read: true }} />
      </DummyProviders>,
    );

    enzymeWrapper.find('[data-test-id="alert"]').hostNodes().simulate('click');

    expect(dummyDispatch).toHaveBeenCalledWith(push(makeRoute(TOPIC_EDITOR_ROUTE, { topicId: dummyAlert.topicId })));
  });

});
