// @flow

import _ from 'lodash';
import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { DummyProviders, dummyProviderProps, dummyPullRequestData } from 'lib/testResources';

import * as m from '../../../model';

import Ribbon, { PureRibbon } from '.';

describe(`Ribbon`, (): void => {

  let dummyPullRequest: m.PullRequest;

  beforeEach((): void => {
    dummyPullRequest = dummyPullRequestData.pullRequest;
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureRibbon
        {...dummyProviderProps.translatorProps}
        pullRequest={dummyPullRequest}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders a question icon on pending pull request`, (): void => {
    _.set(dummyPullRequest, 'state', m.pullRequestStates.PENDING);

    const enzymeWrapper = mount(
      <DummyProviders>
        <Ribbon pullRequest={dummyPullRequest} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('Icon').props().name).toStrictEqual('question circle');
  });

  it(`renders a question icon on ready pull request`, (): void => {
    _.set(dummyPullRequest, 'state', m.pullRequestStates.READY);

    const enzymeWrapper = mount(
      <DummyProviders>
        <Ribbon pullRequest={dummyPullRequest} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('Icon').props().name).toStrictEqual('question circle');
  });

  it(`renders a question icon on working pull request`, (): void => {
    _.set(dummyPullRequest, 'state', m.pullRequestStates.WORKING);

    const enzymeWrapper = mount(
      <DummyProviders>
        <Ribbon pullRequest={dummyPullRequest} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('Icon').props().name).toStrictEqual('question circle');
  });

  it(`renders an exclamation icon on incompatible pull request`, (): void => {
    _.set(dummyPullRequest, 'state', m.pullRequestStates.INCOMPATIBLE);

    const enzymeWrapper = mount(
      <DummyProviders>
        <Ribbon pullRequest={dummyPullRequest} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('Icon').props().name).toStrictEqual('exclamation circle');
  });

  it(`renders a check icon on accepted pull request`, (): void => {
    _.set(dummyPullRequest, 'state', m.pullRequestStates.ACCEPTED);

    const enzymeWrapper = mount(
      <DummyProviders>
        <Ribbon pullRequest={dummyPullRequest} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('Icon').props().name).toStrictEqual('check');
  });

  it(`renders a times icon on rejected pull request`, (): void => {
    _.set(dummyPullRequest, 'state', m.pullRequestStates.REJECTED);

    const enzymeWrapper = mount(
      <DummyProviders>
        <Ribbon pullRequest={dummyPullRequest} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('Icon').props().name).toStrictEqual('times');
  });

  it(`renders a send icon on unknown state`, (): void => {
    _.set(dummyPullRequest, 'state', null);

    const enzymeWrapper = mount(
      <DummyProviders>
        <Ribbon pullRequest={dummyPullRequest} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('Icon').props().name).toStrictEqual('send');
  });

});
