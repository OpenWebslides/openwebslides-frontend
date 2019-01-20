// @flow

import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { DummyProviders, dummyProviderProps, dummyPullRequestData } from 'lib/testResources';

import * as m from '../../../../model';

import ReviewButtons, { PureReviewButtons } from '.';

describe(`ReviewButtons`, (): void => {

  let dummyPullRequest: m.PullRequest;

  beforeEach((): void => {
    dummyPullRequest = dummyPullRequestData.pullRequest;
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureReviewButtons
        {...dummyProviderProps.translatorProps}
        pullRequest={dummyPullRequest}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders accept and reject buttons`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <ReviewButtons
          pullRequest={dummyPullRequest}
        />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="review-buttons-reject-button"]').hostNodes()).toHaveLength(1);
    expect(enzymeWrapper.find('[data-test-id="review-buttons-accept-button"]').hostNodes()).toHaveLength(1);
  });

});
