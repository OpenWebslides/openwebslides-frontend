// @flow

import { dummyPullRequestData } from 'lib/testResources';

import * as a from '../../actionTypes';
import * as m from '../../model';

import actions from '..';

describe(`setMultipleInState`, (): void => {

  let dummyPullRequests: $ReadOnlyArray<m.PullRequest>;

  beforeEach((): void => {
    dummyPullRequests = [
      { ...dummyPullRequestData.pullRequest },
      { ...dummyPullRequestData.pullRequest2 },
    ];
  });

  it(`returns a pullRequests SET_MULTIPLE_IN_STATE action containing the passed arguments`, (): void => {
    const expectedAction: a.SetMultipleInStateAction = {
      type: a.SET_MULTIPLE_IN_STATE,
      payload: {
        pullRequests: dummyPullRequests,
      },
    };
    const actualAction = actions.setMultipleInState(dummyPullRequests);

    expect(actualAction).toStrictEqual(expectedAction);
  });

});
