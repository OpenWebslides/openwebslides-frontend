// @flow

import _ from 'lodash';
import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { DummyProviders, dummyProviderProps, dummyTopicData, dummyInitialState } from 'lib/testResources';
import topics from 'modules/topics';

import PullRequestModal, { PurePullRequestModal } from '.';

describe(`PullRequestModal`, (): void => {

  let dummyMessage: string;
  let dummyDownstreamTopic: topics.model.Topic;
  let dummyUpstreamTopic: topics.model.Topic;
  let dummyTopicsById: topics.model.TopicsById;
  let dummyState: any;
  let dummyDispatch: any;
  let dummyOnSubmit: any;
  let dummyOnCancel: any;

  beforeEach((): void => {
    dummyMessage = 'dummyMessage';
    dummyDownstreamTopic = { ...dummyTopicData.topic, id: 'dummyDownstreamTopic', upstreamTopicId: 'dummyUpstreamTopic' };
    dummyUpstreamTopic = { ...dummyTopicData.topic2, id: 'dummyUpstreamTopic' };
    dummyTopicsById = {
      [dummyDownstreamTopic.id]: dummyDownstreamTopic,
      [dummyUpstreamTopic.id]: dummyUpstreamTopic,
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
    dummyOnSubmit = jest.fn();
    dummyOnCancel = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PurePullRequestModal
        {...dummyProviderProps.translatorProps}
        sourceTopic={dummyDownstreamTopic}
        targetTopic={dummyUpstreamTopic}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`loads the topics, when the topics or its content were not previously present in the state`, (): void => {
    _.unset(dummyTopicsById, dummyDownstreamTopic.id);
    _.unset(dummyTopicsById, dummyUpstreamTopic.id);

    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <PullRequestModal
          sourceTopicId={dummyDownstreamTopic.id}
          targetTopicId={dummyUpstreamTopic.id}
          {...dummyProviderProps.translatorProps}
        />
      </DummyProviders>,
    );

    expect(dummyDispatch).toHaveBeenCalledWith(topics.actions.fetch(dummyDownstreamTopic.id));
    expect(dummyDispatch).toHaveBeenCalledWith(topics.actions.fetch(dummyUpstreamTopic.id));
    expect(enzymeWrapper.find('[data-test-id="pull-request-modal"]').hostNodes()).toHaveLength(0);
  });

  it(`renders the modal, when the topics were previously present in the state`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <PullRequestModal
          {...dummyProviderProps.translatorProps}
          sourceTopicId={dummyDownstreamTopic.id}
          targetTopicId={dummyUpstreamTopic.id}
        />
      </DummyProviders>,
    );

    expect(dummyDispatch).toHaveBeenCalledTimes(0);
    expect(enzymeWrapper.find('[data-test-id="pull-request-modal"]').hostNodes()).toHaveLength(1);
  });

  it(`renders the modal form and submit/cancel buttons, when the passed isOpen prop is TRUE`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <PurePullRequestModal
          {...dummyProviderProps.translatorProps}
          isOpen={true}
          sourceTopic={dummyDownstreamTopic}
          targetTopic={dummyUpstreamTopic}
        />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('PurePullRequestForm')).toHaveLength(1);
    expect(enzymeWrapper.find('[data-test-id="pull-request-modal-submit-button"]').hostNodes()).toHaveLength(1);
    expect(enzymeWrapper.find('[data-test-id="pull-request-modal-cancel-button"]').hostNodes()).toHaveLength(1);
  });

  it(`does not render the modal form and submit/cancel buttons, when the passed isOpen prop is FALSE`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <PurePullRequestModal
          {...dummyProviderProps.translatorProps}
          isOpen={false}
          sourceTopic={dummyDownstreamTopic}
          targetTopic={dummyUpstreamTopic}
        />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('PurePullRequestForm')).toHaveLength(0);
    expect(enzymeWrapper.find('[data-test-id="PullRequest-modal-submit-button"]').hostNodes()).toHaveLength(0);
    expect(enzymeWrapper.find('[data-test-id="PullRequest-modal-cancel-button"]').hostNodes()).toHaveLength(0);
  });

  it(`calls the passed onSubmit callback when the submit button is clicked`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <PurePullRequestModal
          {...dummyProviderProps.translatorProps}
          isOpen={true}
          sourceTopic={dummyDownstreamTopic}
          targetTopic={dummyUpstreamTopic}
          onSubmit={dummyOnSubmit}
          onCancel={dummyOnCancel}
        />
      </DummyProviders>,
    );

    enzymeWrapper.find('[data-test-id="pull-request-modal-submit-button"]').hostNodes().simulate('click');

    enzymeWrapper.find('PurePullRequestForm').props().onSubmit({ message: dummyMessage });
    // Enzyme does not support event propagation yet, so we cannot test out the onSubmit callback by triggering the submit button
    // https://github.com/airbnb/enzyme/issues/308
    expect(dummyOnSubmit).toHaveBeenCalledTimes(1);
    expect(dummyOnCancel).not.toHaveBeenCalledWith(dummyMessage);
  });

  it(`calls the passed onCancel callback when the cancel button is clicked`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <PurePullRequestModal
          {...dummyProviderProps.translatorProps}
          isOpen={true}
          sourceTopic={dummyDownstreamTopic}
          targetTopic={dummyUpstreamTopic}
          onSubmit={dummyOnSubmit}
          onCancel={dummyOnCancel}
          {...dummyProviderProps.translatorProps}
        />
      </DummyProviders>,
    );

    enzymeWrapper.find('[data-test-id="pull-request-modal-cancel-button"]').hostNodes().simulate('click');
    expect(dummyOnSubmit).not.toHaveBeenCalled();
    expect(dummyOnCancel).toHaveBeenCalledTimes(1);
  });

});
