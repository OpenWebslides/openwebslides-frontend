// @flow

import _ from 'lodash';
import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { DummyProviders, dummyProviderProps, dummyTopicData, dummyUserData, dummyInitialState } from 'lib/testResources';
import topics from 'modules/topics';
import users from 'modules/users';

import AcceptPullRequestModal, { PureAcceptPullRequestModal } from '.';

describe(`AcceptPullRequestModal`, (): void => {

  let dummyCurrentUser: users.model.User;
  let dummyMessage: string;
  let dummyDownstreamTopic: topics.model.Topic;
  let dummyUpstreamTopic: topics.model.Topic;
  let dummyTopicsById: topics.model.TopicsById;
  let dummyState: any;
  let dummyDispatch: any;
  let dummyOnSubmit: any;
  let dummyOnCancel: any;

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
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureAcceptPullRequestModal
        {...dummyProviderProps.translatorProps}
        sourceTopic={dummyDownstreamTopic}
        targetTopic={dummyUpstreamTopic}
        currentUserId={dummyCurrentUser.id}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`does not render with currentUserId NULL, when there is no current user`, (): void => {
    dummyState.modules.platform.userAuth = null;

    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState}>
        <AcceptPullRequestModal
          isOpen={true}
          sourceTopicId={dummyDownstreamTopic.id}
          targetTopicId={dummyUpstreamTopic.id}
          onSubmit={dummyOnSubmit}
          onCancel={dummyOnCancel}
        />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find(`PureAcceptPullRequestModal`).props().currentUserId).toBeNull();
  });

  it(`loads the topics, when the topics or its content were not previously present in the state`, (): void => {
    _.unset(dummyTopicsById, dummyDownstreamTopic.id);
    _.unset(dummyTopicsById, dummyUpstreamTopic.id);

    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <AcceptPullRequestModal
          isOpen={true}
          sourceTopicId={dummyDownstreamTopic.id}
          targetTopicId={dummyUpstreamTopic.id}
          currentUserId={dummyCurrentUser.id}
          onSubmit={dummyOnSubmit}
          onCancel={dummyOnCancel}
        />
      </DummyProviders>,
    );

    expect(dummyDispatch).toHaveBeenCalledWith(topics.actions.fetch(dummyDownstreamTopic.id));
    expect(dummyDispatch).toHaveBeenCalledWith(topics.actions.fetch(dummyUpstreamTopic.id));
    expect(enzymeWrapper.find('[data-test-id="accept-pull-request-modal"]').hostNodes()).toHaveLength(0);
  });

  it(`renders the modal, when the topics were previously present in the state`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <AcceptPullRequestModal
          isOpen={true}
          sourceTopicId={dummyDownstreamTopic.id}
          targetTopicId={dummyUpstreamTopic.id}
          currentUserId={dummyCurrentUser.id}
          onSubmit={dummyOnSubmit}
          onCancel={dummyOnCancel}
        />
      </DummyProviders>,
    );

    expect(dummyDispatch).toHaveBeenCalledTimes(0);
    expect(enzymeWrapper.find('[data-test-id="accept-pull-request-modal"]').hostNodes()).toHaveLength(1);
  });

  it(`renders the modal form and submit/cancel buttons, when the passed isOpen prop is TRUE`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <PureAcceptPullRequestModal
          {...dummyProviderProps.translatorProps}
          isOpen={true}
          sourceTopic={dummyDownstreamTopic}
          targetTopic={dummyUpstreamTopic}
          currentUserId={dummyCurrentUser.id}
        />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('PureFeedbackForm')).toHaveLength(1);
    expect(enzymeWrapper.find('[data-test-id="accept-pull-request-modal-submit-button"]').hostNodes()).toHaveLength(1);
    expect(enzymeWrapper.find('[data-test-id="accept-pull-request-modal-cancel-button"]').hostNodes()).toHaveLength(1);
  });

  it(`does not render the modal form and submit/cancel buttons, when the passed isOpen prop is FALSE`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <PureAcceptPullRequestModal
          {...dummyProviderProps.translatorProps}
          isOpen={false}
          sourceTopic={dummyDownstreamTopic}
          targetTopic={dummyUpstreamTopic}
        />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('PureFeedbackForm')).toHaveLength(0);
    expect(enzymeWrapper.find('[data-test-id="PullRequest-modal-submit-button"]').hostNodes()).toHaveLength(0);
    expect(enzymeWrapper.find('[data-test-id="PullRequest-modal-cancel-button"]').hostNodes()).toHaveLength(0);
  });

  it(`calls the passed onSubmit callback when the submit button is clicked`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <PureAcceptPullRequestModal
          {...dummyProviderProps.translatorProps}
          isOpen={true}
          sourceTopic={dummyDownstreamTopic}
          targetTopic={dummyUpstreamTopic}
          currentUserId={dummyCurrentUser.id}
          onSubmit={dummyOnSubmit}
          onCancel={dummyOnCancel}
        />
      </DummyProviders>,
    );

    enzymeWrapper.find('[data-test-id="accept-pull-request-modal-submit-button"]').hostNodes().simulate('click');

    enzymeWrapper.find('PureFeedbackForm').props().onSubmit({ message: dummyMessage });
    // Enzyme does not support event propagation yet, so we cannot test out the onSubmit callback by triggering the submit button
    // https://github.com/airbnb/enzyme/issues/308
    expect(dummyOnSubmit).toHaveBeenCalledTimes(1);
    expect(dummyOnCancel).not.toHaveBeenCalledWith(dummyMessage);
  });

  it(`calls the passed onCancel callback when the cancel button is clicked`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <PureAcceptPullRequestModal
          {...dummyProviderProps.translatorProps}
          isOpen={true}
          sourceTopic={dummyDownstreamTopic}
          targetTopic={dummyUpstreamTopic}
          currentUserId={dummyCurrentUser.id}
          onSubmit={dummyOnSubmit}
          onCancel={dummyOnCancel}
          {...dummyProviderProps.translatorProps}
        />
      </DummyProviders>,
    );

    enzymeWrapper.find('[data-test-id="accept-pull-request-modal-cancel-button"]').hostNodes().simulate('click');
    expect(dummyOnSubmit).not.toHaveBeenCalled();
    expect(dummyOnCancel).toHaveBeenCalledTimes(1);
  });

});
