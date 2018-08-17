// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { PureFeedWrapper } from './Feed';

describe(`Feed`, (): void => {

  it(`renders without errors`, (): void => {
    const dummyHandleRequestFeed = jest.fn();
    const enzymeWrapper = shallow(
      <PureFeedWrapper
        eventIds={[]}
        handleRequestFeed={dummyHandleRequestFeed}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
