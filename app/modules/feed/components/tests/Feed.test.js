// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import FeedWrapper from '../Feed';

describe(`Feed`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <FeedWrapper
        eventIds={[]}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
