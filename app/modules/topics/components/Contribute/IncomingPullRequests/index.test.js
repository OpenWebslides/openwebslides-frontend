// @flow

import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { DummyProviders, dummyProviderProps, dummyTopicData } from 'lib/testResources';

import * as m from '../../../model';

import IncomingPullRequests, { PureIncomingPullRequests } from '.';

describe(`IncomingPullRequests`, (): void => {

  let dummyTopic: m.Topic;

  beforeEach((): void => {
    dummyTopic = { ...dummyTopicData.topic };
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureIncomingPullRequests
        {...dummyProviderProps.translatorProps}
        topic={dummyTopic}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders the empty message when the topic has no incoming pull requests`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <IncomingPullRequests topic={{ ...dummyTopic, incomingPullRequestIds: [] }} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="incoming-pull-requests-empty-message"]').hostNodes()).toHaveLength(1);
  });

  it(`renders an IncomingPullRequest component and no empty message for every incoming pull request in the topic`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <IncomingPullRequests topic={{ ...dummyTopic, incomingPullRequestIds: ['foo', 'bar'] }} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="incoming-pull-requests-empty-message"]').hostNodes()).toHaveLength(0);
    expect(enzymeWrapper.find('PureIncomingPullRequest')).toHaveLength(2);
  });

});
