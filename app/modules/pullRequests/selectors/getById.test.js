// @flow

import { dummyPullRequestData } from 'lib/testResources';

import * as m from '../model';

import selectors from '.';

describe(`getById`, (): void => {

  let dummyPullRequest1: m.PullRequest;
  let dummyPullRequest2: m.PullRequest;
  let dummyPullRequestsById: m.PullRequestsById;
  let dummyPullRequestsState: m.PullRequestsState;
  let dummyState: any;

  beforeEach((): void => {
    dummyPullRequest1 = { ...dummyPullRequestData.pullRequest };
    dummyPullRequest2 = { ...dummyPullRequestData.pullRequest2 };
    dummyPullRequestsById = {
      [dummyPullRequest1.id]: dummyPullRequest1,
      [dummyPullRequest2.id]: dummyPullRequest2,
    };
    dummyPullRequestsState = { byId: dummyPullRequestsById };
    dummyState = { modules: { pullRequests: dummyPullRequestsState } };
  });

  it(`returns the correct pullRequest for the given id, when the given id is valid`, (): void => {
    const pullRequest = selectors.getById(dummyState, { id: dummyPullRequest1.id });
    expect(pullRequest).toBe(dummyPullRequest1);
  });

  it(`returns NULL, when the given id is invalid`, (): void => {
    const pullRequest = selectors.getById(dummyState, { id: 'InvalidId' });
    expect(pullRequest).toBeNull();
  });

});
