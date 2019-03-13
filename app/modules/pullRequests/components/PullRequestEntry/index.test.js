// @flow

import _ from 'lodash';
import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { DummyProviders, dummyPullRequestData, dummyInitialState } from 'lib/testResources';

import actions from '../../actions';
import * as m from '../../model';

import PullRequestEntry, { PurePullRequestEntry } from '.';

describe(`PullRequestEntry`, (): void => {

  let dummyPullRequest: m.PullRequest;
  let dummyPullRequestsById: m.PullRequestsById;
  let dummyState: any;
  let dummyDispatch: any;

  beforeEach((): void => {
    dummyPullRequest = dummyPullRequestData.pullRequest;
    dummyPullRequestsById = {
      [dummyPullRequest.id]: dummyPullRequest,
    };
    dummyState = {
      ...dummyInitialState,
      modules: {
        ...dummyInitialState.modules,
        pullRequests: {
          ...dummyInitialState.modules.pullRequests,
          byId: dummyPullRequestsById,
        },
      },
    };
    dummyDispatch = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PurePullRequestEntry pullRequestId={dummyPullRequest.id} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`loads the pull request, when the upstream pullRequest was not previously present in the state`, (): void => {
    _.unset(dummyPullRequestsById, dummyPullRequest.id);

    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <PullRequestEntry pullRequestId={dummyPullRequest.id} />
      </DummyProviders>,
    );

    expect(dummyDispatch).toHaveBeenCalledWith(actions.fetch(dummyPullRequest.id));
    expect(enzymeWrapper.find('[data-test-id="pull-request"]').hostNodes()).toHaveLength(0);
  });

  it(`renders the outgoing pull request component, when the pull request was previously present in the state`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <PullRequestEntry pullRequestId={dummyPullRequest.id} />
      </DummyProviders>,
    );

    expect(dummyDispatch).toHaveBeenCalledTimes(0);
    expect(enzymeWrapper.find('[data-test-id="pull-request"]').hostNodes()).toHaveLength(1);
  });

  it(`renders the pull request message`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <PullRequestEntry pullRequestId={dummyPullRequest.id} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="pull-request-message"]').hostNodes().html()).toContain(dummyPullRequest.message);
  });

  describe(`renders the correct icon`, (): void => {

    it(`renders a question on pending pull request`, (): void => {
      _.set(dummyPullRequest, 'state', m.pullRequestStates.PENDING);

      const enzymeWrapper = mount(
        <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
          <PullRequestEntry pullRequestId={dummyPullRequest.id} />
        </DummyProviders>,
      );

      expect(enzymeWrapper.find('Icon').props().name).toStrictEqual('question circle');
    });

    it(`renders a question on ready pull request`, (): void => {
      _.set(dummyPullRequest, 'state', m.pullRequestStates.READY);

      const enzymeWrapper = mount(
        <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
          <PullRequestEntry pullRequestId={dummyPullRequest.id} />
        </DummyProviders>,
      );

      expect(enzymeWrapper.find('Icon').props().name).toStrictEqual('question circle');
    });

    it(`renders a question on working pull request`, (): void => {
      _.set(dummyPullRequest, 'state', m.pullRequestStates.WORKING);

      const enzymeWrapper = mount(
        <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
          <PullRequestEntry pullRequestId={dummyPullRequest.id} />
        </DummyProviders>,
      );

      expect(enzymeWrapper.find('Icon').props().name).toStrictEqual('question circle');
    });

    it(`renders an exclamation on incompatible pull request`, (): void => {
      _.set(dummyPullRequest, 'state', m.pullRequestStates.INCOMPATIBLE);

      const enzymeWrapper = mount(
        <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
          <PullRequestEntry pullRequestId={dummyPullRequest.id} />
        </DummyProviders>,
      );

      expect(enzymeWrapper.find('Icon').props().name).toStrictEqual('exclamation circle');
    });

    it(`renders a check on accepted pull request`, (): void => {
      _.set(dummyPullRequest, 'state', m.pullRequestStates.ACCEPTED);

      const enzymeWrapper = mount(
        <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
          <PullRequestEntry pullRequestId={dummyPullRequest.id} />
        </DummyProviders>,
      );

      expect(enzymeWrapper.find('Icon').props().name).toStrictEqual('check');
    });

    it(`renders a close on rejected pull request`, (): void => {
      _.set(dummyPullRequest, 'state', m.pullRequestStates.REJECTED);

      const enzymeWrapper = mount(
        <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
          <PullRequestEntry pullRequestId={dummyPullRequest.id} />
        </DummyProviders>,
      );

      expect(enzymeWrapper.find('Icon').props().name).toStrictEqual('close');
    });

    it(`renders no icon on unknown state`, (): void => {
      _.set(dummyPullRequest, 'state', null);

      const enzymeWrapper = mount(
        <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
          <PullRequestEntry pullRequestId={dummyPullRequest.id} />
        </DummyProviders>,
      );

      expect(enzymeWrapper.find('Icon')).toHaveLength(0);
    });

  });

});
