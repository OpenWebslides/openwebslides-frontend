// @flow

import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { DummyProviders, dummyTopicData } from 'lib/testResources';

import * as m from '../../model';

import Contribute from '.';

describe(`Contribute`, (): void => {

  let dummyUpstreamTopic: m.Topic;
  let dummyDownstreamTopic: m.Topic;

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

});
