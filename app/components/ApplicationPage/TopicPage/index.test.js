// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { PureTopicPage } from '.';

describe(`TopicPage`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureTopicPage />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
