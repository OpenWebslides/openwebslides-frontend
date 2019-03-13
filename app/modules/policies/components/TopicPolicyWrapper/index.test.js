// @flow

import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { DummyProviders, dummyInitialState, dummyTopicData, dummyUserData } from 'lib/testResources';
import users from 'modules/users';
import topics from 'modules/topics';

import policies from '../../policies';

import TopicPolicyWrapper, { PureTopicPolicyWrapper } from '.';

describe(`TopicPolicyWrapper`, (): void => {

  let dummyUser: users.model.User;
  let dummyTopic: topics.model.Topic;
  let dummyState: any;
  let dummyDispatch: any;
  let DummyComponent: () => React.Node;

  beforeEach((): void => {
    dummyUser = dummyUserData.user;
    dummyTopic = { ...dummyTopicData.topic, userId: dummyUser.id };
    dummyState = {
      ...dummyInitialState,
      modules: {
        ...dummyInitialState.modules,
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
    DummyComponent = (): React.Node => (<p>dummy</p>);
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureTopicPolicyWrapper
        topicId={dummyTopic.id}
        action="update"
        redirectIfNotAuthenticated={null}
        componentIfNotAuthenticated={null}
      >
        <p>children</p>
      </PureTopicPolicyWrapper>,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`loads the topic, when the topic was not previously present in the state`, (): void => {
    dummyState.modules.topics.byId = {};

    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <TopicPolicyWrapper
          topicId={dummyTopic.id}
          action="update"
          redirectIfNotAuthenticated={null}
          componentIfNotAuthenticated={null}
        >
          <p data-test-id="topic-policy-wrapper-children">children</p>
        </TopicPolicyWrapper>
      </DummyProviders>,
    );

    expect(dummyDispatch).toHaveBeenCalledWith(topics.actions.fetch(dummyTopic.id));
    expect(enzymeWrapper.find('[data-test-id="topic-policy-wrapper-children"]').hostNodes()).toHaveLength(0);
  });

  it(`renders a PolicyWrapper with a topic policy, the fetched topic and the passed props`, (): void => {

    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <TopicPolicyWrapper
          topicId={dummyTopic.id}
          action="update"
          redirectIfNotAuthenticated="myredirect"
          componentIfNotAuthenticated={DummyComponent}
        >
          <p data-test-id="topic-policy-wrapper-children">children</p>
        </TopicPolicyWrapper>
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('PurePolicyWrapper').props().record).toStrictEqual(dummyTopic);
    expect(enzymeWrapper.find('PurePolicyWrapper').props().policy).toStrictEqual(policies.TopicPolicy);
    expect(enzymeWrapper.find('PurePolicyWrapper').props().action).toStrictEqual('update');
    expect(enzymeWrapper.find('PurePolicyWrapper').props().redirectIfNotAuthenticated).toStrictEqual('myredirect');
    expect(enzymeWrapper.find('PurePolicyWrapper').props().componentIfNotAuthenticated).toStrictEqual(DummyComponent);
  });

});
