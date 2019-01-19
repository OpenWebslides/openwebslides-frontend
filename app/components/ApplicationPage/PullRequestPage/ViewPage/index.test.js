// @flow

import _ from 'lodash';
import * as React from 'react';
import { shallow } from 'enzyme';

import { dummyPullRequestData, dummyProviderProps } from 'lib/testResources';
import pullRequests from 'modules/pullRequests';

import { PureViewPage } from '.';

describe(`ViewPage`, (): void => {

  let dummyPullRequest: pullRequests.model.PullRequest;

  beforeEach((): void => {
    dummyPullRequest = { ...dummyPullRequestData.pullRequest };
  });

  it(`renders without errors`, (): void => {
    const fixedRouterProps = _.set(_.cloneDeep(dummyProviderProps.routerProps), 'match.params.pullRequestId', dummyPullRequest.id);

    const enzymeWrapper = shallow(
      <PureViewPage {...fixedRouterProps} />,
    );

    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders NULL when match.params.pullRequestId is NULL`, (): void => {
    const enzymeWrapper = shallow(
      <PureViewPage {...dummyProviderProps.routerProps} />,
    );

    expect(enzymeWrapper.isEmptyRender()).toBe(true);
  });

});
