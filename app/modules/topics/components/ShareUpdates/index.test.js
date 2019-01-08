// @flow

import _ from 'lodash';
import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { DummyProviders, dummyProviderProps, dummyTopicData, dummyInitialState } from 'lib/testResources';
import pullRequests from 'modules/pullRequests';

import actions from '../../actions';
import * as m from '../../model';

import ShareUpdates, { PureShareUpdates } from '.';

describe(`ShareUpdates`, (): void => {

  let dummyTopic: m.Topic;
  let dummyDirtyTopic: m.Topic;
  let dummyUpstreamTopic: m.Topic;
  let dummyDownstreamTopic: m.Topic;
  let dummyTopicsById: m.TopicsById;
  let dummyState: any;
  let dummyDispatch: any;
  let dummyCurrentUserId: string;
  let dummyMessage: string;

  beforeEach((): void => {
    dummyTopic = { ...dummyTopicData.topic };
    dummyDirtyTopic = { ...dummyTopicData.topic, id: 'dummyDirtyTopic', isContentFetched: true, isDirty: true };
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
      <PureShareUpdates
        {...dummyProviderProps.translatorProps}
        topic={dummyTopic}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`loads the topic, when the topic or its content was not previously present in the state`, (): void => {
    _.unset(dummyTopicsById, dummyTopic.id);

    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <ShareUpdates topic={dummyTopic} />
      </DummyProviders>,
    );

    expect(dummyDispatch).toHaveBeenCalledWith(actions.fetchWithContent(dummyTopic.id));
    expect(enzymeWrapper.find('[data-test-id="share-updates"]').hostNodes()).toHaveLength(0);
  });

  it(`renders the share updates component, when the topic and its content were previously present in the state`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <ShareUpdates topic={dummyTopic} />
      </DummyProviders>,
    );

    expect(dummyDispatch).toHaveBeenCalledTimes(0);
    expect(enzymeWrapper.find('[data-test-id="share-updates"]').hostNodes()).toHaveLength(1);
  });

  it(`disables the pull request button and shows a message when the topic is dirty`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <ShareUpdates topic={dummyTopic} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="share-updates-dirty-message"]').hostNodes()).toHaveLength(1);
    expect(enzymeWrapper.find('[data-test-id="share-updates-pull-request-button"]').hostNodes()).toHaveLength(1);
    expect(enzymeWrapper.find('[data-test-id="share-updates-pull-request-button"][disabled]').hostNodes()).toHaveLength(1);
  });

  it(`enables the pull request button and shows no message when the topic is not dirty`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <ShareUpdates topic={dummyTopic} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="share-updates-dirty-message"]').hostNodes()).toHaveLength(0);
    expect(enzymeWrapper.find('[data-test-id="share-updates-pull-request-button"]').hostNodes()).toHaveLength(1);
    expect(enzymeWrapper.find('[data-test-id="share-updates-pull-request-button"][disabled]').hostNodes()).toHaveLength(0);
  });

  it(`shows the pull request modal when the pull request button is clicked`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <ShareUpdates topic={dummyDownstreamTopic} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('PurePullRequestModal').props().isOpen).toBe(false);
    enzymeWrapper.find('[data-test-id="share-updates-pull-request-button"]').hostNodes().simulate('click');
    expect(enzymeWrapper.find('PurePullRequestModal').props().isOpen).toBe(true);
  });

  it(`closes the pull request modal when the onCancel handler passed to the pull request modal is called`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <ShareUpdates topic={dummyDownstreamTopic} />
      </DummyProviders>,
    );

    const onCancel = enzymeWrapper.find('PurePullRequestModal').props().onCancel;

    expect(enzymeWrapper.find('PurePullRequestModal').props().isOpen).toBe(false);
    enzymeWrapper.find('[data-test-id="share-updates-pull-request-button"]').hostNodes().simulate('click');
    expect(enzymeWrapper.find('PurePullRequestModal').props().isOpen).toBe(true);
    onCancel();
    enzymeWrapper.update();
    expect(enzymeWrapper.find('PurePullRequestModal').props().isOpen).toBe(false);
  });

  it(`dispatches a pull requests CREATE action and closes the pull request modal when the onSubmit handler passed to the pull request modal is called`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <ShareUpdates topic={dummyDownstreamTopic} />
      </DummyProviders>,
    );

    const onSubmit = enzymeWrapper.find('PurePullRequestModal').props().onSubmit;

    expect(enzymeWrapper.find('PurePullRequestModal').props().isOpen).toBe(false);
    enzymeWrapper.find('[data-test-id="topic-editor-pull-request-button"]').hostNodes().simulate('click');
    expect(enzymeWrapper.find('PurePullRequestModal').props().isOpen).toBe(true);
    onSubmit(dummyMessage, dummyDownstreamTopic.id, dummyDownstreamTopic.upstreamTopicId, dummyCurrentUserId);
    expect(dummyDispatch).toHaveBeenCalledWith(pullRequests.actions.create(dummyMessage, dummyDownstreamTopic.id, (dummyDownstreamTopic.upstreamTopicId || ''), dummyCurrentUserId));
    enzymeWrapper.update();
    expect(enzymeWrapper.find('PurePullRequestModal').props().isOpen).toBe(false);
  });

});
