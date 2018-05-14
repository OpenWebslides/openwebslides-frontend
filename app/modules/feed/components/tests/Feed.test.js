// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { PureFeedWrapper } from '../Feed';

describe(`Feed`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureFeedWrapper
        eventIds={[]}
        handleRequestFeed={(): void => {}}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
