// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { PureNavigationBar } from '.';

describe(`NavigationBar`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureNavigationBar />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

});
