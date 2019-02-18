// @flow

import _ from 'lodash';
import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { DummyProviders, dummyPullRequestData, dummyTopicData } from 'lib/testResources';
import topics from 'modules/topics';

import * as m from '../../../../model';

import State, { PureState } from '.';

describe(`State`, (): void => {

  let dummyPullRequest: m.PullRequest;
  let dummyTopic: topics.model.Topic;

  beforeEach((): void => {
    dummyPullRequest = dummyPullRequestData.pullRequest;
    dummyTopic = dummyTopicData.topic;
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureState
        pullRequest={dummyPullRequest}
        source={dummyTopic}
        target={dummyTopic}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders a question icon on pending pull request`, (): void => {
    _.set(dummyPullRequest, 'state', m.pullRequestStates.PENDING);

    const enzymeWrapper = mount(
      <DummyProviders>
        <State pullRequest={dummyPullRequest} source={dummyTopic} target={dummyTopic} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('Icon').props().name).toStrictEqual('question');
  });

  it(`renders a question icon on ready pull request`, (): void => {
    _.set(dummyPullRequest, 'state', m.pullRequestStates.READY);

    const enzymeWrapper = mount(
      <DummyProviders>
        <State pullRequest={dummyPullRequest} source={dummyTopic} target={dummyTopic} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('Icon').props().name).toStrictEqual('question');
  });

  it(`renders a question icon on working pull request`, (): void => {
    _.set(dummyPullRequest, 'state', m.pullRequestStates.WORKING);

    const enzymeWrapper = mount(
      <DummyProviders>
        <State pullRequest={dummyPullRequest} source={dummyTopic} target={dummyTopic} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('Icon').props().name).toStrictEqual('question');
  });

  it(`renders an exclamation icon on incompatible pull request`, (): void => {
    _.set(dummyPullRequest, 'state', m.pullRequestStates.INCOMPATIBLE);

    const enzymeWrapper = mount(
      <DummyProviders>
        <State pullRequest={dummyPullRequest} source={dummyTopic} target={dummyTopic} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('Icon').props().name).toStrictEqual('exclamation');
  });

  it(`renders a check icon on accepted pull request`, (): void => {
    _.set(dummyPullRequest, 'state', m.pullRequestStates.ACCEPTED);

    const enzymeWrapper = mount(
      <DummyProviders>
        <State pullRequest={dummyPullRequest} source={dummyTopic} target={dummyTopic} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('Icon').props().name).toStrictEqual('check');
  });

  it(`renders a times icon on rejected pull request`, (): void => {
    _.set(dummyPullRequest, 'state', m.pullRequestStates.REJECTED);

    const enzymeWrapper = mount(
      <DummyProviders>
        <State pullRequest={dummyPullRequest} source={dummyTopic} target={dummyTopic} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('Icon').props().name).toStrictEqual('times');
  });

  it(`renders a send icon on unknown state`, (): void => {
    _.set(dummyPullRequest, 'state', null);

    const enzymeWrapper = mount(
      <DummyProviders>
        <State pullRequest={dummyPullRequest} source={dummyTopic} target={dummyTopic} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('Icon').props().name).toStrictEqual('send');
  });

});
