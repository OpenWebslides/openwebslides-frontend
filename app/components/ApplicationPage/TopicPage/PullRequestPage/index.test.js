// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { PurePullRequestPage } from '.';

describe(`PullRequestPage`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PurePullRequestPage />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

});
