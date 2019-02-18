// @flow

import _ from 'lodash';
import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { DummyProviders, dummyTopicData, dummyInitialState } from 'lib/testResources';
import topics from 'modules/topics';

import actions from '../../../actions';

import SendUpdates, { PureSendUpdates } from '.';

describe(`SendUpdates`, (): void => {

  let dummyTopic: topics.model.Topic;
  let dummyDirtyTopic: topics.model.Topic;
  let dummyUpstreamTopic: topics.model.Topic;
  let dummyDownstreamTopic: topics.model.Topic;
  let dummyTopicsById: topics.model.TopicsById;
  let dummyState: any;
  let dummyDispatch: any;
  let dummyCurrentUserId: string;
  let dummyMessage: string;

  beforeEach((): void => {
    dummyTopic = { ...dummyTopicData.topic };
    dummyDirtyTopic = { ...dummyTopicData.downstream, id: 'dummyDirtyTopic', isContentFetched: true, isDirty: true };
    dummyUpstreamTopic = { ...dummyTopicData.upstream, isContentFetched: true };
    dummyDownstreamTopic = { ...dummyTopicData.downstream, isContentFetched: true };
    dummyTopicsById = {
      [dummyTopic.id]: dummyTopic,
      [dummyDirtyTopic.id]: dummyDirtyTopic,
      [dummyUpstreamTopic.id]: dummyUpstreamTopic,
      [dummyDownstreamTopic.id]: dummyDownstreamTopic,
    };
    dummyState = {
      ...dummyInitialState,
      modules: {
        ...dummyInitialState.modules,
        topics: {
          ...dummyInitialState.modules.topics,
          byId: dummyTopicsById,
        },
      },
    };
    dummyDispatch = jest.fn();
    dummyCurrentUserId = 'dummyCurrentUserId';
    dummyMessage = 'dummyMessage';
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureSendUpdates topic={dummyTopic} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`loads the upstream topic, when the upstream topic was not previously present in the state`, (): void => {
    _.unset(dummyTopicsById, dummyUpstreamTopic.id);

    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <SendUpdates topic={dummyDownstreamTopic} />
      </DummyProviders>,
    );

    expect(dummyDispatch).toHaveBeenCalledWith(topics.actions.fetch(dummyUpstreamTopic.id));
    expect(enzymeWrapper.find('[data-test-id="send-updates"]').hostNodes()).toHaveLength(0);
  });

  it(`renders the send updates component, when the upstream topic was previously present in the state`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <SendUpdates topic={dummyDownstreamTopic} />
      </DummyProviders>,
    );

    expect(dummyDispatch).toHaveBeenCalledTimes(0);
    expect(enzymeWrapper.find('[data-test-id="send-updates"]').hostNodes()).toHaveLength(1);
  });

  it(`disables the pull request button and shows a message when the topic is dirty`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <SendUpdates topic={dummyDirtyTopic} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="send-updates-dirty-message"]').hostNodes()).toHaveLength(1);
    expect(enzymeWrapper.find('[data-test-id="send-updates-pull-request-button"][disabled]').hostNodes()).toHaveLength(1);
  });

  it(`enables the pull request button and shows no message when the topic is not dirty`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <SendUpdates topic={dummyTopic} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="send-updates-dirty-message"]').hostNodes()).toHaveLength(0);
    expect(enzymeWrapper.find('[data-test-id="send-updates-pull-request-button"][disabled]').hostNodes()).toHaveLength(0);
  });

  it(`disables the pull request button and shows a message when the topic has an open pull request`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <SendUpdates topic={{ ...dummyDirtyTopic, hasOpenPullRequest: true }} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="send-updates-pull-request-open-message"]').hostNodes()).toHaveLength(1);
    expect(enzymeWrapper.find('[data-test-id="send-updates-pull-request-button"][disabled]').hostNodes()).toHaveLength(1);
  });

  it(`enables the pull request button and shows no message when the topic has no open pull request`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <SendUpdates topic={dummyTopic} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="send-updates-pull-request-open-message"]').hostNodes()).toHaveLength(0);
    expect(enzymeWrapper.find('[data-test-id="send-updates-pull-request-button"][disabled]').hostNodes()).toHaveLength(0);
  });

  it(`shows the pull request modal when the pull request button is clicked`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <SendUpdates topic={dummyDownstreamTopic} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('PurePullRequestModal').props().isOpen).toBe(false);
    enzymeWrapper.find('[data-test-id="send-updates-pull-request-button"]').hostNodes().simulate('click');
    expect(enzymeWrapper.find('PurePullRequestModal').props().isOpen).toBe(true);
  });

  it(`closes the pull request modal when the onCancel handler passed to the pull request modal is called`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <SendUpdates topic={dummyDownstreamTopic} />
      </DummyProviders>,
    );

    const onCancel = enzymeWrapper.find('PurePullRequestModal').props().onCancel;

    expect(enzymeWrapper.find('PurePullRequestModal').props().isOpen).toBe(false);
    enzymeWrapper.find('[data-test-id="send-updates-pull-request-button"]').hostNodes().simulate('click');
    expect(enzymeWrapper.find('PurePullRequestModal').props().isOpen).toBe(true);
    onCancel();
    enzymeWrapper.update();
    expect(enzymeWrapper.find('PurePullRequestModal').props().isOpen).toBe(false);
  });

  it(`dispatches a pull requests CREATE action and closes the pull request modal when the onSubmit handler passed to the pull request modal is called`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <SendUpdates topic={dummyDownstreamTopic} />
      </DummyProviders>,
    );

    const onSubmit = enzymeWrapper.find('PurePullRequestModal').props().onSubmit;

    expect(enzymeWrapper.find('PurePullRequestModal').props().isOpen).toBe(false);
    enzymeWrapper.find('[data-test-id="send-updates-pull-request-button"]').hostNodes().simulate('click');
    expect(enzymeWrapper.find('PurePullRequestModal').props().isOpen).toBe(true);
    onSubmit(dummyMessage, dummyDownstreamTopic.id, dummyDownstreamTopic.upstreamTopicId, dummyCurrentUserId);
    expect(dummyDispatch).toHaveBeenCalledWith(actions.create(dummyMessage, dummyDownstreamTopic.id, (dummyDownstreamTopic.upstreamTopicId || ''), dummyCurrentUserId));
    enzymeWrapper.update();
    expect(enzymeWrapper.find('PurePullRequestModal').props().isOpen).toBe(false);
  });

});
