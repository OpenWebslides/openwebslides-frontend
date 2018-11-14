// @flow

import { dummyPullRequestData } from 'lib/testResources';

import * as a from '../actionTypes';
import * as m from '../model';

import reducer from '.';

describe(`setMultipleInState`, (): void => {

  let dummyPullRequest1: m.PullRequest;
  let dummyPullRequest2: m.PullRequest;
  let dummyPullRequest3: m.PullRequest;

  beforeEach((): void => {
    dummyPullRequest1 = { ...dummyPullRequestData.pullRequest };
    dummyPullRequest2 = { ...dummyPullRequestData.pullRequest2 };
    dummyPullRequest3 = { ...dummyPullRequestData.pullRequest3 };
  });

  it(`sets the passed pullRequests in the state`, (): void => {
    const prevState: m.PullRequestsState = {
      byId: {
        [dummyPullRequest1.id]: dummyPullRequest1,
      },
    };
    const setMultipleInStateAction: a.SetMultipleInStateAction = {
      type: a.SET_MULTIPLE_IN_STATE,
      payload: {
        pullRequests: [dummyPullRequest2, dummyPullRequest3],
      },
    };
    const nextState: m.PullRequestsState = {
      byId: {
        [dummyPullRequest1.id]: dummyPullRequest1,
        [dummyPullRequest2.id]: dummyPullRequest2,
        [dummyPullRequest3.id]: dummyPullRequest3,
      },
    };
    const resultState = reducer(prevState, setMultipleInStateAction);

    expect(resultState).toStrictEqual(nextState);
    expect(resultState).not.toBe(prevState);
    expect(resultState.byId).not.toBe(prevState.byId);
  });

  it(`overrides existing pullRequests, when the id of an existing pullRequest is the same as the id of one of the passed pullRequests`, (): void => {
    const editedDummyPullRequest2 = { ...dummyPullRequest2, state: m.pullRequestStates.REJECTED };
    const prevState: m.PullRequestsState = {
      byId: {
        [dummyPullRequest1.id]: dummyPullRequest1,
        [dummyPullRequest2.id]: dummyPullRequest2,
      },
    };
    const setMultipleInStateAction: a.SetMultipleInStateAction = {
      type: a.SET_MULTIPLE_IN_STATE,
      payload: {
        pullRequests: [editedDummyPullRequest2, dummyPullRequest3],
      },
    };
    const nextState: m.PullRequestsState = {
      byId: {
        [dummyPullRequest1.id]: dummyPullRequest1,
        [dummyPullRequest2.id]: editedDummyPullRequest2,
        [dummyPullRequest3.id]: dummyPullRequest3,
      },
    };
    const resultState = reducer(prevState, setMultipleInStateAction);

    expect(resultState).toStrictEqual(nextState);
    expect(resultState).not.toBe(prevState);
    expect(resultState.byId).not.toBe(prevState.byId);
    expect(resultState.byId[dummyPullRequest2.id]).not.toBe(prevState.byId[dummyPullRequest2.id]);
  });

  it(`returns the state unchanged, when the passed pullRequests array is empty`, (): void => {
    const prevState: m.PullRequestsState = {
      byId: {
        [dummyPullRequest1.id]: dummyPullRequest1,
        [dummyPullRequest2.id]: dummyPullRequest2,
      },
    };
    const setMultipleInStateAction: a.SetMultipleInStateAction = {
      type: a.SET_MULTIPLE_IN_STATE,
      payload: {
        pullRequests: [],
      },
    };
    const resultState = reducer(prevState, setMultipleInStateAction);

    expect(resultState).toStrictEqual(prevState);
    expect(resultState).toBe(prevState);
    expect(resultState.byId).toBe(prevState.byId);
  });

});
