// @flow

import * as React from 'react';
import { mount } from 'enzyme';

import { DummyProviders, dummyTopicData } from 'lib/testResources';
import topics from 'modules/topics';

import Contribute from '.';

describe(`Contribute`, (): void => {

  let dummyUpstreamTopic: topics.model.Topic;
  let dummyDownstreamTopic: topics.model.Topic;

  beforeEach((): void => {
    dummyUpstreamTopic = { ...dummyTopicData.upstream, isContentFetched: true };
    dummyDownstreamTopic = { ...dummyTopicData.downstream, isContentFetched: true };
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <Contribute topic={dummyDownstreamTopic} />
      </DummyProviders>,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders a send updates and an outgoing pull requests section when the topic has an upstream`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <Contribute topic={dummyDownstreamTopic} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('PureSendUpdates')).toHaveLength(1);
    expect(enzymeWrapper.find('PureOutgoingPullRequests')).toHaveLength(1);
  });

  it(`renders an incoming pull requests section when the topic has no upstream`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <Contribute topic={dummyUpstreamTopic} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('PureIncomingPullRequests')).toHaveLength(1);
  });

});
