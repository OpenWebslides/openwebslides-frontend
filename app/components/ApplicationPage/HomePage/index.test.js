// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { PureHomePage } from '.';

describe(`HomePage`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureHomePage />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
