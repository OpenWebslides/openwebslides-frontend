// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { PureApplicationPage } from '.';

describe(`ApplicationPage`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureApplicationPage />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

});
