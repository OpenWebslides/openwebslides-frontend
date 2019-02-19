// @flow

import _ from 'lodash';
import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { DummyProviders, dummyTopicData, dummyUserData, dummyInitialState } from 'lib/testResources';
import { UnsupportedOperationError } from 'errors';
import topics from 'modules/topics';
import users from 'modules/users';

import PullRequestModal, { PurePullRequestModal } from '.';

describe(`PullRequestModal`, (): void => {

  let dummyCurrentUser: users.model.User;
  let dummyMessage: string;
  let dummyDownstreamTopic: topics.model.Topic;
  let dummyUpstreamTopic: topics.model.Topic;
  let dummyTopicsById: topics.model.TopicsById;
  let dummyState: any;
  let dummyDispatch: any;
  let dummyOnSubmit: any;
  let dummyOnCancel: any;
  let dummyFetchTopic: any;

  beforeEach((): void => {
    dummyCurrentUser = { ...dummyUserData.user };
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
        platform: {
          ...dummyInitialState.modules.platform,
          userAuth: {
            userId: dummyCurrentUser.id,
            apiToken: 'foobarToken',
          },
        },
      },
    };
    dummyDispatch = jest.fn();
    dummyOnSubmit = jest.fn();
    dummyOnCancel = jest.fn();
    dummyFetchTopic = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PurePullRequestModal
        sourceTopicId={dummyDownstreamTopic.id}
        sourceTopic={dummyDownstreamTopic}
        targetTopicId={dummyUpstreamTopic.id}
        targetTopic={dummyUpstreamTopic}
        currentUserId={dummyCurrentUser.id}
        isOpen={true}
        onSubmit={dummyOnSubmit}
        onCancel={dummyOnCancel}
        fetchTopic={dummyFetchTopic}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`throws an UnsupportedOperationError, when there is no current user`, (): void => {
    dummyState.modules.platform.userAuth = null;

    // Suppress console.error from mount $FlowFixMe
    console.error = jest.fn();
    expect((): void => {
      mount(
        <DummyProviders dummyState={dummyState}>
          <PullRequestModal
            isOpen={true}
            sourceTopicId={dummyDownstreamTopic.id}
            targetTopicId={dummyUpstreamTopic.id}
            onSubmit={dummyOnSubmit}
            onCancel={dummyOnCancel}
          />
        </DummyProviders>,
      );
    }).toThrow(UnsupportedOperationError);
  });

  it(`loads the topics, when the topics or its content were not previously present in the state`, (): void => {
    _.unset(dummyTopicsById, dummyDownstreamTopic.id);
    _.unset(dummyTopicsById, dummyUpstreamTopic.id);

    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <PullRequestModal
          isOpen={true}
          sourceTopicId={dummyDownstreamTopic.id}
          targetTopicId={dummyUpstreamTopic.id}
          onSubmit={dummyOnSubmit}
          onCancel={dummyOnCancel}
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
          isOpen={true}
          sourceTopicId={dummyDownstreamTopic.id}
          targetTopicId={dummyUpstreamTopic.id}
          onSubmit={dummyOnSubmit}
          onCancel={dummyOnCancel}
        />
      </DummyProviders>,
    );

    expect(dummyDispatch).toHaveBeenCalledTimes(0);
    expect(enzymeWrapper.find('[data-test-id="pull-request-modal"]').hostNodes()).toHaveLength(1);
  });

  it(`renders the modal form and submit/cancel buttons, when the passed isOpen prop is TRUE`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <PullRequestModal
          isOpen={true}
          sourceTopicId={dummyDownstreamTopic.id}
          targetTopicId={dummyUpstreamTopic.id}
          onSubmit={dummyOnSubmit}
          onCancel={dummyOnCancel}
        />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('PurePullRequestForm')).toHaveLength(1);
    expect(enzymeWrapper.find('[data-test-id="pull-request-modal-submit-button"]').hostNodes()).toHaveLength(1);
    expect(enzymeWrapper.find('[data-test-id="pull-request-modal-cancel-button"]').hostNodes()).toHaveLength(1);
  });

  it(`does not render the modal form and submit/cancel buttons, when the passed isOpen prop is FALSE`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <PullRequestModal
          isOpen={false}
          sourceTopicId={dummyDownstreamTopic.id}
          targetTopicId={dummyUpstreamTopic.id}
          onSubmit={dummyOnSubmit}
          onCancel={dummyOnCancel}
        />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('PurePullRequestForm')).toHaveLength(0);
    expect(enzymeWrapper.find('[data-test-id="PullRequest-modal-submit-button"]').hostNodes()).toHaveLength(0);
    expect(enzymeWrapper.find('[data-test-id="PullRequest-modal-cancel-button"]').hostNodes()).toHaveLength(0);
  });

  it(`calls the passed onSubmit callback when the submit button is clicked`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <PullRequestModal
          isOpen={true}
          sourceTopicId={dummyDownstreamTopic.id}
          targetTopicId={dummyUpstreamTopic.id}
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
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <PullRequestModal
          isOpen={true}
          sourceTopicId={dummyDownstreamTopic.id}
          targetTopicId={dummyUpstreamTopic.id}
          onSubmit={dummyOnSubmit}
          onCancel={dummyOnCancel}
        />
      </DummyProviders>,
    );

    enzymeWrapper.find('[data-test-id="pull-request-modal-cancel-button"]').hostNodes().simulate('click');
    expect(dummyOnSubmit).not.toHaveBeenCalled();
    expect(dummyOnCancel).toHaveBeenCalledTimes(1);
  });

});
