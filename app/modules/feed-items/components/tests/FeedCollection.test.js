// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import FeedCollection from '../FeedCollection';

describe(`FeedCollection`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <FeedCollection
        feedItemIds={[]}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
